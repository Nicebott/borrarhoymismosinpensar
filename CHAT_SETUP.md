# Configuración del Chat en Tiempo Real

El chat ha sido actualizado para funcionar exclusivamente con usuarios autenticados en Supabase. Aquí está todo lo que necesitas saber:

## Características Principales

### Autenticación Requerida
- El chat SOLO funciona para usuarios registrados e iniciados de sesión
- El nombre de usuario es automáticamente el que se registró en la cuenta
- No se necesita ingresar nombre de usuario manualmente

### Flujo de Acceso

1. **Usuario sin cuenta**
   - Ve un formulario de login
   - Puede crear nueva cuenta con email + contraseña
   - O iniciar sesión si ya tiene cuenta

2. **Usuario autenticado**
   - Su nombre de usuario es automáticamente su `display_name` del perfil
   - Puede acceder al chat inmediatamente
   - Ver y enviar mensajes en tiempo real

3. **Superadmin**
   - Verá un campo adicional para ingresar contraseña de administrador
   - Al verificar la contraseña, acceso a modo admin
   - Puede eliminar mensajes de otros usuarios
   - El botón de logout admin aparece en rojo

## Estructura de Base de Datos

### Tabla: chat_messages
```
- id (uuid)
- text (texto del mensaje)
- username (nombre del usuario que envió)
- is_admin (boolean, si es enviado como admin)
- created_at (timestamp)
```

### Tabla: profiles
```
- id (uuid, relacionado a auth.users)
- display_name (nombre de usuario del chat)
- created_at (timestamp)
```

### Tabla: chat_config
```
- key = 'admin_password'
- value = contraseña de admin (por defecto: 'changeme')
```

## Seguridad (RLS)

- Usuarios autenticados pueden leer y enviar mensajes
- Solo superadmins y admins pueden eliminar mensajes
- La contraseña de admin está protegida (solo lectura desde backend)
- Todas las operaciones requieren autenticación válida

## Cambiar Contraseña de Admin

1. Ve a Supabase Dashboard
2. Abre SQL Editor
3. Ejecuta:

```sql
UPDATE chat_config
SET value = 'nueva_contrasena'
WHERE key = 'admin_password';
```

## Permitir a un Usuario ser Superadmin

1. El usuario debe estar registrado
2. Obtén su User ID (UUID) de la tabla auth.users o profiles
3. Ejecuta en SQL Editor:

```sql
INSERT INTO superadmins (user_id)
VALUES ('USER_ID_AQUI');
```

## Cómo Funciona el Nombre de Usuario

1. Al registrarse, si el email es `juan@example.com`:
   - El display_name se establece automáticamente como `juan`

2. Este nombre aparece en todos los mensajes del chat

3. Para cambiar el nombre de usuario:
   ```sql
   UPDATE profiles
   SET display_name = 'nuevo_nombre'
   WHERE id = 'USER_ID';
   ```

## Flujo de Mensaje en Tiempo Real

1. Usuario autenticado escribe mensaje
2. Se inserta en tabla chat_messages con su display_name
3. Supabase Realtime notifica a todos los clientes conectados
4. Todos ven el mensaje instantáneamente
5. Admins pueden eliminarlo haciendo clic en el icono de basura

## Comportamiento del Chat

- **Abrir/Cerrar**: Botón flotante azul en esquina inferior derecha
- **Contador de mensajes**: Muestra mensajes no leídos cuando está cerrado
- **Emojis**: Soporte para emojis mediante emoji-picker
- **Scroll**: Auto-scroll hacia nuevos mensajes
- **Historial**: Puede cargar más mensajes antiguos

## Requiere Autenticación

El siguiente código no funciona más:
```
- Iniciar con cualquier nombre de usuario
- Acceder sin estar registrado
- Ver contraseña de admin sin ser superadmin
```

Solo funciona:
```
- Usuarios con cuenta creada y sesión iniciada
- Su nombre es su display_name del perfil
- Mensajes asociados a su user_id
```

## Próximas Acciones

1. Prueba creando una cuenta
2. Verifica que tu nombre aparece automáticamente en los mensajes
3. Si eres superadmin, prueba la contraseña de admin
4. Los mensajes se actualizan en tiempo real para todos

## Soporte

Si necesitas:
- Cambiar contraseña admin: actualiza tabla chat_config
- Hacer a alguien superadmin: inserta en tabla superadmins
- Ver mensajes en BD: consulta tabla chat_messages
