#!/usr/bin/env python3
"""Genera sitemap.xml y robots.txt para RetroCloud.

Crea URLs individuales con deep linking (?game=id) para cada uno de los juegos
del catalogo, permitiendo que Google, Bing y otros motores indexen cada titulo.

Uso: python scripts/generate_sitemap.py [--domain https://gumarito.github.io/RetroCloud]
"""
import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DOMAIN = "https://gumarito.github.io/RetroCloud"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--domain", default=DEFAULT_DOMAIN, help="URL base del sitio")
    parser.add_argument("--file", default=str(ROOT / "games.json"), help="Ruta a games.json")
    args = parser.parse_args()

    domain = args.domain.rstrip("/")
    path = Path(args.file)
    if not path.exists():
        print(f"Error: {path} no existe")
        return 1

    games = json.loads(path.read_text(encoding="utf-8-sig"))
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # 1. Generar sitemap.xml
    urlset = ET.Element(
        "urlset",
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    )

    # URL Principal
    root_url = ET.SubElement(urlset, "url")
    ET.SubElement(root_url, "loc").text = f"{domain}/"
    ET.SubElement(root_url, "lastmod").text = today
    ET.SubElement(root_url, "changefreq").text = "daily"
    ET.SubElement(root_url, "priority").text = "1.0"

    # URLs por cada juego
    for g in games:
        gid = g.get("id")
        if not gid:
            continue
        u = ET.SubElement(urlset, "url")
        ET.SubElement(u, "loc").text = f"{domain}/?game={gid}"
        ET.SubElement(u, "lastmod").text = today
        ET.SubElement(u, "changefreq").text = "weekly"
        ET.SubElement(u, "priority").text = "0.8"

    tree = ET.ElementTree(urlset)
    sitemap_path = ROOT / "sitemap.xml"
    ET.indent(tree, space="  ")
    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)
    print(f"[SEO] Creado sitemap.xml con {len(games) + 1} URLs en {sitemap_path}")

    # 2. Generar robots.txt
    robots_path = ROOT / "robots.txt"
    robots_content = f"""User-agent: *
Allow: /

Sitemap: {domain}/sitemap.xml
"""
    robots_path.write_text(robots_content, encoding="utf-8")
    print(f"[SEO] Creado robots.txt en {robots_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
