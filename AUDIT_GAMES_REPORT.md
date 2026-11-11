# RetroCloud — reporte preliminar de catálogo

## Alcance y método

Se revisaron los 496 registros de `games.json` con la página local de RetroCloud y sus metadatos declarados; no se ejecutó una prueba de juego en cada uno de los 496 destinos. El estado `down` o `blocked` que aparece abajo es el estado registrado en el catálogo, no una confirmación HTTP actual ni un diagnóstico en vivo de CORS, WebSocket o pantalla negra.

Inventario observado:

| Indicador | Registros |
|---|---:|
| Total | 496 |
| `launchMode: iframe` | 386 |
| `launchMode: external` | 110 |
| `status: ok` | 382 |
| `status: down` | 63 |
| `status: blocked` | 38 |
| Imágenes con URL genérica de Unsplash | 342 |

Las categorías de estado son campos existentes y no necesariamente cubren todos los registros. Los conteos de `ok`, `down` y `blocked` suman 483; 13 registros no tienen uno de esos tres estados.

## Lista A — juegos marcados en el catálogo como `down` o `blocked`

Esta lista identifica qué revisar primero; no afirma que los destinos sigan fallando hoy.

| ID | Juego | Estado registrado |
|---|---|---|
| `minecraft-1-8-8` | Minecraft 1.8.8 (EaglercraftX) | blocked |
| `undertale` | Undertale | down |
| `amanda-the-adventurer` | Amanda The Adventurer | down |
| `american-mcgee-s-alice` | American McGee’s Alice | blocked |
| `andy-s-apple-farm` | Andy's Apple Farm | down |
| `bergentruck-201x` | BERGENTRUCK 201x | down |
| `bloodmoney` | BLOODMONEY! | down |
| `buckshot-roulette` | Buckshot Roulette | down |
| `class-of-09` | Class of '09 | down |
| `counter-strike-2019` | Counter Strike 2019 | blocked |
| `counter-strike-2` | Counter-Strike 2 (cs2go, Three.js) | down |
| `crash-bash-online` | Crash Bash Online | blocked |
| `createrria` | Createrria | down |
| `cut-the-rope` | Cut the Rope (H5DX) | down |
| `cyberpunk-2077` | Cyberpunk 2077 | down |
| `dead-plate` | Dead Plate | down |
| `deadseat` | Deadseat | down |
| `the-deadseat` | The Deadseat | down |
| `deltarune` | Deltarune | down |
| `deltarune-chapters-1-4` | Deltarune Chapters 1-4 | down |
| `diablo-ii-lord-of-destruction` | Diablo II: Lord of Destruction (D2-Web) | blocked |
| `do-not-take-this-cat-home` | Do NOT Take This Cat Home | down |
| `dokdo` | DOKDO (restoration) | blocked |
| `dragon-ball-z-budokai-tenkaichi-3` | Dragon Ball Z: Budokai Tenkaichi 3 | blocked |
| `dungeon-keeper` | Dungeon Keeper | down |
| `the-elder-scrolls-iii-morrowind` | The Elder Scrolls III: Morrowind (OpenMW) | blocked |
| `fears-to-fathom` | Fears To Fathom | down |
| `feed-grow-fish` | Feed & Grow Fish | down |
| `fifa-10` | FIFA 10 (PSP) | blocked |
| `fifa-12` | FIFA 12 | down |
| `fifa-14` | FIFA 14 (PSP) | blocked |
| `fifa-street-2` | FIFA Street 2 | blocked |
| `flatout-2` | FlatOut 2 (dezm0n web port) | down |
| `fnaf` | FNAF | down |
| `getting-over-it` | Getting Over It | down |
| `gold-miner-special-edition` | Gold Miner Special Edition | blocked |
| `gta-3` | GTA 3 (3) | blocked |
| `half-life-2` | Half Life 2 | down |
| `happy-sheepies` | Happy Sheepies | down |
| `hotline-miami` | Hotline Miami | down |
| `human-expenditure-program` | Human Expenditure Program | down |
| `jelly-drift` | Jelly Drift | down |
| `karlson` | Karlson | down |
| `kindergarten-1-2` | Kindergarten 1 & 2 | down |
| `kingdom-rush` | Kingdom Rush (Flash Edition) | blocked |
| `koi-flixel` | koi/_flixel | down |
| `lacey-s-flash-games` | Lacey's Flash Games | down |
| `luanti` | Luanti (Minetest) | blocked |
| `luigi-s-picture-poker` | Luigi's Picture Poker | down |
| `magic-tower-50-floors` | Magic Tower: 50 Floors | blocked |
| `the-man-from-the-window` | The Man From the Window | down |
| `master-of-defence` | Master of Defence | down |
| `metal-gear-solid` | Metal Gear Solid (Shadow Moses Web) | blocked |
| `midnight-club-3-dub-edition` | Midnight Club 3: DUB Edition | blocked |
| `milkman-karlson` | Milkman Karlson | down |
| `minesweeper-plus` | Minesweeper Plus | down |
| `nacht-der-untoten` | Nacht der Untoten | blocked |
| `naruto-shippuden-ultimate-ninja-impact` | Naruto Shippuden: Ultimate Ninja Impact | blocked |
| `need-for-speed-underground-2` | Need for Speed: Underground 2 | blocked |
| `nfl-street-2` | NFL Street 2 (NIL Street) | blocked |
| `nhl-94` | NHL '94 | blocked |
| `omori` | OMORI | down |
| `people-playground` | People Playground | down |
| `pepsiman` | Pepsiman | down |
| `phineas-and-ferb-in-the-transport-inators-of-doooom` | Phineas and Ferb in the Transport-inators of Doooom | down |
| `pizza-tower` | Pizza Tower | down |
| `postal-2` | POSTAL 2 (KahnStation) | blocked |
| `pro-evolution-soccer-2014` | Pro Evolution Soccer 2014 (PSP) | blocked |
| `project-i-g-i-i-m-going-in` | Project I.G.I.: I'm Going In | blocked |
| `promises-to-keep` | Promises to Keep | down |
| `r-e-p-o` | R.E.P.O | down |
| `raft` | RAFT | down |
| `raft-wars-2` | Raft Wars 2 | blocked |
| `rain-world` | Rain World | down |
| `resident-evil-outbreak-file-1-2` | Resident Evil Outbreak File #1 & #2 (Outbreak Web) | blocked |
| `schoolboy-runaway` | Schoolboy Runaway | down |
| `silkroad-online` | Silkroad Online (OpenSRO) | blocked |
| `skate-rust` | Skate × Rust (Global Terror) | blocked |
| `slender-the-eight-pages` | Slender: The Eight Pages | down |
| `socom-ii-u-s-navy-seals` | SOCOM II: U.S. Navy SEALs (SOCOM Legacy) | blocked |
| `sonic-robo-blast-2` | Sonic Robo Blast 2 | down |
| `space-station-13` | Space Station 13 (ss13.live) | blocked |
| `speed-stars` | Speed Stars | down |
| `stick-war` | Stick War | blocked |
| `super-mario-64-multiplayer` | Super Mario 64 Multiplayer | down |
| `super-smash-bros` | Super Smash Bros. (smash.fun) | blocked |
| `tekken-dark-resurrection` | Tekken: Dark Resurrection | down |
| `tattletail` | Tattletail | down |
| `that-s-not-my-neighbor` | That's Not My Neighbor | down |
| `tremulous` | Tremulous | blocked |
| `trombone-champ` | Trombone Champ | down |
| `ultrakill-prelude` | Ultrakill Prelude | down |
| `undertale-yellow` | Undertale Yellow | down |
| `vvvvvv` | VVVVVV | down |
| `wasm-arcade` | WASM Arcade | blocked |
| `webfishing` | Webfishing | down |
| `witch-s-heart` | Witch's Heart | down |
| `wwe-smackdown-vs-raw-2011` | WWE SmackDown vs. Raw 2011 | blocked |
| `xiao-xiao-4-bar-shootout` | Xiao Xiao 4: Bar Shootout | blocked |
| `yandere-simulator` | Yandere Simulator | down |
| `yume-nikki` | Yume Nikki | down |

### Incidencias de datos que requieren atención

- `GTA: Vice City (WASM)` (`gta-vice-city`) tiene una nota explícita: requiere cargar archivos de datos del juego. No se debe presentar como listo para jugar sin revisar ese flujo.
- `Minecraft 1.8.8 (EaglercraftX)` (`minecraft-1-8-8`) está marcado `blocked`.
- Los registros de Counter-Strike incluyen títulos marcados `blocked` y `down`; cualquier problema de WebSocket debe confirmarse en el destino y no inferirse solo por el nombre.

## Lista B — evaluación de autohospedaje

No se aprobó migrar juegos de terceros a infraestructura propia: el catálogo no contiene licencias, repositorios fuente, ni permisos de distribución de los assets necesarios. Autohospedar un motor open-source no autoriza a copiar ROMs, datos propietarios ni el juego completo.

Revisiones técnicas posibles, condicionadas a comprobar licencia de código y assets:

| Juego/registro | Estado actual | Condición antes de migrar |
|---|---|---|
| The Simpsons: Hit & Run (WASM) (`simpsons-hit-and-run`) | Lanzador externo, port WASM de tercero | Verificar licencia del port y excluir assets propietarios si no hay autorización. |
| Subway Surfers (Web Edition) (`subway-surfers`) | Lanzador externo | No copiar contenido del juego; requerir autorización del titular o una implementación independiente compatible. |
| Naruto Shippuden: Ultimate Ninja 5 (`naruto-shippuden-ultimate-ninja-5`) | Lanzador externo | Verificar derechos del juego, emulador y datos; no empaquetar ROM/ISO sin permiso. |
| Skate 3 (Fan Made Web) (`skate-3`) | Lanzador externo | Verificar licencia del port y derechos sobre recursos de Skate 3. |
| Burnout 3: Takedown (`burnout-3-takedown`) | Lanzador externo | Verificar derechos del port y datos del juego antes de alojar. |
| Crash Nitro Kart (`crash-nitro-kart`) | Lanzador externo | Verificar derechos del port y assets antes de alojar. |

La selección es una lista para investigar, no una autorización ni una conclusión de que los ports sean de código abierto.
