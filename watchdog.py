#!/usr/bin/env python3
"""Verifica las URLs de games.json y decide si se pueden embeber en un iframe.

- 200 OK y sin bloqueo de iframe        -> launchMode "iframe"
- Bloqueo (X-Frame-Options DENY/SAMEORIGIN o CSP frame-ancestors restrictivo):
    promueve otro mirror que si permita iframe; si no hay, "external".
- Servidor caido / error                 -> "external" y status "down".

Uso: python scripts/watchdog.py [--dry-run] [--file games.json] [--workers 16]
"""
import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 RetroCloud-watchdog/1.0"}
TIMEOUT = 12


def blocks_iframe(headers):
    xfo = (headers.get("X-Frame-Options") or "").upper()
    if "DENY" in xfo or "SAMEORIGIN" in xfo:
        return True
    csp = headers.get("Content-Security-Policy") or ""
    m = re.search(r"frame-ancestors([^;]*)", csp, re.I)
    if m:
        v = m.group(1).strip().lower()
        if v in ("'none'", "'self'") or ("*" not in v and "http" not in v):
            return True
    return False


def _request(url, method):
    req = urllib.request.Request(url, headers=UA, method=method)
    return urllib.request.urlopen(req, timeout=TIMEOUT)


def check(url):
    """Devuelve 'ok', 'blocked' o 'down'."""
    for method in ("HEAD", "GET"):
        try:
            with _request(url, method) as r:
                if r.status != 200:
                    return "down"
                return "blocked" if blocks_iframe(r.headers) else "ok"
        except urllib.error.HTTPError as e:
            # Algunos servidores rechazan HEAD: reintenta con GET.
            if method == "HEAD" and e.code in (400, 403, 405, 501):
                continue
            return "down"
        except Exception:
            return "down"
    return "down"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--file", default=str(ROOT / "games.json"))
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--workers", type=int, default=16)
    args = ap.parse_args()

    path = Path(args.file)
    games = json.loads(path.read_text(encoding="utf-8-sig"))

    urls = {u for g in games for u in [g.get("url")] + [m["url"] for m in g.get("mirrors", [])] if u}
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        results = dict(zip(urls, ex.map(check, urls)))

    counts = {"iframe": 0, "external": 0, "promoted": 0}
    for g in games:
        if g.get("pinned"):
            counts[g.get("launchMode", "external")] += 1
            print(f"[{g.get('launchMode', 'external'):8}] {g['title']} (pinned)")
            continue
        cands = [g.get("url")] + [m["url"] for m in g.get("mirrors", [])]
        cands = [u for i, u in enumerate(cands) if u and u not in cands[:i]]
        if results.get(g.get("url")) == "ok":
            g["launchMode"], g["status"] = "iframe", "ok"
        else:
            alt = next((u for u in cands if results.get(u) == "ok"), None)
            if alt:
                g["url"], g["launchMode"], g["status"] = alt, "iframe", "ok"
                counts["promoted"] += 1
            else:
                g["launchMode"] = "external"
                g["status"] = "blocked" if any(results.get(u) == "blocked" for u in cands) else "down"
        counts[g["launchMode"]] += 1
        print(f"[{g['launchMode']:8}] {g['title']} ({g['status']})")

    print(f"iframe: {counts['iframe']} | external: {counts['external']} | promovidos: {counts['promoted']}")
    if not args.dry_run:
        path.write_text(json.dumps(games, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
