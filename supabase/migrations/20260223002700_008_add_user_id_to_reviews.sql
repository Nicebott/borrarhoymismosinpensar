/*
  # Agregar user_id a reviews

  1. Cambios
    - Agregar columna `user_id` a la tabla `reviews` para poder verificar si el usuario es admin
    - Esta columna permitirá mostrar el badge de admin en las reseñas
  
  2. Notas
    - La columna es opcional para mantener compatibilidad con reseñas existentes
*/

-- Agregar columna user_id a reviews si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE reviews ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Crear índice para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
