# Reporte de Auditoría de Jugabilidad RetroCloud

**Fecha:** 11/9/2026, 12:06:52 AM
**Total juegos auditados:** 273
**Juegos funcionales 100%:** 231

## ⚠️ Juegos con Modo 'iframe' Bloqueados por Cabeceras (Deben pasar a 'external')
Estos juegos tienen `X-Frame-Options: SAMEORIGIN` o CSP restrictivo. Si se abren en iframe se ven grises/rotos, pero funcionan perfecto en modo Lanzador Externo:

| ID | Título | HTTP | Bloqueo | URL |
|---|---|---|---|---|
| `cookie-clicker` | Cookie Clicker | 403 | X-Frame-Options: sameorigin | [Link](https://orteil.dashnet.org/cookieclicker/) |
| `grand-theft-auto-vice-city` | Grand Theft Auto: Vice City (quenq) | 200 | CSP frame-ancestors blocked | [Link](https://vc.quenq.com/) |
| `quake` | Quake | 200 | X-Frame-Options: sameorigin | [Link](https://qwasm.m-h.org.uk/) |
| `spelunky-classic-hd` | Spelunky Classic HD | 200 | CSP frame-ancestors blocked | [Link](https://yancharkin.itch.io/spelunky-classic-hd) |
| `urban-terror` | Urban Terror | 301 | CSP frame-ancestors blocked | [Link](http://ut.pieter.com) |

## ❌ Juegos Caídos o con Timeout

| ID | Título | Status | Motivo | URL |
|---|---|---|---|---|
| `cookie-clicker` | Cookie Clicker | 403 | Error | [Link](https://orteil.dashnet.org/cookieclicker/) |
| `undertale` | Undertale | 404 | Error | [Link](https://gn-math.github.io/web-port/undertale/) |
| `amanda-the-adventurer` | Amanda The Adventurer | 404 | Error | [Link](https://gn-math.github.io/web-port/amanda-the-adventurer/) |
| `andy-s-apple-farm` | Andy's Apple Farm | 404 | Error | [Link](https://gn-math.github.io/web-port/andys-apple-farm/) |
| `buckshot-roulette` | Buckshot Roulette | 404 | Error | [Link](https://gn-math.github.io/web-port/buckshot-roulette/) |
| `class-of-09` | Class of '09 | 404 | Error | [Link](https://gn-math.github.io/web-port/class-of-09/) |
| `counter-strike-2` | Counter-Strike 2 (cs2go, Three.js) | 429 | Error | [Link](https://cs2go.3kh0.net) |
| `cyberpunk-2077` | Cyberpunk 2077 | 402 | Error | [Link](https://cyberpunk2077.lol/) |
| `deadseat` | Deadseat | 404 | Error | [Link](https://gn-math.github.io/web-port/deadseat/) |
| `the-deadseat` | The Deadseat | 404 | Error | [Link](https://gn-math.github.io/web-port/deadseat/) |
| `deltarune` | Deltarune | 404 | Error | [Link](https://gn-math.github.io/web-port/deltatraveler/) |
| `dungeon-keeper` | Dungeon Keeper | 404 | Error | [Link](https://dk-browser.tiiny.site/) |
| `fears-to-fathom` | Fears To Fathom | 404 | Error | [Link](https://gn-math.github.io/web-port/fears-to-fathom/) |
| `feed-grow-fish` | Feed & Grow Fish | 0 | getaddrinfo ENOTFOUND reeyukifish.pages.dev | [Link](https://reeyukifish.pages.dev/) |
| `flatout-2` | FlatOut 2 (dezm0n web port) | 404 | Error | [Link](https://itch.io/event/46481004) |
| `getting-over-it` | Getting Over It | 404 | Error | [Link](https://gn-math.github.io/web-port/getting-over-it/) |
| `half-life-2` | Half Life 2 | 404 | Error | [Link](https://hl2.slqnt.dev/) |
| `happy-sheepies` | Happy Sheepies | 404 | Error | [Link](https://gn-math.github.io/web-port/happy-sheepies/) |
| `hotline-miami` | Hotline Miami | 404 | Error | [Link](https://gn-math.github.io/web-port/hotline-miami/) |
| `karlson` | Karlson | 404 | Error | [Link](https://gn-math.github.io/web-port/karlson/) |
| `lacey-s-flash-games` | Lacey's Flash Games | 404 | Error | [Link](https://gn-math.github.io/web-port/laceys-flash-games/) |
| `omori` | OMORI | 404 | Error | [Link](https://gn-math.github.io/web-port/omori-fixed/) |
| `people-playground` | People Playground | 404 | Error | [Link](https://gn-math.github.io/web-port/people-playground/) |
| `pizza-tower` | Pizza Tower | 404 | Error | [Link](https://gn-math.github.io/web-port/pizza-tower/) |
| `r-e-p-o` | R.E.P.O | 404 | Error | [Link](https://gn-math.github.io/web-port/repo/) |
| `raft` | RAFT | 404 | Error | [Link](https://gn-math.github.io/web-port/raft/) |
| `rain-world` | Rain World | 408 | Request timeout | [Link](https://stelight.games/play/webports/stellite.games/stellite/rain-world/) |
| `schoolboy-runaway` | Schoolboy Runaway | 404 | Error | [Link](https://gn-math.github.io/web-port/schoolboy-runaway/) |
| `speed-stars` | Speed Stars | 404 | Error | [Link](https://gn-math.github.io/web-port/speed-stars/) |
| `super-mario-64-multiplayer` | Super Mario 64 Multiplayer | 403 | Error | [Link](https://olivers.tools/play/) |
| `tekken-dark-resurrection` | Tekken: Dark Resurrection | 0 | connect ECONNREFUSED 66.22.16.138:443 | [Link](https://tekkendr.live/) |
| `tattletail` | Tattletail | 404 | Error | [Link](https://gn-math.github.io/web-port/tattletail/) |
| `that-s-not-my-neighbor` | That's Not My Neighbor | 404 | Error | [Link](https://gn-math.github.io/web-port/thats-not-my-neighbor/) |
| `trombone-champ` | Trombone Champ | 404 | Error | [Link](https://wasm.rip/files/tchamp/index.html) |
| `vvvvvv` | VVVVVV | 408 | Request timeout | [Link](https://stelight.games/play/webports/stellite.games/stellite/vvvvvv/) |
| `webfishing` | Webfishing | 404 | Error | [Link](https://gn-math.github.io/web-port/web-fishing/) |
| `witch-s-heart` | Witch's Heart | 404 | Error | [Link](https://gn-math.github.io/web-port/witch-heart/) |
| `yume-nikki` | Yume Nikki | 404 | Error | [Link](https://gn-math.github.io/web-port/yume-nikki/) |
