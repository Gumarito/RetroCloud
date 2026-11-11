# RETROCLOUD — Plan de Negocio, Monetización y Estrategia de Crecimiento (2026)

## 1. Tesis de Producto y Modelo de Audiencia
**RetroCloud** es un portal web de streaming de videojuegos clásicos y puertos WebAssembly ligeros, optimizado para móvil y escritorio como PWA instantánea (cero descargas, cero fricción).

- **Público Objetivo:** Jugadores nostálgicos (20-45 años), estudiantes y trabajadores que buscan partidas casuales rápidas durante descansos (sesiones de 5 a 20 minutos).
- **Ventaja Competitiva:** Catálogo curado de 496 juegos sin barreras de instalación, sin emuladores pesados y con guardado local persistente (`IndexedDB`) compatible con pantallas táctiles.

---

## 2. Estrategia de Monetización Dual (Finanzas)

```
                              ┌─────────────────────────────────┐
                              │     USUARIO JUEGA EN RETROCLOUD │
                              └────────────────┬────────────────┘
                                               │
                                 Al usar Cloud Save / Continuar
                                              ╱ ╲
                                             ╱   ╲
                                  GRATIS   ╱     ╲   VIP ($2.99 USD/mes)
                                          ▼       ▼
                      ┌──────────────────────┐   ┌──────────────────────────────┐
                      │ REWARDED VIDEO ADS   │   │ SUSCRIPCIÓN PRO              │
                      │ • Monetag / AdSense  │   │ • Guardado automático nube   │
                      │ • eCPM: $15 - $30 USD│   │ • Cero anuncios en la web    │
                      │ • 1 video para sync  │   │ • Slots de guardado ilimitado│
                      └──────────────────────┘   └──────────────────────────────┘
```

### Canales de Ingreso:
1. **Rewarded Ads (Videos con recompensa al guardar):**
   - eCPM estimado en LATAM y US: **$15.00 a $30.00 USD por cada mil impresiones completas**.
   - Con 10,000 usuarios activos diarios (DAU) guardando 1 vez al día: **~$150 a $300 USD diarios**.
2. **Suscripción RetroCloud VIP ($2.99 USD / mes):**
   - Conversión estimada: 1.5% - 2.5% de usuarios recurrentes.
   - 500 suscriptores activos = **$1,495 USD mensuales en MRR (Ingreso Recurrente Mensual)**.
3. **Display Ads & Anchor Ads móviles no invasivos:**
   - Banners fijos inferiores fuera de la zona de juego para monetizar visitas pasivas sin arruinar la jugabilidad.

---

## 3. Costos Operativos y Márgenes
- **Alojamiento y CDN:** Prácticamente **$0 USD** gracias a GitHub Pages + jsDelivr / Cloudflare para distribución estática.
- **Base de Datos / Cloud Save:** Nivel gratuito de Supabase (hasta 50,000 usuarios activos mensuales).
- **Margen Bruto Estimado:** **> 92%** de rentabilidad neta antes de pasarelas de pago.

---

## 4. Estrategia de Adquisición y Marketing Orgánico (Cero Gasto en Pauta)
1. **SEO de Nicho y Búsqueda Orgánica:**
   - Posicionamiento de títulos específicos con intención de juego instantáneo (`"Jugar Celeste en navegador"`, `"Cookie Clicker sin bloqueos escolares"`).
2. **TikTok / Instagram Reels / YouTube Shorts:**
   - Videos cortos tipo: *"Páginas secretas para jugar tus clásicos favoritos desde el celular en el trabajo/escuela sin instalar nada"*.
   - Este formato tiene alto potencial de viralidad orgánica en comunidades de gaming retro.
3. **Comunidades de Reddit y Discord:**
   - Participación en subreddits (`r/webgames`, `r/retrogaming`) compartiendo la tecnología de emulación en navegador y las mejoras de PWA offline.
