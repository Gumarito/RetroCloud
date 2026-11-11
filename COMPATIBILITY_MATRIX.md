# RetroCloud — matriz de compatibilidad (inventario preliminar)

## Alcance

La matriz se generó a partir de los metadatos declarados en `games.json` (496 registros). `launchMode`, tags, categorías, URL y `status` sirven para inventario, pero el catálogo no contiene un campo de motor web normalizado. Por eso las cifras de motor son **indicios que se pueden buscar**, no una confirmación técnica del motor real de cada juego.

## Distribución declarada

| Modo / estado | Cantidad | Lectura |
|---|---:|---|
| `launchMode: iframe` | 386 | El catálogo intenta abrir el destino dentro del reproductor. No garantiza compatibilidad con `iframe`, CORS ni ejecución correcta. |
| `launchMode: external` | 110 | Se abre mediante un lanzador a una página de terceros. |
| `status: ok` | 382 | Etiqueta de estado registrada; no equivale a una comprobación en vivo. |
| `status: down` | 63 | Marcados para revisión en [AUDIT_GAMES_REPORT.md](./AUDIT_GAMES_REPORT.md). |
| `status: blocked` | 38 | Marcados para revisión en [AUDIT_GAMES_REPORT.md](./AUDIT_GAMES_REPORT.md). |
| Sin uno de los estados anteriores | 13 | Requieren clasificación manual. |

## Señales de motor (pueden solaparse)

| Familia solicitada | Registros con señal en categoría/tags/URL | Evidencia y limitación |
|---|---:|---|
| HTML5 / Canvas nativo | 375 | Tag `Web Native`. El tag no identifica Canvas frente a DOM, WebGL o un port. |
| WebAssembly / port C++ | 40 | Coincidencia de `WASM`, `WebAssembly` o `C++` como términos completos en metadatos. |
| WebGL 3D | 3 | Coincidencia de `WebGL`, `Three.js` o `ThreeJS`. Otros juegos 3D pueden no estar etiquetados. |
| Emulador DOS / JS-DOS | 1 | Coincidencia de `DOS` o `JS-DOS`. El inventario no demuestra que JS-DOS sea el motor usado. |
| Emulador de consola clásica | 110 | Coincidencia textual de términos como `emulator`, `emulador`, `RetroArch`, `NES`, `SNES`, `PSX`, `PlayStation`, `Nintendo 64` o `Game Boy`. Es una señal amplia, no confirmación del emulador. |
| Lanzador externo | 110 | `launchMode: external`; clase exacta de ejecución todavía no tipada. |

Las señales anteriores se calculan independientemente, de modo que un juego puede pertenecer a más de una familia. No deben sumarse para obtener 496.

## Clasificación primaria exhaustiva por señales disponibles

Para asignar exactamente un bucket a cada entrada, se aplica esta prioridad: `external` → palabra clave DOS/JS-DOS → WASM/C++ → WebGL/Three.js → palabra clave de emulador de consola → tag `Web Native` → iframe sin motor indicado. Es una partición reproducible de los 496 registros según sus metadatos declarados; **no convierte indicios en una detección del motor que ejecuta el sitio enlazado**.

| Bucket primario | Entradas | Estado epistemológico |
|---|---:|---|
| Lanzador externo (`launchMode: external`) | 110 | Confirmado como modo declarado por el catálogo. |
| Señal textual DOS / JS-DOS | 1 | Candidato, motor no confirmado. |
| Señal textual WASM / C++ | 38 | Candidato, motor no confirmado. |
| Señal textual WebGL / Three.js | 4 | Candidato, motor no confirmado. |
| Señal textual de emulador de consola | 0 | No hay coincidencias primarias con esta prioridad. No significa que no haya juegos emulados. |
| Tag `Web Native`, sin señal anterior | 332 | Tag del catálogo; tecnología de renderizado no especificada. |
| Iframe con motor sin especificar | 11 | Solo modo iframe confirmado. |
| **Total** | **496** | Cada registro cae en un único bucket primario. |

Las señales originales no forman necesariamente la partición primaria: por ejemplo, los registros `Web Native` son 375, pero 43 ya pertenecen a un bucket de prioridad mayor. Una etiqueta `Emulador 3D` genérica no identifica una consola ni un runtime concreto.

## Criterio de compatibilidad y siguientes verificaciones

1. `launchMode: iframe` solo confirma el modo solicitado por la interfaz. Debe probarse cada destino real para detectar bloqueo de framing, errores de red, CORS y requisitos de aislamiento/archivos.
2. `launchMode: external` se conserva como lanzador mientras no haya un port redistribuible, código fuente con licencia compatible y autorización para los datos del juego.
3. Las etiquetas `down` y `blocked` son prioridades de comprobación, no resultados recién medidos. Ver la lista de IDs y nombres en [AUDIT_GAMES_REPORT.md](./AUDIT_GAMES_REPORT.md).
4. Antes de declarar completa una matriz por motor, conviene añadir a cada entrada un campo controlado como `engine` con valores de esta taxonomía y evidencia/revisión asociada. No se asignaron motores por intuición.
5. Se encontraron 409 registros cuyas instrucciones contienen patrones genéricos como `WASD / Flechas` o `Espacio / Enter`; deben verificarse contra las instrucciones del port individual antes de sustituirlos.

## Cobertura de metadatos y carátulas

Se añadieron `year`, `developer`, `summary` y referencias a fuentes para los siete títulos destacados en `games.json` (Minecraft, GTA: Vice City, Subway Surfers, Super Mario 64, Doom, Hollow Knight y Tekken 5). Se registró `rating` para seis: se normalizaron a escala 1–5 las puntuaciones de crítica numéricas de Wikidata (`P444`) y se promediaron cuando había varias; no son calificaciones de usuarios ni un agregado oficial uniforme. Subway Surfers no recibió rating porque no se encontró una puntuación comparable en esa fuente. Los otros 489 registros siguen pendientes de investigación y validación individual.

La comprobación actual encontró URL de imagen en los 496 registros y cero campos de imagen vacíos; por eso no se añadieron nuevas portadas. 342 registros contienen URLs `images.unsplash.com` como carátula temporal. La vista del catálogo, el carrusel de recientes y las recomendaciones omiten esas imágenes genéricas y muestran un placeholder de degradado con relación 16:9. Las URLs originales siguen pendientes de sustitución por carátulas individuales verificadas; el placeholder no se presenta como arte oficial.

## Actualización de PWA y partidas (8 nov 2026)

`sw.js` usa la caché versionada `retrocloud-v2` para la app, el manifiesto y `games.json`. El catálogo y la navegación usan red primero con respaldo en caché; recursos del mismo origen y respuestas CORS de jsDelivr/Google Fonts pueden quedar cacheados al visitarse. No se precargan páginas de terceros ni se afirma soporte offline de los 29 juegos táctiles: su código se ejecuta en dominios externos y puede estar protegido por CORS o políticas del sitio. La instalación y comportamiento offline aún requieren prueba bajo HTTP/HTTPS.

`index.html` ofrece respaldo local de archivos de partida en IndexedDB (importar/descargar `.sav`, `.srm`, `.state` o `.json`, hasta 32 MB). No está conectado al almacenamiento del juego dentro de iframes de terceros, no restaura automáticamente datos al runtime y no sincroniza entre dispositivos. No se implementó monetización real ni una cuenta VIP; esos flujos requieren infraestructura y credenciales aún ausentes.
