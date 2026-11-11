#!/usr/bin/env python3
"""Sistema de respaldos automaticos de games.json.

Guarda copias de seguridad fechadas en la carpeta backups/ antes de cualquier
actualizacion o sincronizacion masiva, manteniendo un historial seguro.

Uso: python scripts/backup_catalog.py [--keep 10]
"""
import argparse
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BACKUPS_DIR = ROOT / "backups"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file", default=str(ROOT / "games.json"), help="Ruta de games.json")
    parser.add_argument("--keep", type=int, default=10, help="Numero maximo de respaldos a conservar")
    args = parser.parse_args()

    src = Path(args.file)
    if not src.exists():
        print(f"Error: {src} no existe")
        return 1

    BACKUPS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    dest = BACKUPS_DIR / f"games_{timestamp}.json"

    shutil.copy2(src, dest)
    print(f"[BACKUP] Copia de seguridad guardada en: {dest}")

    # Purgar respaldos viejos si exceden el limite
    all_backups = sorted(BACKUPS_DIR.glob("games_*.json"), key=lambda p: p.stat().st_mtime)
    if len(all_backups) > args.keep:
        to_delete = all_backups[: len(all_backups) - args.keep]
        for old in to_delete:
            old.unlink()
            print(f"[BACKUP] Respaldo antiguo eliminado: {old.name}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
