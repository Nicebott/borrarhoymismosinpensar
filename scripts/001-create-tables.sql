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

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professor_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  clarity INTEGER DEFAULT 0 CHECK (clarity BETWEEN 0 AND 5),
  fairness INTEGER DEFAULT 0 CHECK (fairness BETWEEN 0 AND 5),
  punctuality INTEGER DEFAULT 0 CHECK (punctuality BETWEEN 0 AND 5),
  would_take_again INTEGER DEFAULT 0 CHECK (would_take_again BETWEEN 0 AND 1),
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
