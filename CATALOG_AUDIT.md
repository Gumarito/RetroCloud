# Auditoría técnica del catálogo RetroCloud

- Fecha: 2026-11-08 21:15:55 -06:00
- Método: comprobación HTTP de solo lectura de URL principal, mirrors e imágenes; análisis de cabeceras de bloqueo iframe.
- Umbral de red: timeout de 5 s, hasta 40 solicitudes concurrentes; los errores de red se registran como no verificados, no como roturas confirmadas.
- Límite: HTTP 200 no garantiza que el juego arranque ni que su apariencia sea correcta. Las páginas no se ejecutaron ni se capturaron; calidad visual y relevancia requieren auditoría con navegador/modelo.

## Métricas

| Métrica | Total |
|---|---:|
| Juegos | 496 |
| IDs duplicados | 0 |
| Página principal accesible sin bloqueo iframe detectado | 268 |
| Bloqueo de iframe detectado | 43 |
| Página principal no accesible | 44 |
| Página principal sin respuesta HTTP | 141 |
| Imágenes genéricas Unsplash | 121 |
| Imágenes rotas o con tipo inesperado | 12 |
| Imágenes no verificadas por error de red | 305 |

## Revisión juego por juego

| ID | Juego | Página principal | Iframe | Portada | Relevancia | Acción sugerida |
|---|---|---:|---|---|---|---|
| `flappy-bird` | Flappy Bird (HTML5) | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `2048` | 2048 Original Web | 200 | Sin bloqueo detectado | OK (image/svg+xml) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `minecraft-1-8-8` | Minecraft 1.8.8 (EaglercraftX) | 200 | Bloqueado por cabeceras | OK (image/jpeg) | 4/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `gta-vice-city` | GTA: Vice City (WASM) | 200 | Sin bloqueo detectado | No verificada (error de red) | 4/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `simpsons-hit-and-run` | The Simpsons: Hit & Run (WASM) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `subway-surfers` | Subway Surfers (Web Edition) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 3/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `super-mario-64` | Super Mario 64 | 200 | Sin bloqueo detectado | No verificada (error de red) | 4/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `naruto-shippuden-ultimate-ninja-5` | Naruto Shippuden: Ultimate Ninja 5 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cuphead` | Cuphead | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `celeste` | Celeste | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `half-life` | Half-Life (WebGL Port) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `brutal-doom` | Brutal Doom | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `tetris-classic` | Tetris (Classic Web) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cookie-clicker` | Cookie Clicker | 403 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `sonic-the-hedgehog` | Sonic the Hedgehog (2013) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `skate-3` | Skate 3 (Fan Made Web) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `geometry-dash` | Geometry Dash | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `slope-3d` | Slope 3D | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `pes-6` | PES 6 (Web Edition) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `plants-vs-zombies` | Plants vs. Zombies | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s` | Five Nights at Freddy's | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `undertale` | Undertale | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `bad-piggies` | Bad Piggies | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `call-of-duty-black-ops-zombies` | Call of Duty: Black Ops Zombies | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-1-6` | Counter Strike 1.6 (2) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `3d-pinball-for-windows-space-cadet` | 3D Pinball for Windows - Space Cadet | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `hormigas` | Hormigas (Web Game) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `20-minutes-till-dawn` | 20 Minutes Till Dawn | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `ages-of-conflict` | Ages of Conflict | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `alley-cat` | Alley Cat | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `amanda-the-adventurer` | Amanda The Adventurer | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `amazing-alex` | Amazing Alex | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `american-mcgee-s-alice` | American McGee’s Alice | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `among-us` | Among Us | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `andy-s-apple-farm` | Andy's Apple Farm | 404 | No accesible | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `animal-crossing` | Animal Crossing | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `antonblast` | Antonblast | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `arx-fatalis` | Arx Fatalis (rgc.zone) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `atlantis-the-lost-tales` | Atlantis: The Lost Tales | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `battle-city` | Battle City | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `battle-stadium-d-o-n` | Battle Stadium D.O.N | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `beatblock` | Beatblock | error de red | Sin respuesta HTTP | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `bendy-and-the-ink-machine` | Bendy and The Ink Machine | error de red | Sin respuesta HTTP | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `bendy-and-the-ink-machine-all-chapters` | Bendy and the Ink Machine: ALL CHAPTERS | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `beneath-a-steel-sky` | Beneath a Steel Sky (ScummWeb) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `bergentruck-201x` | BERGENTRUCK 201x | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `the-binding-of-isaac-repentance` | The Binding of Isaac: Repentance | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `a-bite-at-freddy-s` | A Bite at Freddy's | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `bloodmoney` | BLOODMONEY! | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `brawlhalla` | Brawlhalla | 502 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `brotato` | Brotato | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `buckshot-roulette` | Buckshot Roulette | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `bumpy-s-arcade-fantasy` | Bumpy's Arcade Fantasy | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `burnout-3-takedown` | Burnout 3: Takedown | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `buster-jam` | Buster Jam | error de red | Sin respuesta HTTP | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `caesar-ii` | Caesar II | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `call-of-duty-web-collection` | Call of Duty Web Collection | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `call-of-duty-modern-warfare-2` | Call of Duty: Modern Warfare 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `call-of-mini-dino-hunter` | Call of Mini: Dino Hunter (Revival) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `carmageddon` | Carmageddon | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `carmageddon-ii-carpocalypse-now` | Carmageddon II: Carpocalypse Now | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `castle-crashers` | Castle Crashers | 502 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cave-story` | Cave Story | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `chasm-the-rift` | Chasm: The Rift | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `christmas-massacre` | Christmas Massacre | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `class-of-09` | Class of '09 | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `clustertruck` | Clustertruck | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `command-conquer-generals` | Command & Conquer: Generals (wasm.com.br) | 308 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `command-conquer-generals-zero-hour` | Command & Conquer: Generals Zero Hour | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `command-conquer-red-alert-2` | Command & Conquer: Red Alert 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `command-conquer-renegade` | Command & Conquer: Renegade (Open Commando) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `commander-keen` | Commander Keen | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-half-life` | Counter Strike & Half Life (2) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-2019` | Counter Strike 2019 | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `counter-strike` | Counter-Strike (GStrike) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-2` | Counter-Strike 2 (cs2go, Three.js) | 429 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-source-bunnyhop` | Counter-Strike: Source Bunnyhop | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `counter-strike-source-surf` | Counter-Strike: Source Surf | 308 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `crash-bash-online` | Crash Bash Online | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `crash-nitro-kart` | Crash Nitro Kart | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `crash-team-racing` | Crash Team Racing (High Octane) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `crash-team-racing-turbocharged` | Crash Team Racing Turbocharged | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `crashout-crew` | Crashout Crew | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `crazy-cattle-3d` | Crazy Cattle 3D | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `createrria` | Createrria | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `crisis-core-final-fantasy-vii` | Crisis Core: Final Fantasy VII | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cro-mag-rally` | Cro-Mag Rally | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `cruelty-squad` | Cruelty Squad | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `cut-the-rope` | Cut the Rope (H5DX) | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cut-the-rope-dx` | Cut the Rope DX | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `cyberpunk-2077` | Cyberpunk 2077 | 402 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `daggerfall` | Daggerfall (DaggerfallJS) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `daytona-usa` | Daytona USA | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dead-plate` | Dead Plate | 404 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `deadseat` | Deadseat | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `the-deadseat` | The Deadseat | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `def-jam-fight-for-ny` | Def Jam: Fight for NY | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `deltarune` | Deltarune | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `deltarune-chapters-1-4` | Deltarune Chapters 1-4 | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `deltatraveler` | Deltatraveler | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `descent` | Descent | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `diablo` | Diablo | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `diablo-ii-lord-of-destruction` | Diablo II: Lord of Destruction (D2-Web) | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `dice-a-million` | Dice a Million | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `diddy-kong-racing` | Diddy Kong Racing (Golden Balloon) | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `a-difficult-game-about-climbing` | A Difficult Game About Climbing | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `do-not-take-this-cat-home` | Do NOT Take This Cat Home | 404 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `dokdo` | DOKDO (restoration) | 200 | Bloqueado por cabeceras | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `doki-doki-literature-club-plus` | Doki Doki Literature Club Plus! | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `doom` | Doom | 200 | Sin bloqueo detectado | No verificada (error de red) | 4/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `doom-3` | Doom 3 | error de red | Sin respuesta HTTP | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `doom-3-demo` | Doom 3 Demo | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `doom-i-ii` | DOOM I & II | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `doom-multiplayer` | Doom Multiplayer | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dos-zone` | Dos.Zone | 200 | Sin bloqueo detectado | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `downhill-domination` | Downhill Domination | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `dragon-ball-z-budokai-2` | Dragon Ball Z: Budokai 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dragon-ball-z-budokai-3` | Dragon Ball Z: Budokai 3 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dragon-ball-z-budokai-tenkaichi-2` | Dragon Ball Z: Budokai Tenkaichi 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dragon-ball-z-budokai-tenkaichi-3` | Dragon Ball Z: Budokai Tenkaichi 3 | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `drakan-the-ancients-gates` | Drakan: The Ancients' Gates (Drakan2PC) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `drascula-the-vampire-strikes-back` | Drascula: The Vampire Strikes Back (ScummWeb) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `duck-life-8` | Duck Life 8 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `dude-simulator` | Dude Simulator | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dude-simulator-2` | Dude Simulator 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `duke-caribbean-life-s-a-beach` | Duke Caribbean: Life's a Beach | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `duke-it-out-in-d-c` | Duke It Out in D.C. | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `duke-nukem-3d` | Duke Nukem 3D | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `duke-nukem-3d-tg` | Duke Nukem 3D TG | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `duke-nuclear-winter` | Duke: Nuclear Winter | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `dune-ii` | Dune II | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `dune-ii-tg` | DUNE II TG | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `dungeon-keeper` | Dungeon Keeper | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `ea-sports-cricket-07` | EA Sports Cricket 07 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `eaglercraft` | Eaglercraft | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `the-elder-scrolls-iii-morrowind` | The Elder Scrolls III: Morrowind (OpenMW) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `endoparasitic` | Endoparasitic | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `endoparasitic-2` | Endoparasitic 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `f1-race` | F1 Race (MTK) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `fallout` | Fallout | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fallout-nevada-sonora` | Fallout: Nevada / Sonora | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `faster-than-light-demo` | Faster Than Light: Demo | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `fatal-racing` | Fatal Racing | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fear-hunger` | Fear & Hunger | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fear-hunger-2-termina` | Fear & Hunger 2: Termina | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fears-to-fathom` | Fears To Fathom | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `fears-to-fathom-home-alone` | Fears to Fathom: Home Alone | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `feed-grow-fish` | Feed & Grow Fish | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fez` | FEZ | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `fifa-10` | FIFA 10 (PSP) | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `fifa-11` | FIFA 11 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fifa-12` | FIFA 12 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fifa-13` | FIFA 13 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fifa-14` | FIFA 14 (PSP) | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `fifa-street` | FIFA Street | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fifa-street-2` | FIFA Street 2 | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `fih` | Fih | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `fish` | FISH | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-candy-s` | Five Nights at Candy's | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-candy-s-2` | Five Nights at Candy's 2 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-epstein-s` | Five Nights at Epstein's | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-2` | Five Nights at Freddy's 2 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-3` | Five Nights at Freddy's 3 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-4` | Five Nights at Freddy's 4 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-4-halloween` | Five Nights at Freddy's 4: Halloween | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-world-refreshed` | Five Nights at Freddy's World: Refreshed | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-pizza-simulator` | Five Nights at Freddy's: Pizza Simulator | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-sister-location` | Five Nights at Freddy's: Sister Location | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-ultimate-custom-night` | Five Nights at Freddy's: Ultimate Custom Night | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-freddy-s-world` | Five Nights at Freddy's: World | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-frickbear-s-3` | Five Nights at Frickbear's 3 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `five-nights-at-last-breath` | Five Nights at Last Breath | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `flatout-2` | FlatOut 2 (dezm0n web port) | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `flight-of-the-amazon-queen` | Flight of the Amazon Queen (ScummWeb) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `flying-gorilla-3d` | Flying Gorilla 3D | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fnaf` | FNAF | 404 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `formula-one-06` | Formula One 06 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `freeciv` | Freeciv (Freeciv-web) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `fundamental-paper-novel` | Fundamental Paper Novel | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `fused-240` | Fused 240 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `gabriel-s-awesome-schoolhouse` | Gabriel's Awesome Schoolhouse (GASH) | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `getting-over-it` | Getting Over It | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `getting-over-it-with-bennett-foddy` | Getting Over It with Bennett Foddy | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `god-of-war-chains-of-olympus` | God of War: Chains of Olympus | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `god-of-war-ghost-of-sparta` | God of War: Ghost of Sparta | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `gold-miner-special-edition` | Gold Miner Special Edition | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `golden-sun` | Golden Sun | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `goldeneye-007` | GoldenEye 007 (GoldenWeb64) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `gorilla-tag` | Gorilla Tag | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `gran-turismo-2` | Gran Turismo 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `gran-turismo-4` | Gran Turismo 4 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `grand-theft-auto-2` | Grand Theft Auto 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `grand-theft-auto-iii` | Grand Theft Auto III (wasm.rip) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `grand-theft-auto-iii-online` | Grand Theft Auto III Online (quenq) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `grand-theft-auto-chinatown-wars` | Grand Theft Auto: Chinatown Wars (PPSSPP Web) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `grand-theft-auto-vice-city` | Grand Theft Auto: Vice City (quenq) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `granny` | Granny | error de red | Sin respuesta HTTP | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `gravity-defied` | Gravity Defied (gravity-defied-web) | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `gta-3` | GTA 3 (3) | 200 | Bloqueado por cabeceras | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `gta-v` | GTA V | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `guitar-hero-iii` | Guitar Hero III (Browser Edition) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `half-life-2` | Half Life 2 | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `half-life-opposing-force` | Half Life: Opposing Force | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `half-life-and-counter-strike-1-6` | Half-Life and Counter-Strike 1.6 (WebXash) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `halo-combat-evolved` | Halo: Combat Evolved | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `halo-combat-evolved-mobile` | Halo: Combat Evolved Mobile | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `happy-room` | Happy Room | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `happy-sheepies` | Happy Sheepies | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `harry-potter-and-the-chamber-of-secrets` | Harry Potter and the Chamber of Secrets | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `helltaker` | Helltaker | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `heretic-hexen` | HERETIC / HEXEN | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `heroes-of-might-and-magic-ii` | Heroes of Might and Magic II | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `hexen-ii` | Hexen II | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `hollow-knight` | Hollow Knight | 200 | Sin bloqueo detectado | No verificada (error de red) | 4/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `hollow-knight-silksong` | Hollow Knight: Silksong | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `homeworld` | Homeworld | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `hot-shots-tennis` | Hot Shots Tennis (OpenTennis) | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `hotline-miami` | Hotline Miami | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `how-to-fish` | How to Fish | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `human-expenditure-program` | Human Expenditure Program | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `i-can-t-believe-it-s-not-sonic-1` | I Can't Believe It's Not Sonic 1 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `i-wanna-be-the-guy` | I Wanna Be The Guy | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `in-stars-and-time` | In Stars and Time | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `inscryption` | Inscryption | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `iron-lung` | Iron Lung | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `jak-and-daxter-the-lost-frontier` | Jak and Daxter: The Lost Frontier | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `jeffrey-epstein-basics-in-education-and-kidnapping` | Jeffrey Epstein Basics In Education And Kidnapping | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `jelly-drift` | Jelly Drift | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `jumbo-mario` | Jumbo Mario | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `just-shapes-beats` | Just Shapes & Beats | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `karlson` | Karlson | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `karlson-2d` | Karlson 2D | 502 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `kindergarten` | Kindergarten | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `kindergarten-1-2` | Kindergarten 1 & 2 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `kindergarten-2` | Kindergarten 2 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `kindergarten-3` | Kindergarten 3 | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `kingdom-hearts-chain-of-memories` | Kingdom Hearts: Chain of Memories (RepliCoM) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `kingdom-rush` | Kingdom Rush (Flash Edition) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `kino-der-toten` | Kino der Toten | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `kirby-the-amazing-mirror` | Kirby & The Amazing Mirror (katam-port) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `kirby-soft-wet` | Kirby ~ Soft & Wet | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `koi-flixel` | koi/_flixel | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `la-madriguera` | La Madriguera (Lazy Bear Game) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `lacey-s-flash-games` | Lacey's Flash Games | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `legend-of-legaia` | Legend of Legaia | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `the-legend-of-zelda-twilight-princess` | The Legend of Zelda: Twilight Princess (Dusklight) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `lego-island` | LEGO Island | 200 | Sin bloqueo detectado | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `lego-racers` | LEGO Racers | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `lenin-first-blood` | Lenin: First Blood | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `lethal-ape` | Lethal Ape | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `lethal-company` | Lethal Company | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `limbo` | Limbo | 502 | No accesible | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `liquidator-3d` | Liquidator 3D | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `lobotomy-corporation` | Lobotomy Corporation | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `look-outside` | Look Outside | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `luanti` | Luanti (Minetest) | 200 | Bloqueado por cabeceras | OK (image/svg+xml) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `lugaru` | Lugaru | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `luigi-s-picture-poker` | Luigi's Picture Poker | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `madden-nfl-08` | Madden NFL 08 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `magic-tower-50-floors` | Magic Tower: 50 Floors | 200 | Bloqueado por cabeceras | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `the-man-from-the-window` | The Man From the Window | 404 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `the-man-from-the-window-2` | The Man From the Window 2 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `the-man-in-the-window` | The Man In The Window | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `marvel-vs-capcom-2` | Marvel vs. Capcom 2 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `master-of-defence` | Master of Defence | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `medabots-ax` | Medabots AX | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `metal-gear-solid` | Metal Gear Solid (Shadow Moses Web) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `midnight-club-3-dub-edition` | Midnight Club 3: DUB Edition | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `midnight-shift` | Midnight Shift | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `milk-inside-a-bag-of-milk-inside-a-bag-of-milk` | Milk inside a bag of milk inside a bag of milk | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `milk-outside-a-bag-of-milk-outside-a-bag-of-milk` | Milk outside a bag of milk outside a bag of milk | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `milkman-karlson` | Milkman Karlson | 404 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `mindwave` | Mindwave | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `minecraft-0-6-1` | Minecraft 0.6.1 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `minecraft-pocket-edition` | Minecraft Pocket Edition | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `minecraft-story-mode` | Minecraft Story Mode | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `minesweeper-plus` | Minesweeper Plus | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `mini-dayz` | Mini DayZ | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `miside` | MiSide | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `monster-hunter-freedom-unite` | Monster Hunter Freedom Unite | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `moon` | Moon (Zombies) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `mortal-kombat-armageddon` | Mortal Kombat: Armageddon | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `mortal-kombat-shaolin-monks` | Mortal Kombat: Shaolin Monks | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `motocross-madness-2` | Motocross Madness 2 (mcm2-web) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `my-talking-baby-hippo` | My Talking Baby Hippo | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `nacht-der-untoten` | Nacht der Untoten | 200 | Bloqueado por cabeceras | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `nam-napalm` | NAM / Napalm | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `naruto-shippuden-ultimate-ninja-impact` | Naruto Shippuden: Ultimate Ninja Impact | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `nba-2k12` | NBA 2K12 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `nba-street-v3` | NBA Street V3 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `nblood` | NBlood | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `ncaa-football-10` | NCAA Football 10 (PSP Recomp) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `need-for-speed-carbon` | Need for Speed: Carbon (online multiplayer) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `need-for-speed-most-wanted` | Need for Speed: Most Wanted (nfsmw-webport) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `need-for-speed-underground-2` | Need for Speed: Underground 2 | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `needy-streamer-overload` | Needy Streamer Overload | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `netquake-io` | NetQuake.io | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `nfl-street` | NFL Street | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `nfl-street-2` | NFL Street 2 (NIL Street) | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `nhl-94` | NHL '94 | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `no-one-lives-forever` | No One Lives Forever | 200 | Sin bloqueo detectado | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `nubby-s-number-factory` | Nubby's Number Factory | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `omori` | OMORI | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `oneshot` | Oneshot (Legacy) | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `oneshot-world-machine-edition` | Oneshot: World Machine Edition | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `open-sonic` | Open Sonic | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `openttd` | OpenTTD | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `overburden` | Overburden | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `peak` | PEAK (VERY wip) | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `peaks-of-yore` | Peaks of Yore | error de red | Sin respuesta HTTP | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `pekka-kana-2` | Pekka Kana 2 | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `penthouse-paradise` | Penthouse Paradise | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `people-playground` | People Playground | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `pepsiman` | Pepsiman | 403 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `perfect-dark` | Perfect Dark | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `phantasy-star-online` | Phantasy Star Online (PSO Reborn) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `phantasy-star-online-episode-i-ii` | Phantasy Star Online Episode I & II (PSO Reborn) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `phineas-and-ferb-in-the-transport-inators-of-doooom` | Phineas and Ferb in the Transport-inators of Doooom | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `pikmin` | Pikmin | 502 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `pizza-tower` | Pizza Tower | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `pizza-tower-scoutdigo` | Pizza Tower: Scoutdigo | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `plague-inc` | Plague Inc | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `plants-vs-zombies-goty-edition` | Plants vs Zombies: GOTY Edition | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `plunder-pillage` | Plunder & Pillage | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `pok-mon-mystery-dungeon` | Pokémon Mystery Dungeon (Web Mystery Dungeon) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `portal` | Portal | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `postal-2` | POSTAL 2 (KahnStation) | 308 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `power-hover` | Power Hover | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `powerslave` | Powerslave | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `prince-of-persia` | Prince of Persia | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `pro-evolution-soccer-2011` | Pro Evolution Soccer 2011 | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `pro-evolution-soccer-2012` | Pro Evolution Soccer 2012 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `pro-evolution-soccer-2014` | Pro Evolution Soccer 2014 (PSP) | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `pro-evolution-soccer-6` | Pro Evolution Soccer 6 | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `project-i-g-i-i-m-going-in` | Project I.G.I.: I'm Going In | 200 | Bloqueado por cabeceras | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `promises-to-keep` | Promises to Keep | 502 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `purble-place` | Purble Place (decomp) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `quake` | Quake | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `quake-ii` | Quake II | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `quake-iii-arena` | Quake III Arena | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `quake-tg` | Quake TG | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `quakeworld` | QuakeWorld | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `quest-for-al-qa-eda` | Quest for Al-Qa'eda | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `quest-for-hussein` | Quest for Hussein | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `r-e-p-o` | R.E.P.O | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `raft` | RAFT | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `raft-wars-2` | Raft Wars 2 | 200 | Bloqueado por cabeceras | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `rain-world` | Rain World | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `raldi-s-crackhouse` | Raldi's Crackhouse | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `ratchet-clank` | Ratchet & Clank | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `ratchet-clank-size-matters` | Ratchet & Clank: Size Matters | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `re-run` | RE:RUN | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `redneck-rampage` | Redneck Rampage | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `redneck-rampage-rides-again` | Redneck Rampage: Rides Again | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `redneck-rampage-route-66` | Redneck Rampage: Route 66 | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `reset-generation` | Reset Generation | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `resident-evil-4` | Resident Evil 4 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `resident-evil-outbreak-file-1-2` | Resident Evil Outbreak File #1 & #2 (Outbreak Web) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `return-to-castle-wolfenstein` | Return to Castle Wolfenstein | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `rimworld` | Rimworld | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `road-rash` | Road Rash (Three.js) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `rocks-n-diamonds` | Rocks'n'Diamonds | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `rollercoaster-tycoon-2` | RollerCoaster Tycoon 2 (OpenRCT2) | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `rolling-sky` | Rolling Sky (web port) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `rugby-08` | Rugby 08 (mitchivin) | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `runescape-classic` | RuneScape Classic | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `s-p-l-i-t` | S.P.L.I.T | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `s-t-a-l-k-e-r-call-of-pripyat` | S.T.A.L.K.E.R.: Call of Pripyat (ZoneVM) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `samokatogeddon` | Samokatogeddon (Carmageddon II mod) | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `scampton-the-great` | Scampton The Great | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `schoolboy-runaway` | Schoolboy Runaway | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `scp-containment-breach` | SCP: Containment Breach | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `the-seven-games-of-the-soul` | The Seven Games of the Soul | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `shadow-warrior` | Shadow Warrior | error de red | Sin respuesta HTTP | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `shadow-warrior-twin-dragon` | Shadow Warrior: Twin Dragon | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `shadow-warrior-wanton-destruction` | Shadow Warrior: Wanton Destruction | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `shift-at-midnight` | Shift at Midnight | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `silent-hill-origins` | Silent Hill: Origins | 200 | Sin bloqueo detectado | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `silkroad-online` | Silkroad Online (OpenSRO) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `simcity` | SimCity (micropolisJS) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `simgolf` | SimGolf | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `simtower` | SimTower (benphelps) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `skate-rust` | Skate × Rust (Global Terror) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `slay-the-spire` | Slay the Spire | 502 | No accesible | Rota/inesperada (404, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `slender-the-8-pages` | Slender: The 8 Pages | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `slender-the-eight-pages` | Slender: The Eight Pages | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `slendytubbies-1` | Slendytubbies 1 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `slendytubbies-2` | Slendytubbies 2 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `slendytubbies-2d` | Slendytubbies 2D | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `slime-rancher` | Slime Rancher | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `socom-ii-u-s-navy-seals` | SOCOM II: U.S. Navy SEALs (SOCOM Legacy) | 200 | Bloqueado por cabeceras | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `sonic-cd` | Sonic CD | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `sonic-mania` | Sonic Mania | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `sonic-robo-blast-2` | Sonic Robo Blast 2 | 403 | No accesible | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `sonic-robo-blast-2-kart` | Sonic Robo Blast 2 Kart | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `sonic-robo-blast-2-legacy` | Sonic Robo Blast 2 Legacy (SRB2LegacyWeb) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `sonic-the-fighters` | Sonic the Fighters | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `sonic-the-hedgehog-4-episode-i` | Sonic the Hedgehog 4: Episode I | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `sonic-worlds-next` | Sonic Worlds Next | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `sonic-exe` | SONIC.EXE | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `space-rangers-quests` | Space Rangers: Quests | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `space-station-13` | Space Station 13 (ss13.live) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `spaceflight-simulator` | Spaceflight Simulator | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `the-specialists` | The Specialists (Half-Life mod, specialists-browser) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `speed-stars` | Speed Stars | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `speedy-blupi-speedy-eggbert-2-planet-blupi` | Speedy Blupi / Speedy Eggbert 2 / Planet Blupi | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `spelunky-classic-hd` | Spelunky Classic HD | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `spider-man-2` | Spider-Man 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `ssx-3` | SSX 3 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `star-fox-adventures` | Star Fox Adventures | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `star-wars-jedi-knight-dark-forces-2` | Star Wars Jedi Knight Dark Forces 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `star-wars-jedi-knight-jedi-academy` | Star Wars Jedi Knight: Jedi Academy | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `star-wars-empire-at-war` | Star Wars: Empire at War (Browser Edition) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `stardew-valley` | Stardew Valley | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `stick-war` | Stick War | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `stick-with-it` | Stick with It | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `street-fighter-anniversary-collection` | Street Fighter Anniversary Collection | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `street-fighter-iii-3rd-strike` | Street Fighter III: 3rd Strike | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `stunts` | Stunts (PlayStunts) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-mario-64-multiplayer` | Super Mario 64 Multiplayer | 403 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-mario-bros-remastered` | Super Mario Bros. Remastered | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `super-mario-kart` | Super Mario Kart (SM-Kart-ZX Web Port) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-mario-sunshine` | Super Mario Sunshine | 502 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-mario-zombies` | Super Mario Zombies | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-monkey-ball` | Super Monkey Ball | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `super-smash-bros` | Super Smash Bros. (smash.fun) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `syndicate` | Syndicate | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tekken-4` | Tekken 4 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tekken-5` | Tekken 5 | 200 | Sin bloqueo detectado | No verificada (error de red) | 4/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tekken-dark-resurrection` | Tekken: Dark Resurrection | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `terraria` | Terraria | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tony-hawk-s-pro-skater-3` | Tony Hawk's Pro Skater 3 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tony-hawk-s-underground-2` | Tony Hawk's Underground 2 | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `t` | t³ (T cubed) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `taiko-no-tatsujin` | Taiko no Tatsujin | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tattletail` | Tattletail | 404 | No accesible | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `team-fortress-2` | Team Fortress 2 | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `tekken-5-dark-resurrection` | Tekken 5: Dark Resurrection (Recomp) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `that-s-not-my-neighbor` | That's Not My Neighbor | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tomb-raider` | Tomb Raider | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `toonstruck` | Toonstruck | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `totally-accurate-battle-simulator` | Totally Accurate Battle Simulator (TABS) | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `touhou-mother` | Touhou Mother | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `tremulous` | Tremulous | 200 | Bloqueado por cabeceras | Rota/inesperada (429, text/html) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `trombone-champ` | Trombone Champ | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `tsukihime` | Tsukihime (TsukiWeb) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `tyrian` | Tyrian (OpenTyrian) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `ufc-2009-undisputed-throwdown` | UFC 2009 Undisputed / Throwdown | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `ufc-throwdown` | UFC Throwdown | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `ultrakill` | ULTRAKILL | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `ultrakill-prelude` | Ultrakill Prelude | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `ultrapool` | Ultrapool | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `undertale-yellow` | Undertale Yellow | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `unreal-tournament` | Unreal Tournament (SurrealEngine Web) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `untitled-goose-game` | Untitled Goose Game | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `the-ur-quan-masters` | The Ur-Quan Masters (Star Control II) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `urban-chaos` | Urban Chaos (OpenChaos) | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `urban-terror` | Urban Terror | 200 | Sin bloqueo detectado | OK (image/jpeg) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `uvuvwevwevweonyetenvewveugwemubwemossas` | UvuvwevwevweOnyetenvewveUgwemubwemOssas | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `virtua-fighter` | Virtua Fighter | 200 | Sin bloqueo detectado | Rota/inesperada (429, text/html) | 0/4 metadatos; relevancia IA pendiente | Reparar portada |
| `virtua-tennis-2` | Virtua Tennis 2 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `virtual-on-cyber-troopers` | Virtual On: Cyber Troopers | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `vvvvvv` | VVVVVV | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `wadcmd` | WadCMD | 200 | Sin bloqueo detectado | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Revisión manual |
| `warcraft-ii` | Warcraft II (Wargus) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `the-warriors` | The Warriors | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `warzone-2100` | Warzone 2100 (Web Edition) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `wasm-arcade` | WASM Arcade | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `wasm-rip` | wasm.rip | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `webfishing` | Webfishing | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `who-s-your-daddy` | Who's Your Daddy? | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `william-shatner-s-tekwar` | William Shatner's TekWar | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `wipeout` | WipEout | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `witch-s-heart` | Witch's Heart | 404 | No accesible | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `witchaven` | Witchaven | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `witchaven-ii` | Witchaven II | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `wolfenstein-3d` | Wolfenstein 3D (HTML5, lazarv) | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `wolfenstein-3d-tg` | Wolfenstein 3D TG | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `ww2-gi-platoon-leader` | WW2 GI: Platoon Leader | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `wwe-smackdown-vs-raw-2010` | WWE SmackDown vs. Raw 2010 | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `wwe-smackdown-vs-raw-2011` | WWE SmackDown vs. Raw 2011 | 200 | Bloqueado por cabeceras | OK (image/png) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `wwe-smackdown-here-comes-the-pain` | WWE SmackDown! Here Comes the Pain | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `wwe-smackdown-vs-raw` | WWE SmackDown! vs. RAW | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `wwii-gi` | WWII GI | error de red | Sin respuesta HTTP | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `xiao-xiao-4-bar-shootout` | Xiao Xiao 4: Bar Shootout | 200 | Bloqueado por cabeceras | OK (image/webp) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `xrick` | xrick | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `yandere-simulator` | Yandere Simulator | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `your-only-move-is-hustle` | Your Only Move is Hustle | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `yume-nikki` | Yume Nikki | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
| `zelda-ii-the-adventure-of-link` | Zelda II: The Adventure of Link (z2rs) | 200 | Sin bloqueo detectado | Genérica (Unsplash) | 0/4 metadatos; relevancia IA pendiente | Buscar portada específica |
| `doodle-jump-classic` | Doodle Jump Classic | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `snake-retro-3310` | Snake Retro 3310 | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `klondike-solitaire-web` | Solitario Clásico (Klondike) | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `pacman-retro-touch` | Pac-Man Touch Edition | 200 | Sin bloqueo detectado | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar verificación de portada |
| `sudoku-master-web` | Sudoku Master Classic | 200 | Bloqueado por cabeceras | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Probar mirror o lanzamiento externo |
| `hextris-html5` | Hextris (Puzzle Hexagonal) | error de red | Sin respuesta HTTP | No verificada (error de red) | 0/4 metadatos; relevancia IA pendiente | Reintentar/revisar enlace |
