/*
  # Habilitar Realtime

  1. Configuración
    - Habilitar realtime para chat_messages
    - Habilitar realtime para forum_messages

  2. Notas
    - Esto permite que los mensajes del chat se actualicen en tiempo real
    - Los mensajes del foro también se actualizarán automáticamente
*/

-- Enable realtime for chat_messages and forum_messages tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE forum_messages;