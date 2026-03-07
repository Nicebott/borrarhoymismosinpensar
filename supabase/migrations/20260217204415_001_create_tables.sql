/*
  # Crear Tablas Principales

  1. Nuevas Tablas
    - `profiles` - Perfiles de usuario extendiendo auth.users
      - `id` (uuid, primary key, referencia a auth.users)
      - `display_name` (text)
      - `created_at` (timestamptz)
    
    - `admins` - Roles de administrador
      - `user_id` (uuid, primary key, referencia a auth.users)
      - `added_at` (timestamptz)
      - `added_by` (uuid, referencia a auth.users)
    
    - `superadmins` - Roles de superadministrador
      - `user_id` (uuid, primary key, referencia a auth.users)
    
    - `reviews` - Reseñas de profesores
      - `id` (uuid, primary key)
      - `professor_id` (text)
      - `user_id` (uuid, referencia a auth.users)
      - `user_name` (text)
      - `rating` (integer, 0-10)
      - `clarity` (integer, 0-10)
      - `fairness` (integer, 0-10)
      - `punctuality` (integer, 0-10)
      - `would_take_again` (integer, 0-10)
      - `comment` (text)
      - `created_at` (timestamptz)
    
    - `forum_topics` - Temas del foro
      - `id` (uuid, primary key)
      - `titulo` (text)
      - `descripcion` (text)
      - `creador` (uuid, referencia a auth.users)
      - `creador_nombre` (text)
      - `mensajes_count` (integer)
      - `created_at` (timestamptz)
    
    - `forum_messages` - Mensajes del foro
      - `id` (uuid, primary key)
      - `topic_id` (uuid, referencia a forum_topics)
      - `contenido` (text)
      - `autor` (uuid, referencia a auth.users)
      - `autor_nombre` (text)
      - `created_at` (timestamptz)
    
    - `chat_messages` - Mensajes de chat en tiempo real
      - `id` (uuid, primary key)
      - `text` (text)
      - `username` (text)
      - `is_admin` (boolean)
      - `created_at` (timestamptz)
    
    - `chat_config` - Configuración del chat
      - `key` (text, primary key)
      - `value` (text)

  2. Notas Importantes
    - Todas las tablas tienen timestamps automáticos
    - Las foreign keys tienen ON DELETE CASCADE para mantener integridad referencial
    - Los reviews usan rango 0-10 para consistencia con datos originales
    - El chat_config se inicializa con contraseña por defecto 'changeme'
*/

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin roles
CREATE TABLE IF NOT EXISTS admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS superadmins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Reviews (0-10 range to match original data)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professor_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 0 AND 10),
  clarity INTEGER DEFAULT 0 CHECK (clarity BETWEEN 0 AND 10),
  fairness INTEGER DEFAULT 0 CHECK (fairness BETWEEN 0 AND 10),
  punctuality INTEGER DEFAULT 0 CHECK (punctuality BETWEEN 0 AND 10),
  would_take_again INTEGER DEFAULT 0 CHECK (would_take_again BETWEEN 0 AND 10),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forums
CREATE TABLE IF NOT EXISTS forum_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creador UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  creador_nombre TEXT NOT NULL,
  mensajes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  autor UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  autor_nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time Chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  username TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat admin password (simple config table)
CREATE TABLE IF NOT EXISTS chat_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO chat_config (key, value) VALUES ('admin_password', 'changeme')
ON CONFLICT (key) DO NOTHING;