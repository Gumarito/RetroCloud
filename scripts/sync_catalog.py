#!/usr/bin/env python3
"""Sincroniza y filtra games.json con el catalogo maestro de GitHub.

Aplica un filtro estricto de calidad para eliminar juegos de relleno, mods
rotos y proyectos sin traducir, priorizando las joyas retro y los clasicos.
Detecta emuladores pesados (PS2, PSP, etc.) para asignarlos a launchMode: external.

Uso: python scripts/sync_catalog.py [--dry-run] [--file games.json]
"""
import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

README_URL = (
    "https://raw.githubusercontent.com/Carter54git/"
    "Ultimate-Catalog-Of-Web-Game-Ports/main/README.md"
)
ROOT = Path(__file__).resolve().parent.parent

# Dominios que permiten iframes limpios
PREFERRED = ("github.io", "wasm.rip", "itch.io", "pages.dev", "rgc.zone")
DOS_HOSTS = ("dos.zone", "js-dos")

# Dominios y patrones que son emuladores pesados (PS2, PSP, 3D pesados)
# Requieren ejecutarse en nueva pestaña para no dar pantalla negra
HEAVY_EMULATORS = (
    ".online",
    "aaddpp.lol",
    "recompiledgames.com",
    "wasm.continuation-labs.com",
)
HEAVY_TITLE_KEYWORDS = (
    "naruto",
    "ps2",
    "psp",
    "gamecube",
    "wii",
    "god of war",
    "smash bros",
    "skate 3",
    "simpsons: hit & run",
    "gta: vice city",
)

# Terminos que identifican basura / relleno de baja calidad
JUNK_PATTERNS = (
    r"baldi-mod",
    r"test",
    r"clone",
    r"fan made mod",
    r"decompilation test",
)

ROW_RE = re.compile(r"^\|\s*(?P<game>[^|]+?)\s*\|\s*(?P<play>[^|]*?)\s*\|")
PLAY_RE = re.compile(r"\[▶\s*[^\]]*\]\((https?://[^)\s]+)\)")
BARE_PLAY_RE = re.compile(r"\[▶\s*(https?://[^\]\s]+)\]")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "RetroCloud-sync/2.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def clean_title(raw):
    t = raw.replace("⭐", "").strip()
    return re.sub(r"\s+", " ", t)


def group_key(title):
    t = re.sub(r"\(.*?\)", " ", title)
    t = re.sub(r"[^a-z0-9]+", " ", t.lower())
    return t.strip()


def slugify(title):
    return re.sub(r"\s+", "-", group_key(title)) or "game"


def host(url):
    return (urlparse(url).hostname or "").lower()


def priority(url):
    h = host(url)
    for i, d in enumerate(PREFERRED):
        if h == d or h.endswith("." + d):
            return i
    return len(PREFERRED)


def is_quality_game(title, url):
    """Filtra juegos que no aportan valor o son relleno de baja calidad."""
    # 1. Descartar titulos con caracteres cirilicos (rusos) o asiaticos sin traducir
    if re.search(r"[\u0400-\u04FF\u4E00-\u9FFF]", title):
        return False

    # 2. Descartar titulos insignificantes o simbolos solitarios
    cleaned = re.sub(r"[^a-zA-Z0-9]", "", title)
    if len(cleaned) < 2:
        return False

    # 3. Descartar patrones de mods de Baldi o pruebas
    t_lower = title.lower()
    for p in JUNK_PATTERNS:
        if re.search(p, t_lower):
            return False

    # 4. Descartar repositorios o urls no validas
    if "github.com" in url.lower() and not "github.io" in url.lower():
        return False

    return True


def should_launch_external(title, url):
    """Determina si el juego requiere ejecutarse externamente para evitar pantalla negra."""
    h = host(url)
    t = title.lower()

    if any(h.endswith(dom) or h == dom for dom in HEAVY_EMULATORS):
        return True

    if any(kw in t for kw in HEAVY_TITLE_KEYWORDS):
        return True

    return False


def guess_collection(title, url):
    h = host(url)
    t = title.lower()
    if any(d in h for d in DOS_HOSTS) or "dos" in t:
        return "dos"
    if any(k in t for k in ("arcade", "neo geo", "mame", "metal slug", "pac-man")):
        return "arcade"
    if any(k in t for k in ("celeste", "cuphead", "indie", "undertale", "hormigas")):
        return "indie"
    return "ports"


def parse_readme(text):
    """Devuelve solo los juegos con enlace jugable que pasen el filtro de calidad."""
    games = {}
    for line in text.splitlines():
        m = ROW_RE.match(line)
        if not m or "▶" not in m.group("play"):
            continue
        title = clean_title(m.group("game"))
        if not title:
            continue
        urls = PLAY_RE.findall(m.group("play")) or BARE_PLAY_RE.findall(m.group("play"))
        if not urls:
            continue

        # Validar calidad del juego
        if not is_quality_game(title, urls[0]):
            continue

        key = group_key(title)
        if not key:
            continue

        entry = games.setdefault(key, {"title": title, "mirrors": []})
        if len(title) < len(entry["title"]):
            entry["title"] = title

        for url in urls:
            if all(url != x["url"] for x in entry["mirrors"]):
                entry["mirrors"].append({"name": f"{title} - {host(url)}", "url": url})

    return games


def merge(existing, parsed):
    by_key = {group_key(g["title"]): g for g in existing}
    added = updated = 0

    for key, p in parsed.items():
        mirrors = sorted(p["mirrors"], key=lambda x: priority(x["url"]))
        primary_url = mirrors[0]["url"]

        if key in by_key:
            g = by_key[key]
            known = {m["url"] for m in g.get("mirrors", [])}
            new_mirrors = [m for m in mirrors if m["url"] not in known]
            if new_mirrors:
                g.setdefault("mirrors", []).extend(new_mirrors)
                updated += 1
            # Actualizar regla de modo externo si es emulador pesado
            if should_launch_external(g.get("title", ""), g.get("url", "")):
                g["launchMode"] = "external"
                g["pinned"] = True
            continue

        is_ext = should_launch_external(p["title"], primary_url)
        g = {
            "id": slugify(p["title"]),
            "title": p["title"],
            "category": "Web Port",
            "collection": guess_collection(p["title"], primary_url),
            "image": None,
            "launchMode": "external" if is_ext else "iframe",
            "url": primary_url,
            "mirrors": mirrors,
        }
        if is_ext:
            g["pinned"] = True

        existing.append(g)
        by_key[key] = g
        added += 1

    return added, updated


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--file", default=str(ROOT / "games.json"))
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    path = Path(args.file)
    existing = json.loads(path.read_text(encoding="utf-8-sig")) if path.exists() else []

    # Filtrar el catalogo existente para purgar relleno previo
    cleaned_existing = []
    purged_count = 0
    for g in existing:
        if is_quality_game(g.get("title", ""), g.get("url", "")):
            # Aplicar proteccion contra pantalla negra a emuladores pesados
            if should_launch_external(g.get("title", ""), g.get("url", "")):
                g["launchMode"] = "external"
                g["pinned"] = True
            cleaned_existing.append(g)
        else:
            purged_count += 1

    print(f"Juegos de relleno eliminados del catalogo actual: {purged_count}")

    parsed = parse_readme(fetch(README_URL))
    added, updated = merge(cleaned_existing, parsed)

    print(
        f"Catalogo filtrado: {len(parsed)} juegos de calidad | "
        f"Nuevos: {added} | Con mirrors nuevos: {updated} | "
        f"Total activo: {len(cleaned_existing)}"
    )

    if args.dry_run:
        return 0

    path.write_text(
        json.dumps(cleaned_existing, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Guardado exitoso en {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
