# Configuracion de Supabase

Tu aplicacion esta completamente conectada a Supabase y lista para usar. Todas las funcionalidades de base de datos estan operativas.

## Estado de la Configuracion

### Base de Datos
- **Estado**: Conectada exitosamente
- **URL**: https://osxvwmmxgktpthiuumka.supabase.co
- **Todas las tablas creadas**: Si
- **RLS habilitado**: Si en todas las tablas
- **Realtime habilitado**: Si para chat y foros

### Tablas Creadas

1. **profiles** - Perfiles de usuario
2. **admins** - Roles de administrador
3. **superadmins** - Roles de super administrador
4. **reviews** - Resenas de profesores (rango 0-10)
5. **forum_topics** - Temas del foro
6. **forum_messages** - Mensajes del foro
7. **chat_messages** - Chat en tiempo real
8. **chat_config** - Configuracion del chat

### Funcionalidades Activas

#### Autenticacion
- Registro de usuarios
- Inicio de sesion
- Cierre de sesion
- Gestion de sesiones
- Auto-creacion de perfiles

#### Resenas de Profesores
- Ver todas las resenas
- Crear nuevas resenas (usuarios autenticados)
- Eliminar resenas (autores, admins o superadmins)
- Calcular estadisticas de profesores

#### Foro
- Ver todos los temas
- Crear nuevos temas (usuarios autenticados)
- Responder en temas
- Eliminar temas/mensajes (autores, admins o superadmins)
- Actualizaciones en tiempo real

#### Chat
- Mensajes en tiempo real
- Modo administrador (password: "changeme")
- Eliminar mensajes
- Ver historial

#### Panel de Admin
- Ver lista de administradores
- Agregar administradores (solo SuperAdmins)
- Eliminar administradores (solo SuperAdmins)
- Moderar contenido

## Seguridad (RLS)

Todas las tablas tienen Row Level Security habilitado con politicas restrictivas:

- Los usuarios solo pueden ver y modificar su propio contenido
- Los administradores tienen permisos especiales de moderacion
- Los SuperAdmins tienen control total
- Todas las operaciones verifican autenticacion

## Proximos Pasos

### Para usar como SuperAdmin:

1. Crea una cuenta en la aplicacion
2. Ve a Supabase Dashboard
3. Abre SQL Editor
4. Ejecuta:
```sql
INSERT INTO superadmins (user_id) VALUES ('TU_USER_ID');
```

### Para cambiar la contrasena del chat admin:

```sql
UPDATE chat_config SET value = 'nueva_contrasena' WHERE key = 'admin_password';
```

## Migraciones Aplicadas

1. `001_create_tables` - Creacion de todas las tablas
2. `002_rls_policies` - Configuracion de seguridad RLS
3. `003_enable_realtime` - Habilitacion de actualizaciones en tiempo real
4. `004_trigger_profile` - Auto-creacion de perfiles al registrarse

## Variables de Entorno

Las credenciales estan configuradas en `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Comandos Utiles

```bash
# Desarrollo
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview
```

## Soporte

Si necesitas ayuda o encuentras algun problema:
1. Verifica que las variables de entorno esten correctamente configuradas
2. Revisa la consola del navegador para errores
3. Verifica que RLS este habilitado en Supabase Dashboard
