-- ========================================================================
-- RETROCLOUD: MASTER PRODUCTION DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- Versión: 2.0 (Analítica, Métricas de Tiempo, Votos y Cloud Save Pro)
-- ========================================================================

-- 1. EXTENSIONES REQUERIDAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================================
-- 2. TABLA DE EVENTOS DE JUEGO (TELEMETRÍA, SESIONES Y VOTOS EN EL TIEMPO)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.game_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL CHECK (event_type IN ('game_start', 'game_session', 'vote', 'cloud_save')),
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    user_fingerprint TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para consultas ultra-rápidas en el Dashboard de Analítica
CREATE INDEX IF NOT EXISTS idx_game_events_type ON public.game_events(event_type);
CREATE INDEX IF NOT EXISTS idx_game_events_created_at ON public.game_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_events_game_id ON public.game_events((payload->>'gameId'));

-- ========================================================================
-- 3. TABLA DE GUARDADOS EN LA NUBE (RETROCLOUD CLOUD SAVE PRO)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.user_cloud_saves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id TEXT NOT NULL,
    game_title TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    save_data TEXT NOT NULL, -- Datos de partida codificados en Base64 / JSON
    is_pro_member BOOLEAN DEFAULT true,
    slot_number INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_user_game_slot UNIQUE(user_id, game_id, slot_number)
);

CREATE INDEX IF NOT EXISTS idx_cloud_saves_user ON public.user_cloud_saves(user_id);
CREATE INDEX IF NOT EXISTS idx_cloud_saves_game ON public.user_cloud_saves(game_id);

-- ========================================================================
-- 4. TABLA DE AGREGADOS DE JUEGOS (TOTALES DE VOTOS Y PARTIDAS EN VIVO)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.game_stats (
    game_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    total_plays BIGINT DEFAULT 0,
    total_playtime_seconds BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    dislikes BIGINT DEFAULT 0,
    last_played_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- ========================================================================
-- 5. VISTAS SQL PARA EL PANEL DE MÉTRICAS (/admin)
-- ========================================================================

-- Vista A: Resumen de Juegos (Más jugados, Duración media, Ratio de Aprobación)
CREATE OR REPLACE VIEW public.v_game_performance AS
SELECT 
    payload->>'gameId' AS game_id,
    COUNT(*) FILTER (WHERE event_type = 'game_start') AS total_starts,
    COUNT(*) FILTER (WHERE event_type = 'game_session') AS total_sessions,
    COALESCE(SUM((payload->>'durationSeconds')::numeric) FILTER (WHERE event_type = 'game_session'), 0) AS total_seconds_played,
    COALESCE(AVG((payload->>'durationSeconds')::numeric) FILTER (WHERE event_type = 'game_session'), 0) AS avg_session_seconds,
    COUNT(*) FILTER (WHERE event_type = 'vote' AND payload->>'type' = 'like' AND payload->>'action' = 'voted') AS likes_count,
    COUNT(*) FILTER (WHERE event_type = 'vote' AND payload->>'type' = 'dislike' AND payload->>'action' = 'voted') AS dislikes_count,
    MAX(created_at) AS last_activity_at
FROM public.game_events
GROUP BY payload->>'gameId';

-- Vista B: Evolución Cronológica de Likes y Dislikes en el Tiempo (Agrupados por Día)
CREATE OR REPLACE VIEW public.v_votes_timeline AS
SELECT 
    DATE_TRUNC('day', created_at) AS vote_date,
    payload->>'gameId' AS game_id,
    COUNT(*) FILTER (WHERE payload->>'type' = 'like' AND payload->>'action' = 'voted') AS daily_likes,
    COUNT(*) FILTER (WHERE payload->>'type' = 'dislike' AND payload->>'action' = 'voted') AS daily_dislikes
FROM public.game_events
WHERE event_type = 'vote'
GROUP BY DATE_TRUNC('day', created_at), payload->>'gameId'
ORDER BY vote_date DESC;

-- ========================================================================
-- 6. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ========================================================================
ALTER TABLE public.game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cloud_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_stats ENABLE ROW LEVEL SECURITY;

-- Telemetría: Los usuarios anónimos pueden registrar eventos (insert-only)
CREATE POLICY "Anon insert events" ON public.game_events
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Solo el administrador o consultas autenticadas pueden leer telemetría completa
CREATE POLICY "Admin read events" ON public.game_events
    FOR SELECT TO authenticated
    USING (auth.jwt()->>'role' = 'service_role' OR auth.jwt()->>'email' IS NOT NULL);

-- Cloud Saves: Cada usuario solo accede y modifica sus propias partidas
CREATE POLICY "Users manage own cloud saves" ON public.user_cloud_saves
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Game Stats: Lectura pública para mostrar contadores en la web
CREATE POLICY "Public read stats" ON public.game_stats
    FOR SELECT TO anon, authenticated
    USING (true);
