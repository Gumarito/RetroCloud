# Copilot Custom Instructions for RetroCloud

You are an expert web engineer pairing on **RetroCloud** (WebAssembly / HTML5 / Tailwind CSS / Vanilla JS / Supabase).

## Core Directives & Safety
1. **Multi-Agent Hierarchy & Safety (`AGENTS.md` & `AGENT_SYNC.md`):**
   - **Antigravity (Gemini)** is the **Tech Lead**. Read `AGENTS.md` and `AGENT_SYNC.md` for task context.
   - **Strict Isolation:** Never read, print, modify, or touch `.env` or `.env.*` files. Never invoke `claude` or `gemini` CLIs, and stop after at most 2 rounds per task.
2. **Catalog Integrity (`games.json`):**
   - Root structure must always remain `{ "value": [ ... ], "Count": 496 }`.
   - File must be encoded in **UTF-8 without BOM** with **0 duplicate IDs**.
   - Do not run `fetch_covers.py` or `curate_catalog.py` directly.
3. **Strict Internationalization (i18n):**
   - Never hardcode visible text into `index.html`. All UI strings must use the internal i18n JSON dictionary (`es`, `en`, `ja`, `fr`, `zh`, `hi`).
4. **Legal DMCA Compliance:**
   - Never host or link `.exe`, `.iso` or copyrighted ROMs. All games run via public WebAssembly `<iframe>` embeds or authorized web ports.
5. **UI & Responsive Bar:**
   - Dark mode only. Clean streaming platform aesthetics. Ensure zero horizontal scroll and zero DOM ID collisions on `360px` mobile viewports.
