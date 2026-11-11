# AGENT_SYNC.md — Tablero de Sincronización Multi-Agente (RetroCloud)

> **Protocolo de Uso:**
> 1. **Tech Lead (Antigravity / Gemini)** redacta las tareas en `## 1. Pendiente`, asigna el agente (`Claude` o `Copilot`) y define `Modelo recomendado: normal` o `Modelo recomendado: Fable`.
> 2. **Antes de delegar:** Crear commit o rama `agent/<agente>/<id-tarea>` y solicitar permiso explícito al usuario.
> 3. **Límite de iteración:** Máximo **2 rondas** por tarea. Claude y Copilot no se invocan entre sí.
> 4. Al terminar, el agente ejecutor mueve la tarea a `## 3. Hecho` documentando los cambios y validaciones realizadas.

---

## 1. Pendiente

### [RC-001] Generación de `COMPATIBILITY_MATRIX.md` a partir de `CATALOG_AUDIT.md`
- **Agente asignado:** Copilot
- **Modelo recomendado:** normal
- **Rama sugerida:** `agent/copilot/RC-001`
- **Archivos objetivo:** `COMPATIBILITY_MATRIX.md`
- **Descripción:** Consolidar los resultados verificados en `CATALOG_AUDIT.md` (496 juegos: 268 accesibles sin bloqueo, 43 con bloqueo de cabeceras iframe, 44 con error HTTP y 141 sin respuesta HTTP) en una matriz clara por plataforma/emulador, indicando soporte móvil, estado de controles táctiles y requisitos de iframe.
- **Criterio de aceptación:** Tabla markdown estructurada sin inferir datos no verificados, manteniendo intacto `games.json`.

### [RC-002] Validación HTTP/HTTPS del Service Worker (`sw.js`) y Modo Offline PWA
- **Agente asignado:** Claude
- **Modelo recomendado:** normal
- **Rama sugerida:** `agent/claude/RC-002`
- **Archivos objetivo:** `sw.js`, `index.html`, `manifest.json`
- **Descripción:** Verificar bajo servidor local HTTP que `sw.js` registre sin errores, cachee `index.html`, `games.json` y `manifest.json` con estrategia network-first y fallback a caché, y que no intente cachear iframes de dominios externos no permitidos.
- **Criterio de aceptación:** Registro limpio de Service Worker, 0 errores en consola y validación de carga de catálogo en desconexión simulada.

### [RC-003] Curaduría verificada de portadas pendientes (121 URLs de Unsplash restantes)
- **Agente asignado:** Claude
- **Modelo recomendado:** normal
- **Rama sugerida:** `agent/claude/RC-003`
- **Archivos objetivo:** `games.json`, `COVER_REVIEW_WEB.md`
- **Descripción:** Reemplazar por lotes las 121 URLs genéricas de Unsplash restantes en `games.json` únicamente cuando exista imagen oficial Open Graph de la URL enlazada o archivo con licencia libre verificada en Wikimedia Commons; usar placeholder limpio cuando no exista coincidencia fiable. Prohibido ejecutar `fetch_covers.py` o `curate_catalog.py` sin corregirlos antes.
- **Criterio de aceptación:** `games.json` válido (UTF-8 sin BOM, 496 entradas, 0 IDs duplicados) y registro de fuentes en `COVER_REVIEW_WEB.md`.

### [RC-004] Sincronización Cloud Save Remota con Supabase (`supabase_retrocloud_schema.sql`)
- **Agente asignado:** Claude
- **Modelo recomendado:** Fable
- **Rama sugerida:** `agent/claude/RC-004`
- **Archivos objetivo:** `index.html`, `supabase_retrocloud_schema.sql`
- **Descripción:** Conectar el respaldo local actual de `IndexedDB` (`#cloudSaveModal`) con almacenamiento remoto en Supabase mediante códigos de sincronización de 6 caracteres (`CLOUD-XXX`), políticas RLS seguras por checksum/tamaño y separación clara entre juegos propios/mismo origen y juegos aislados en iframes externos.
- **Criterio de aceptación:** Subida y restauración funcional con código de 6 caracteres, validación de políticas RLS y textos integrados en el diccionario i18n (`es`, `en`, `ja`, `fr`, `zh`, `hi`). *(Requiere autorización explícita del usuario para usar `--model fable`)*.

---

## 2. En curso

*(Ninguna tarea en curso actualmente)*

---

## 3. Hecho

### [RC-000] Infraestructura y Jerarquía Multi-Agente v1.0
- **Agente asignado:** Antigravity (Tech Lead)
- **Modelo recomendado:** normal
- **Resultado:** Creados `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json` y `AGENT_SYNC.md` adaptados a las reglas de RetroCloud (`.clinerules` y `PROJECT_CONTEXT.md`).

---

## 4. Registro de Herramientas Instaladas (Nivel Proyecto)

| Proyecto | Elemento | Tipo | Ubicación | Para qué sirve |
| :--- | :--- | :--- | :--- | :--- |
| **RetroCloud** | `headroom-context-optimizer` | Skill | `.claude/skills/headroom-context-optimizer/SKILL.md` | Lectura quirúrgica por rangos; evita volcar `index.html` o `games.json` al contexto. |
| **RetroCloud** | `ponytail` | Skill | `.claude/skills/ponytail/SKILL.md` | Cambios limpios y mínimos en vanilla JS/HTML sin dependencias innecesarias. |
| **RetroCloud** | `catalog_auditor` | Agente | `.claude/agents/catalog_auditor.md` | Subagente invocable (`--agent catalog_auditor`) para validar integridad de `games.json`. |
| **RetroCloud** | `mobile_auditor` | Agente | `.claude/agents/mobile_auditor.md` | Subagente invocable (`--agent mobile_auditor`) para verificar responsive a 360px. |
| **RetroCloud** | `copilot-instructions` | Config | `.github/copilot-instructions.md` | Reglas oficiales para Copilot: i18n JSON obligatorio, DMCA, 496 juegos sin BOM y no `.env*`. |
| **RetroCloud** | `settings.json` | Config | `.claude/settings.json` | Candados de permisos deny sobre `.env*`, borrados y scripts rotos (`fetch_covers.py`). |

