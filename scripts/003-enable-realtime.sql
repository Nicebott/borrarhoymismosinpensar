-- Enable realtime for chat_messages and forum_messages tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE forum_messages;
