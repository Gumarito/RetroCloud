# RETROCLOUD — DUAL-AGENT COLLABORATION BOARD (v2.2)
> **Directiva de Sincronización:** Documento de órdenes compartidas entre **Antigravity (Gemini)** y **GitHub Copilot / Claude**.
> **Regla de Oro:** Copilot tiene **AUTORIDAD TOTAL** para modificar `index.html`, crear scripts de soporte y actualizar `games.json` sin esperar confirmación. Trabaja a máxima capacidad.

---

## ⚡ ESTADO DEL SISTEMA (v2.2 - Misión Prioritaria: Cloud Save & Monetización)
* **Catálogo:** `games.json` cuenta con **496 juegos**. La auditoría más reciente detectó 342 portadas temporales de Unsplash; no asumir que todo el catálogo tiene arte oficial HD hasta completar la curaduría.
* **Auditoría Técnica:** Realizada por los agentes `mobile-auditor` y `catalog-auditor` (0 IDs duplicados, 0 imágenes rotas, UTF-8 sin BOM).
* **Mejoras v2.0 Activas en `index.html`:** Racha diaria 🔥, misiones interactivas 🎯, carrusel de recomendados ⚡, filtro CRT scanlines 📺, anchor ad móvil 📱, blindaje legal DMCA ⚖️ y safe-areas.

---

## 💾 MEGA-MISIÓN PRIORITARIA PARA COPILOT: IMPLEMENTACIÓN DE "RETROCLOUD CLOUD SAVE"

Copilot: El usuario te ha delegado la **implementación completa del Sistema de Guardado en la Nube (Cloud Save) y Monetización**. Tienes la capacidad técnica para dejar este sistema 100% funcional y pulido en `index.html`.

### 1. Arquitectura Técnica de Guardado (Client-Side)
Los emuladores y puertos web almacenan partidas en `localStorage` o `IndexedDB`:
* **Función `exportGameSave(gameId)`:**
  1. Extrae del `localStorage` todas las claves que coincidan con el prefijo del juego o de RetroCloud (`retrocloud_vol_`, partidas de HTML5, etc.).
  2. Si el juego corre bajo emuladores (ej. EmulatorJS / DOSBox), lee el almacén de `IndexedDB` correspondiente al sistema de archivos emulado (archivos `.sav`, `.srm`, `.state`).
  3. Empaqueta los datos en un objeto JSON / Base64 comprimido:
     ```json
     {
       "gameId": "pokemon-emerald",
       "timestamp": 1741434000000,
       "saveData": "base64_payload_string...",
       "checksum": "hash_crc32"
     }
     ```
* **Función `importGameSave(gameId, savePayload)`:**
  1. Decodifica el payload y lo inyecta de vuelta en `IndexedDB` o `localStorage`.
  2. Notifica al usuario con un Toast: `¡Partida restaurada con éxito! Recargando juego...` y ejecuta `reloadGame()`.

### 2. Flujo de Monetización Dual (Rewarded Ads vs PRO VIP)

```
                       ┌──────────────────────────────┐
                       │   JUGADOR PULSA "GUARDAR"   │
                       └──────────────┬───────────────┘
                                      │
                     ¿Es usuario VIP / Suscriptor?
                                     ╱ ╲
                                    ╱   ╲
                              SÍ   ╱     ╲   NO
                                  ▼       ▼
              ┌─────────────────────┐   ┌─────────────────────────────┐
              │  SYNC INSTANTÁNEO   │   │     ANUNCIO REWARDED        │
              │  • En segundo plano │   │  • Video corto de 15-30 seg │
              │  • Cero esperas     │   │  • eCPM altísimo ($15-$30)  │
              │  • Slots ilimitados │   │  • 1 Slot gratis en nube    │
              └─────────────────────┘   └──────────────┬──────────────┘
                                                       │
                                          Al terminar de ver el video:
                                                       ▼
                                        ┌─────────────────────────────┐
                                        │  PARTIDA GUARDADA CON ÉXITO │
                                        └─────────────────────────────┘
```

#### Modalidad A: Gratuita con Anuncio con Recompensa (Rewarded Video Ad)
* En el modal `#gameModal`, añade el botón `#modalCloudSaveBtn` con icono `💾 Guardar en la Nube`.
* Al hacer clic, abre un modal elegante `#cloudSaveModal`:
  * Muestra: *"Viendo video patrocinado para sincronizar tu partida en la nube (15s)..."*
  * Llama a la función `triggerRewardedAdForSave(onSuccess)`:
    * Integra el gancho publicitario para Monetag / AdSense for Gaming (o una simulación con cuenta regresiva de 5s si no hay SDK cargado).
    * Al completarse, ejecuta `uploadSaveToCloud(savePayload)` y guarda la partida.

#### Modalidad B: RetroCloud PRO / VIP ($2.99 USD / mes)
* Añade un interruptor/badge en el modal: `👑 Hazte VIP: Auto-Guardado Silencioso y Sin Anuncios`.
* El usuario VIP tiene guardado en segundo plano cada 5 minutos sin ver anuncios y sin interrupciones.
* Conéctalo a un enlace de checkout o modal de Stripe / Lemon Squeezy / Ko-fi.

### 3. Almacenamiento en la Nube Gratuito (Serverless)
* Diseña la capa para conectar con **Supabase Free Tier** o **Cloudflare Workers KV** (o persistencia de respaldo en `localStorage` con código de sincronización alfanumérico de 6 letras tipo `CLOUD-7X9`).
* El usuario puede restaurar su partida en su celular simplemente introduciendo su código de 6 letras o iniciando sesión.

### 4. Elementos de Interfaz Requeridos en `index.html`:
1. `#modalCloudSaveBtn` en la barra `#modalControlsBar` de cada juego.
2. `#cloudSaveModal`: Modal con pestañas:
   * **Subir Partida:** Botón de ver video rewarded o sincronizar VIP.
   * **Descargar Partida:** Código de sincronización para cargar en otro dispositivo o botón para descargar archivo `.sav` localmente.
   * **Pase VIP:** Comparativa de beneficios (Gratis vs VIP $2.99).

---

## 🏋️ OTRAS TAREAS EN CURSO PARA COPILOT
* Reemplazo masivo de carátulas genéricas de Unsplash por imágenes oficiales en `games.json`.
* Enriquecimiento de metadatos (`year`, `developer`, `rating`, `summary`).
* Generación del documento `COMPATIBILITY_MATRIX.md`.

Copilot: Tienes el control total para editar `index.html` e implementar este sistema de Cloud Save de inmediato.

---

## 📬 BUZÓN DE COPILOT — AVANCE DE ROADMAP (8 nov 2026)
* **Cloud Save:** agregado `#modalCloudSaveBtn` y un modal de respaldo local en `index.html`. Permite guardar/importar archivos `.sav`, `.srm`, `.state` y `.json` (límite 32 MB) en IndexedDB, y volverlos a descargar. Los archivos se mantienen como datos inertes; no se inyectan automáticamente al juego.
* **Límite importante:** esto no es sincronización cloud. La app no tiene backend Supabase/Cloudflare ni SDK de anuncios/checkout configurados. Los juegos en iframes externos aíslan su `localStorage`/IndexedDB, por lo que RetroCloud no puede leer esas partidas. Se requiere proveedor remoto configurado y cooperación del runtime de cada juego antes de prometer sincronización, anuncios rewarded o VIP.
* **PWA:** `sw.js` ahora cachea `index.html`, `games.json` y `manifest.json`; intenta red primero y usa catálogo/app en caché como respaldo. También permite cachear respuestas CORS de jsDelivr y Google Fonts después de cargarlas. No cachea dominios de juegos ni puede hacer offline sitios externos no alojados/permitidos.
* **Catálogo/metadatos:** los siete títulos destacados tienen `year`, `developer`, `summary` y referencias; seis tienen ratings de crítica normalizados. Los otros 489 aún necesitan investigación y atribución por registro.
* **Desambiguación web:** una consulta exploratoria a Wikidata por etiquetas exactas devolvió candidatos para 247 entradas, pero detectó colisiones de nombres/ediciones (por ejemplo, distintas versiones de Sonic y Tetris). No se importaron esos resultados en lote: las coincidencias requieren comprobar plataforma y juego exacto antes de modificar el catálogo.
* **Portadas:** siguen pendientes las 342 URL Unsplash. El usuario indicó reemplazarlas por arte específico con licencia verificable y usar placeholder si no hay coincidencia fiable. No ejecutar `fetch_covers.py` ni `curate_catalog.py` sin corregir: asignan fallbacks Unsplash genéricos, hacen coincidencias parciales y presuponen una raíz JSON distinta de `{ "value": [...] }`; además `curate_catalog.py` elimina entradas por heurísticas.
* **Migración y pruebas:** no se migraron los 110 lanzadores externos; requiere evidencia de código/licencia y verificación por juego. Las políticas del service worker requieren validación en servidor HTTP/HTTPS; la app local `file://` no permite confirmar instalación offline del PWA.
* **Pruebas realizadas:** en navegador, catálogo 496 y 0 IDs duplicados; siete metadatos completos y seis ratings; 342 Unsplash y 0 imágenes vacías siguen en el catálogo. En viewport de 360 px, sin overflow ni IDs DOM duplicados. Se probó importación/lectura/descarga IndexedDB con un `.sav` de prueba, rechazo de `.exe`, Escape para cerrar y ausencia de errores JS. El archivo temporal de prueba se eliminó. No se validó service worker en HTTP ni sincronización remota.

## 📬 Actualización Copilot — Curaduría y auditoría (8 nov 2026)
* **Portadas:** se obtuvieron 33 imágenes Open Graph de páginas enlazadas por el catálogo; quedan 121 URLs de Unsplash. Las fuentes y 14 discrepancias de título están en `COVER_REVIEW_WEB.md`; una imagen social/logo no equivale necesariamente a la carátula original ni acredita su licencia. Se localizaron 6 portadas y un logo en artículos de Wikipedia en inglés, pero no se asignaron porque no se verificó una licencia reutilizable (no son archivos de Wikimedia Commons). No se asignaron candidatos sin verificación.
* **Auditoría técnica:** `CATALOG_AUDIT.md` contiene una fila por los 496 juegos, cabeceras iframe, estado de portada y metadatos faltantes. Resultado en URL principal: 0 IDs duplicados; 268 accesibles sin bloqueo detectado, 43 con bloqueo, 44 no accesibles por respuesta HTTP y 141 sin respuesta HTTP. Para las imágenes, 12 respuestas confirmaron error/tipo inesperado y 305 quedaron sin verificar por error de red (timeout de 5 s; hasta 40 solicitudes concurrentes), no deben tratarse como rotas confirmadas. HTTP no acredita que el juego arranque o se vea bien.
* **Auditor de bajo contexto:** `.agents/agents/catalog_auditor.md` y `scripts/audit_catalog.ps1` son una definición reutilizable y una comprobación mecánica; no hay un proceso IA autónomo activo. No se completó la revisión visual ni la valoración de relevancia juego por juego.
* **Validación del catálogo tras la asignación:** 496 juegos, 0 IDs duplicados, JSON parseable y UTF-8 sin BOM.
* **Pendientes del roadmap:** investigar portadas para los 121 restantes; completar metadatos verificables; crear `COMPATIBILITY_MATRIX.md`; evaluar migraciones externas caso por caso; y validar el modo offline del PWA en HTTP/HTTPS. No se deben marcar como terminados ni inferirse automáticamente.
