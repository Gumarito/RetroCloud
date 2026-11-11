# AGENTS.md — Constitución Multi-Agente de RetroCloud

> **Proyecto:** RetroCloud (Portal de Streaming de Juegos Retro WebAssembly / HTML5 / Tailwind CSS / Vanilla JS / Supabase)
> **Coordinación Central:** Orquestación Hub-and-Spoke dirigida por **Antigravity (Tech Lead)** mediante `AGENT_SYNC.md`.

---

## 1. Jerarquía Oficial y Roles

| Rol | Agente / Modelo | Responsabilidad |
| :--- | :--- | :--- |
| **Tech Lead & Orquestador** | **Antigravity** (`Gemini 3.8 Flash` diario / `Gemini 4 Argon` bajo demanda) | Define la arquitectura, prioriza el roadmap en `AGENT_SYNC.md`, crea checkpoints Git (`agent/<agente>/<tarea>`), despacha agentes previa autorización del usuario y revisa diffs. |
| **Ingeniero de Backend, Scripts y Auditoría** | **Claude Code CLI** (`--model sonnet` por defecto) | Ejecuta tareas de arquitectura en `index.html`, `sw.js`, integración con Supabase Cloud Save, scripts de verificación y auditorías de catálogo. |
| **Arma Especialista (Complejidad Extrema)** | **Claude Fable 5.2** (`--model fable`) | Reservado **exclusivamente** para tareas marcadas con `Modelo recomendado: Fable` y con autorización explícita del usuario (ej. sincronización compleja IndexedDB/EmulatorJS o desambiguación algorítmica). |
| **Asistente Rápido y Curador** | **Copilot Fusion CLI** (`copilot -p`) | Ajustes rápidos de UI/CSS en `index.html`, internacionalización i18n, actualización verificada de metadatos en `games.json` y documentación (`COMPATIBILITY_MATRIX.md`). |

---

## 2. Reglas de Seguridad, Despacho y Control de Versiones (Obligatorias)

1. **Despacho Exclusivo (Hub-and-Spoke):**
   - **Solo Antigravity (Tech Lead) o el usuario despachan tareas.**
   - **Prohibido el encadenamiento entre agentes:** Claude nunca invoca a `copilot` ni a `gemini`; Copilot nunca invoca a `claude` ni a `gemini`.
   - **Máximo 2 rondas por tarea:** Si tras 2 rondas una tarea no queda resuelta, el agente documenta el estado en `AGENT_SYNC.md` y devuelve el control al Tech Lead.
2. **Permiso Explícito del Usuario (Protección de Cuota):**
   - Antigravity solicita confirmación al usuario antes de ejecutar cualquier comando `claude -p` o `copilot -p`.
   - El modelo `Fable` (`--model fable`) solo se utiliza si la tarea tiene `Modelo recomendado: Fable` en `AGENT_SYNC.md` y el usuario lo autoriza expresamente.
3. **Checkpoint Git Previo a Delegación:**
   - Antes de cada tarea delegada, hacer un commit o crear una rama `agent/<agente>/<id-tarea>` (ej. `agent/claude/RC-001`) para poder revertir con seguridad.
4. **Blindaje de Secretos y Comandos (`.claude/settings.json`):**
   - **Prohibición absoluta sobre `.env*`:** Ningún agente puede leer, imprimir ni modificar archivos `.env` o `.env.*`.
   - **Scripts legacy bloqueados:** No ejecutar `fetch_covers.py` ni `curate_catalog.py` sin haberlos corregido previamente (presuponen una raíz distinta de `{ "value": [...] }` e inyectan fallbacks genéricos de Unsplash).
   - **Comandos acotados:** En Claude solo se habilitan comandos seguros de verificación (`git status`, `git diff`, scripts de auditoría). En Copilot nunca se usa `--allow-all-tools` ni `--yolo`; se usan `--allow-tool` específicos y `--deny-tool` para bloquear `rm`, `Remove-Item`, `git push`, `git reset`, `.env*` y llamadas a otros CLIs.

---

## 3. Comandos Oficiales de Despacho No Interactivo

### Para Claude Code (`normal` = Sonnet / `Fable` = Fable 5.2)
```powershell
# Modo Normal (Sonnet)
$null | claude -p "Ejecuta la tarea RC-XXX de AGENT_SYNC.md y actualiza su estado" --model sonnet --permission-mode acceptEdits --allowedTools "Read" "Edit" "Write" "Glob" "Grep" "Bash(git status*)" "Bash(git diff*)"

# Modo Fable 5.2 (SOLO con tarea marcada Fable + autorización explícita del usuario)
$null | claude -p "Ejecuta la tarea crítica RC-XXX de AGENT_SYNC.md" --model fable --permission-mode acceptEdits --allowedTools "Read" "Edit" "Write" "Glob" "Grep" "Bash(git status*)" "Bash(git diff*)"
```

### Para Copilot Fusion CLI
```powershell
copilot -p "Ejecuta la tarea RC-XXX de AGENT_SYNC.md" -s --trust-folder --allow-tool="write" --allow-tool="shell(git status)" --allow-tool="shell(git diff)" --deny-tool="shell(rm:*)" --deny-tool="shell(Remove-Item:*)" --deny-tool="shell(git push:*)" --deny-tool="shell(git reset:*)" --deny-tool="shell(claude:*)" --deny-tool="shell(copilot:*)" --deny-tool="shell(*.env*)"
```

---

## 4. Invariantes Técnicos y Legales de RetroCloud

1. **Stack y Estructura de Catálogo (`games.json`):**
   - Stack: HTML5, Tailwind CSS (vía CDN) y JavaScript puro (`index.html`, `admin.html`, `sw.js`).
   - `games.json` mantiene la estructura raíz `{ "value": [ ... ], "Count": 496 }`, codificación **UTF-8 sin BOM**, **0 IDs duplicados** y JSON 100% válido.
2. **Diseño e Internacionalización (`.clinerules`):**
   - Modo oscuro obligatorio (Dark Mode), estética de plataforma de streaming rápida y minimalista, sin overflow en viewports móviles de `360px` y sin IDs DOM duplicados.
   - **Prohibido codificar texto duro en el HTML:** Todo texto visible debe pasar por el diccionario JSON interno de internacionalización (`es`, `en`, `ja`, `fr`, `zh`, `hi`).
3. **Cumplimiento Legal DMCA y Seguridad:**
   - **Nunca alojar archivos `.exe`, `.iso` o ROMs con copyright.** Todo se ejecuta vía `<iframe>` conectando a repositorios WebAssembly públicos o lanzadores autorizados.
   - En el sistema de respaldo de partidas (`IndexedDB` / Cloud Save), rechazar extensiones ejecutables (`.exe`, `.bat`, `.sh`, `.js`) y permitir únicamente formatos de partida (`.sav`, `.srm`, `.state`, `.json` hasta 32 MB).
4. **Curaduría Basada en Evidencia:**
   - No inventar metadatos (`year`, `developer`, `rating`, `summary`) ni asignar portadas sin verificar que corresponden a la edición/plataforma exacta y cuentan con licencia reutilizable (Wikimedia Commons / Open Graph oficial verificado).
