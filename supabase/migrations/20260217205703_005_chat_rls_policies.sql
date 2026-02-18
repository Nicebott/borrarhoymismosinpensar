/*
  # Políticas RLS para Chat

  1. Nuevas Políticas
    - `chat_messages`: Usuarios autenticados pueden ver todos los mensajes
    - `chat_messages`: Solo administradores pueden eliminar mensajes
    - `chat_config`: Solo administradores pueden leer contraseña

  2. Seguridad
    - El chat requiere autenticación
    - Solo superadmins y admins pueden eliminar mensajes
    - Configuración protegida de acceso público
*/

CREATE POLICY "Authenticated users can view all messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can delete messages"
  ON chat_messages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM superadmins WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only backend can read chat config"
  ON chat_config FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Backend service role can read chat config"
  ON chat_config FOR SELECT
  TO service_role
  USING (true);