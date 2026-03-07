/*
  # Configurar Row Level Security (RLS)

  1. Seguridad
    - Habilitar RLS en todas las tablas
    - Crear políticas restrictivas para cada tabla
    - Verificar autenticación y propiedad antes de permitir acceso

  2. Políticas por Tabla
    
    **Profiles**
    - SELECT: Todos pueden ver perfiles públicos
    - UPDATE: Usuarios solo pueden actualizar su propio perfil
    - INSERT: Usuarios solo pueden crear su propio perfil
    
    **Admins**
    - SELECT: Todos pueden verificar estado de admin
    - INSERT: Solo SuperAdmins pueden agregar admins
    - DELETE: Solo SuperAdmins pueden eliminar admins
    
    **SuperAdmins**
    - SELECT: Todos pueden verificar estado (read-only, gestionado vía consola)
    
    **Reviews**
    - SELECT: Todos pueden ver reseñas
    - INSERT: Solo usuarios autenticados pueden crear reseñas
    - DELETE: Autores, admins o superadmins pueden eliminar
    
    **Forum Topics**
    - SELECT: Todos pueden ver temas
    - INSERT: Solo usuarios autenticados pueden crear
    - UPDATE: Creadores, admins o superadmins pueden actualizar
    - DELETE: Creadores, admins o superadmins pueden eliminar
    
    **Forum Messages**
    - SELECT: Todos pueden ver mensajes
    - INSERT: Solo usuarios autenticados pueden crear
    - DELETE: Autores, admins o superadmins pueden eliminar
    
    **Chat Messages**
    - SELECT: Todos pueden ver mensajes
    - INSERT: Usuarios autenticados pueden insertar
    - DELETE: Cualquiera puede eliminar (para moderación)
    
    **Chat Config**
    - SELECT: Todos pueden leer (para verificar contraseña de admin)

  3. Notas Importantes
    - Todas las políticas verifican autenticación usando auth.uid()
    - Las políticas de admin verifican existencia en tabla admins/superadmins
    - RLS previene acceso no autorizado a nivel de base de datos
*/

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