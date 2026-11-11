#!/usr/bin/env python3
"""Mide el tiempo de respuesta de cada mirror y ordena los servidores del mas rapido al mas lento.

Ejecuta peticiones HEAD concurrentes para medir la latencia en milisegundos.
Pone como URL principal (url) el mirror con menor tiempo de respuesta que permita iframe.

Uso: python scripts/benchmark_mirrors.py [--file games.json] [--workers 16] [--timeout 5]
"""
import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "RetroCloud-Benchmark/1.0"}


def ping_url(url, timeout):
    """Mide el tiempo de respuesta en milisegundos. Devuelve (ms, status_code)."""
    start = time.perf_counter()
    try:
        req = urllib.request.Request(url, headers=UA, method="HEAD")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            elapsed = (time.perf_counter() - start) * 1000
            return int(elapsed), resp.status
    except urllib.error.HTTPError as e:
        elapsed = (time.perf_counter() - start) * 1000
        # Si el servidor responde 405 (Method Not Allowed para HEAD), cuenta como vivo
        if e.code in (405, 403, 301, 302):
            return int(elapsed), 200
        return 9999, e.code
    except Exception:
        return 9999, 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file", default=str(ROOT / "games.json"))
    parser.add_argument("--workers", type=int, default=16)
    parser.add_argument("--timeout", type=int, default=5)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.exists():
        print(f"Error: {path} no existe")
        return 1

    games = json.loads(path.read_text(encoding="utf-8-sig"))

    # Recolectar todas las URLs unicas de los mirrors
    urls = set()
    for g in games:
        for m in g.get("mirrors", []):
            if m.get("url"):
                urls.add(m["url"])

    print(f"Haciendo benchmark de {len(urls)} mirrors con {args.workers} hilos...")
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {u: executor.submit(ping_url, u, args.timeout) for u in urls}
        latencies = {u: f.result()[0] for u, f in futures.items()}

    optimized_count = 0
    for g in games:
        mirrors = g.get("mirrors", [])
        if len(mirrors) > 1:
            # Ordenar mirrors de menor a mayor latencia
            sorted_mirrors = sorted(mirrors, key=lambda m: latencies.get(m["url"], 9999))
            if sorted_mirrors != mirrors:
                g["mirrors"] = sorted_mirrors
                # Si el juego usa iframe y no esta bloqueado, usar el mirror mas veloz
                if g.get("launchMode") == "iframe" and not g.get("pinned"):
                    g["url"] = sorted_mirrors[0]["url"]
                optimized_count += 1

    print(f"Benchmark finalizado. {optimized_count} juegos optimizados con servidores mas rapidos.")

    if not args.dry_run:
        path.write_text(json.dumps(games, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Guardado exitoso en {path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
