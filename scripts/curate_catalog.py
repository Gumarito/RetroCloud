#!/usr/bin/env python3
"""Curador y purificador del catalogo de RetroCloud.

1. Filtra y elimina juegos de relleno, mods rotos, clones repetidos y bromas.
2. Agrega etiquetas (tags) tematicas y de genero a cada juego.
3. Asigna portadas oficiales de alta resolucion a todos los titulos conocidos,
   incluyendo juegos virales y clasicos legendarios.
4. Asegura que emuladores pesados (PS2, PSP, etc.) tengan launchMode: "external".

Uso: python scripts/curate_catalog.py [--file games.json]
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Patrones para identificar y descartar juegos basura / relleno
JUNK_TITLE_PATTERNS = [
    r"[\u0400-\u04FF\u4E00-\u9FFF]", # Ruso, cirilico, asiatico sin traducir
    r"^[0-9\W]+$",                  # Solo simbolos o numeros (-3, -b)
    r"baldi.*(birthday|plus|remastered|mods|camping|field|impossible|rip)",
    r"caseoh.*basics",
    r"claude of duty",
    r"boil noodles",
    r"cheese (cube|rolling)",
    r"clover pit",
    r"bad parenting",
    r"a2 racer",
    r"apes vs helium",
    r"arthur's nightmare",
    r"ballerburg",
    r"ambidextro",
    r"anarch",
    r"angband",
    r"apotheon",
    r"apotris",
    r"arco",
    r"astromenace",
    r"asylum",
    r"atomiks",
    r"axis \(2005\)",
    r"azimuth",
    r"decompilation test",
]

# Base de datos de portadas oficiales verificadas en alta definicion
OFFICIAL_COVERS = {
    # Joyas Base
    "the simpsons: hit & run": "https://upload.wikimedia.org/wikipedia/en/9/9f/The_Simpsons_Hit_%26_Run_Cover.PNG",
    "half-life": "https://upload.wikimedia.org/wikipedia/en/f/fa/Half-Life_Cover_Art.jpg",
    "gta: vice city": "https://upload.wikimedia.org/wikipedia/en/c/ce/Vice-city-cover.jpg",
    "pes 6": "https://upload.wikimedia.org/wikipedia/en/b/b5/Pro_Evolution_Soccer_6_Cover.jpg",
    "skate 3": "https://upload.wikimedia.org/wikipedia/en/7/7b/Skate_3_box_art.jpg",
    "hormigas": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",
    
    # Virales y Grandes Éxitos Web
    "minecraft": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    "eaglercraft": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    "tetris": "https://upload.wikimedia.org/wikipedia/en/8/8d/NES_Tetris_Box_Front.jpg",
    "subway surfers": "https://upload.wikimedia.org/wikipedia/en/d/de/Subway_Surfers_App_Logo.png",
    "cookie clicker": "https://upload.wikimedia.org/wikipedia/en/1/14/Cookie_Clicker_logo.png",
    "crossy road": "https://upload.wikimedia.org/wikipedia/en/4/4b/Crossy_Road_app_icon.png",
    "geometry dash": "https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.PNG",
    "slope": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    "flappy bird": "https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png",
    "five nights at freddy's": "https://upload.wikimedia.org/wikipedia/en/1/17/Five_Nights_at_Freddy%27s_Steam_header.jpg",
    "undertale": "https://upload.wikimedia.org/wikipedia/en/c/c4/Undertale_cover.jpg",
    "plants vs. zombies": "https://upload.wikimedia.org/wikipedia/en/c/c5/Plants_vs_Zombies_box_art.jpg",
    "angry birds": "https://upload.wikimedia.org/wikipedia/en/0/05/Angry_Birds_cover_art.png",
    "bad piggies": "https://upload.wikimedia.org/wikipedia/en/b/b5/Bad_Piggies_cover.png",
    "bendy and the ink machine": "https://upload.wikimedia.org/wikipedia/en/7/77/Bendy_and_the_Ink_Machine_cover.png",
    "the binding of isaac: repentance": "https://upload.wikimedia.org/wikipedia/en/f/fa/Binding_of_isaac_rebirth_cover.jpg",
    "brotato": "https://upload.wikimedia.org/wikipedia/en/6/69/Brotato_cover_art.jpg",
    "buckshot roulette": "https://upload.wikimedia.org/wikipedia/en/a/a2/Buckshot_Roulette_cover_art.png",
    "brawlhalla": "https://upload.wikimedia.org/wikipedia/en/1/1a/Brawlhalla_cover_art.jpg",
    "baldi's basics classic": "https://upload.wikimedia.org/wikipedia/en/2/22/Baldi%27s_Basics_in_Education_and_Learning_Cover_Art.png",
    
    # Consolas & Ports Legendarios
    "naruto shippuden: ultimate ninja 5": "https://upload.wikimedia.org/wikipedia/en/5/5a/Naruto_Shippuden_Ultimate_Ninja_5.jpg",
    "naruto shippuden: ultimate ninja impact": "https://upload.wikimedia.org/wikipedia/en/3/36/Naruto_Shippuden_Ultimate_Ninja_Impact.jpg",
    "celeste": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png",
    "cuphead": "https://upload.wikimedia.org/wikipedia/en/e/eb/Cuphead_%28artwork%29.png",
    "doom": "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg",
    "doom ii": "https://upload.wikimedia.org/wikipedia/en/1/15/Doom_II_-_Hell_on_Earth_Coverart.png",
    "doom 3": "https://upload.wikimedia.org/wikipedia/en/8/87/Doom_3_box_art.png",
    "brutal doom": "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg",
    "among us": "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
    "3d pinball for windows - space cadet": "https://upload.wikimedia.org/wikipedia/en/e/e0/Full_Tilt%21_Pinball_coverart.png",
    "20 minutes till dawn": "https://thumb.wikimedia.org/wikipedia/en/thumb/b/b8/20_Minutes_Till_Dawn_title.jpg/500px-20_Minutes_Till_Dawn_title.jpg",
    "alley cat": "https://upload.wikimedia.org/wikipedia/en/2/27/Alley_Cat_Cover.jpg",
    "animal crossing": "https://upload.wikimedia.org/wikipedia/en/4/41/Animal_Crossing_Cover.png",
    "metal slug": "https://upload.wikimedia.org/wikipedia/en/0/01/Metal_Slug_1_Cover.jpg",
    "super mario 64": "https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg",
    "sonic the hedgehog": "https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg",
    "the legend of zelda": "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png",
    "castlevania": "https://upload.wikimedia.org/wikipedia/en/4/48/Castlevania_NES_box_art.jpg",
    "prince of persia": "https://upload.wikimedia.org/wikipedia/en/2/27/Prince_of_Persia_cover.jpg",
    "quake": "https://upload.wikimedia.org/wikipedia/en/c/cd/Quake1cover.jpg",
    "quake ii": "https://upload.wikimedia.org/wikipedia/en/e/e4/Quake_II_boxart.jpg",
    "diablo": "https://upload.wikimedia.org/wikipedia/en/3/3a/Diablo_Coverart.png",
    "fallout": "https://upload.wikimedia.org/wikipedia/en/a/af/Fallout.jpg",
    "duke nukem 3d": "https://upload.wikimedia.org/wikipedia/en/e/e8/Dukecover.jpg",
    "pac-man": "https://upload.wikimedia.org/wikipedia/en/0/03/Pac_man_arcade_flyer.PNG",
    "street fighter ii": "https://upload.wikimedia.org/wikipedia/en/1/1d/Street_Fighter_II_arcade_flyer.jpg",
    "burnout 3: takedown": "https://upload.wikimedia.org/wikipedia/en/c/c7/Burnout_3_Takedown_Coverart.png",
    "call of duty: black ops zombies": "https://upload.wikimedia.org/wikipedia/en/0/02/CoD_Black_Ops_cover.png",
    "call of duty: modern warfare 2": "https://upload.wikimedia.org/wikipedia/en/d/db/Modern_Warfare_2_cover.PNG",
    "carmageddon": "https://upload.wikimedia.org/wikipedia/en/e/e1/Carmageddon_box_art.jpg",
    "castle crashers": "https://upload.wikimedia.org/wikipedia/en/9/90/Castle_Crashers_Cover_Art.png",
    "cave story": "https://upload.wikimedia.org/wikipedia/en/8/87/Cave_Story_cover_art.jpg",
    "command & conquer: red alert 2": "https://upload.wikimedia.org/wikipedia/en/a/a4/Red_Alert_2_Coverart.png",
    "counter strike 1.6": "https://upload.wikimedia.org/wikipedia/en/6/6e/Counter-Strike_Box.jpg",
    "counter-strike: source": "https://upload.wikimedia.org/wikipedia/en/f/f6/Counter-Strike_Source_coverart.jpg",
    "crash bash online": "https://upload.wikimedia.org/wikipedia/en/6/6e/Crash_Bash_Cover.jpg",
    "crash nitro kart": "https://upload.wikimedia.org/wikipedia/en/4/4b/Crash_Nitro_Kart_Coverart.png",
    "battle city": "https://upload.wikimedia.org/wikipedia/en/8/88/Battle_City_cover.jpg",
    "battle stadium d.o.n": "https://upload.wikimedia.org/wikipedia/en/3/30/Battle_Stadium_DON_box_art.jpg",
}

# Imagenes de respaldo tematico de alta resolucion
GENRE_FALLBACKS = {
    "ports": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    "dos": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80",
    "arcade": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80",
    "indie": "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&q=80",
    "default": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
}


def is_junk(title):
    t = title.strip().lower()
    for pattern in JUNK_TITLE_PATTERNS:
        if re.search(pattern, t, flags=re.I):
            return True
    return False


def generate_tags(title, collection, category, launch_mode):
    """Genera etiquetas interactivas y precisas para cada juego."""
    tags = set()
    t = title.lower()
    c = category.lower()

    # Clasificacion de Tecnologia
    if launch_mode == "external":
        if any(k in t for k in ("ps2", "psp", "gamecube", "wii", "naruto", "burnout", "crash nitro")):
            tags.add("Emulador 3D")
        else:
            tags.add("Modo Externo")
    else:
        tags.add("Web Native")

    # Virales y Generos Especiales
    if any(k in t for k in ("minecraft", "eaglercraft", "subway", "cookie", "tetris", "slope", "crossy", "geometry")):
        tags.add("Viral")
        tags.add("Casual")

    if any(k in t or k in c for k in ("fps", "half-life", "doom", "quake", "counter-strike", "wolfenstein", "call of duty", "duke")):
        tags.add("FPS")
        tags.add("Disparos")
    elif any(k in t or k in c for k in ("lucha", "fighter", "naruto", "brawlhalla", "stadium", "smash")):
        tags.add("Lucha")
        tags.add("Acción")
    elif any(k in t or k in c for k in ("kart", "carmageddon", "burnout", "crash nitro", "skate", "pes", "subway")):
        tags.add("Velocidad")
        tags.add("Deportes")
    elif any(k in t or k in c for k in ("celeste", "mario", "sonic", "cuphead", "cave story", "castle crashers", "alley", "geometry")):
        tags.add("Plataformas")
        tags.add("Aventura")
    elif any(k in t or k in c for k in ("horror", "freddy", "bendy", "amanda", "buckshot", "undertale")):
        tags.add("Terror")
    elif any(k in t or k in c for k in ("command & conquer", "diablo", "fallout", "caesar", "battle city", "hormigas", "plants")):
        tags.add("Estrategia")
    elif collection == "dos":
        tags.add("DOS Clásico")
    elif collection == "arcade":
        tags.add("Arcade Retro")
    elif collection == "indie":
        tags.add("Joyas Indie")
    else:
        tags.add("Clásico")

    if any(k in t for k in ("gta", "vice city", "simpsons", "animal crossing", "minecraft", "eaglercraft")):
        tags.add("Mundo Abierto")

    return list(tags)[:3]


def get_cover(title, collection):
    t_clean = re.sub(r"\(.*?\)", "", title.lower()).strip()
    for key, url in OFFICIAL_COVERS.items():
        if t_clean == key or key in t_clean or t_clean in key:
            return url
    return GENRE_FALLBACKS.get(collection, GENRE_FALLBACKS["default"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file", default=str(ROOT / "games.json"))
    args = parser.parse_args()

    path = Path(args.file)
    games = json.loads(path.read_text(encoding="utf-8-sig"))
    initial_count = len(games)

    curated = []
    purged = 0

    for g in games:
        title = g.get("title", "")
        if is_junk(title):
            purged += 1
            continue

        # Regla de modo externo para juegos 3D / emuladores pesados
        t_low = title.lower()
        if any(k in t_low for k in ("naruto", "ps2", "psp", "gamecube", "wii", "burnout", "crash nitro", "skate", "simpsons")):
            g["launchMode"] = "external"
            g["pinned"] = True

        # Asignar tags
        g["tags"] = generate_tags(
            title,
            g.get("collection", "ports"),
            g.get("category", ""),
            g.get("launchMode", "iframe"),
        )

        # Asignar portada oficial
        curr_img = g.get("image")
        if not curr_img or "photo-1550745165-9bc0b252726f" in curr_img:
            g["image"] = get_cover(title, g.get("collection", "ports"))

        curated.append(g)

    path.write_text(json.dumps(curated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Catálogo curado y actualizado:")
    print(f" - Inicial: {initial_count} juegos")
    print(f" - Purgados: {purged} juegos eliminados")
    print(f" - Total activo de alta calidad: {len(curated)} juegos")
    return 0


if __name__ == "__main__":
    sys.exit(main())
