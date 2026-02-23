/*
  # Agregar estado de admin al foro

  1. Cambios
    - Agregar columna `is_admin` a la tabla `forum_messages` para identificar mensajes de administradores
    - Agregar columna `is_admin` a la tabla `forum_topics` para identificar temas creados por administradores
  
  2. Notas
    - Las columnas son opcionales para mantener compatibilidad con datos existentes
    - Por defecto será false
*/

-- Agregar columna is_admin a forum_messages si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_messages' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE forum_messages ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;

-- Agregar columna is_admin a forum_topics si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_topics' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE forum_topics ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_forum_messages_is_admin ON forum_messages(is_admin);
CREATE INDEX IF NOT EXISTS idx_forum_topics_is_admin ON forum_topics(is_admin);
