-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE superadmins ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_config ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins
CREATE POLICY "Anyone can check admin status" ON admins FOR SELECT USING (true);
CREATE POLICY "Superadmins can manage admins" ON admins FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);
CREATE POLICY "Superadmins can delete admins" ON admins FOR DELETE USING (
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);

-- Superadmins (read-only, managed via console)
CREATE POLICY "Anyone can check superadmin status" ON superadmins FOR SELECT USING (true);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authors or admins can delete reviews" ON reviews FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);

-- Forum Topics
CREATE POLICY "Topics are viewable by everyone" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = creador);
CREATE POLICY "Owners or admins can update topics" ON forum_topics FOR UPDATE USING (
  auth.uid() = creador OR
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);
CREATE POLICY "Owners or admins can delete topics" ON forum_topics FOR DELETE USING (
  auth.uid() = creador OR
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);

-- Forum Messages
CREATE POLICY "Messages are viewable by everyone" ON forum_messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create messages" ON forum_messages FOR INSERT WITH CHECK (auth.uid() = autor);
CREATE POLICY "Owners or admins can delete messages" ON forum_messages FOR DELETE USING (
  auth.uid() = autor OR
  EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM superadmins WHERE user_id = auth.uid())
);

-- Chat Messages
CREATE POLICY "Chat messages viewable by everyone" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Anyone authenticated can insert chat messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete chat messages" ON chat_messages FOR DELETE USING (true);

-- Chat Config (read-only for checking admin password)
CREATE POLICY "Chat config readable by everyone" ON chat_config FOR SELECT USING (true);
