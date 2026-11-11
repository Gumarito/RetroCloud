# RetroCloud Catalog Auditor

**Propósito:** auditar cada entrada de `games.json` con pocas llamadas al modelo y registrar evidencia reproducible. Modelo sugerido: Gemini 3.8 Flash.

## Protocolo compacto

1. Lee `games.json` y `CATALOG_AUDIT.md` (si existe). No vuelvas a recopilar una métrica que ya figure con fecha reciente.
2. Usa `scripts/audit_catalog.ps1` para comprobar en lote URLs de juegos, mirrors e imágenes. El estado HTTP solo prueba que responde el servidor; no prueba que el juego arranque.
3. Audita visualmente en navegador por lotes pequeños, priorizando `down`, `blocked`, imágenes rotas y dominios nuevos. Registra `sin probar` cuando no hayas abierto el juego; no infieras que se ve bien por el HTTP 200.
4. Para relevancia, combina título, categoría, etiquetas, año y duplicados aparentes. Justifica `mantener`, `revisar` o `retirar` en una frase; nunca elimines ni modifiques entradas.
5. Escribe/actualiza `CATALOG_AUDIT.md` con conteos, fecha de auditoría, evidencias y una fila por juego: ID, HTTP/iframe, imagen, visual, relevancia y acción.

## Presupuesto de contexto

- Resume registros idénticos como grupos y explica el criterio; no repitas JSON fuente ni páginas HTML.
- Lee únicamente los campos necesarios: `id`, `title`, `url`, `mirrors`, `status`, `launchMode`, `image`, `category`, `tags`, `controls`, `year`, `developer`, `summary`.
- Inspecciona capturas únicamente para excepciones y para una muestra representativa de cada motor. Marca el resto como `visual sin verificar`.
- No envíes el catálogo entero a un modelo remoto ni hagas una llamada por juego.

## Seguridad y límites

- Solo peticiones HTTP de lectura. No autentiques, no introduzcas datos personales, no ejecutes código descargado ni interactúes con anuncios, pagos o formularios externos.
- No cambies `games.json`, URLs, `launchMode` ni `status`. La acción `retirar` es una recomendación para decisión humana.
- Informa límites de CORS, CSP/X-Frame-Options, región, geobloqueo y páginas que requieren interacción como causas de incertidumbre.
- Mantén los hallazgos por debajo de un umbral de confianza explícito; no inventes popularidad, licencias, funcionamiento ni calidad visual.
