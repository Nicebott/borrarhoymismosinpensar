/*
  # Agregar campo is_admin a reviews

  1. Cambios
    - Agregar columna `is_admin` a la tabla `reviews`
    - Establecer valores por defecto basados en la tabla de admins
    - Crear índice para mejorar el rendimiento de las consultas

  2. Notas
    - Este campo se actualizará automáticamente en las nuevas reseñas
    - Las reseñas existentes se actualizarán basándose en el estado actual de admin
*/

-- Agregar la columna is_admin con valor por defecto false
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Actualizar las reseñas existentes basadas en las tablas admins y superadmins
UPDATE reviews
SET is_admin = true
WHERE user_id IN (
  SELECT user_id FROM admins
  UNION
  SELECT user_id FROM superadmins
);

-- Crear índice para mejorar las consultas
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_admin ON reviews(is_admin);
