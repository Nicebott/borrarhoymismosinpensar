# Sistema de Enrutamiento

La aplicacion ahora usa React Router para gestionar la navegacion. Esto proporciona:

## Ventajas

- URLs reales y compartibles
- El boton atras del navegador funciona correctamente
- Las recargas de pagina mantienen la vista actual
- Mejor SEO (si se implementa SSR en el futuro)
- Codigo mas limpio y mantenible

## Rutas Disponibles

### Pagina Principal
- **Ruta**: `/`
- **Componente**: `HomePage`
- **Descripcion**: Lista de cursos con busqueda y filtros

### Modalidad Virtual
- **Ruta**: `/virtual`
- **Componente**: `VirtualPage`
- **Descripcion**: Cursos en modalidad online/virtual
- **Query Params**: `?modality=virtual`

### Modalidad Semipresencial
- **Ruta**: `/semipresencial`
- **Componente**: `SemipresencialPage`
- **Descripcion**: Cursos en modalidad semipresencial
- **Query Params**: `?modality=semipresencial`

### Preguntas Frecuentes
- **Ruta**: `/faq`
- **Componente**: `FAQPage`
- **Descripcion**: Preguntas y respuestas sobre la UASD

### Foro
- **Ruta**: `/foro`
- **Componente**: `ForumPage`
- **Descripcion**: Foro de discusion para estudiantes

### Panel de Administracion
- **Ruta**: `/admin`
- **Componente**: `AdminPage`
- **Descripcion**: Panel para administradores (requiere permisos)

## Query Parameters

La pagina principal y las paginas de modalidad soportan los siguientes parametros de consulta:

- `q`: Termino de busqueda
- `campus`: Campus seleccionado
- `modality`: Modalidad (virtual, semipresencial)
- `page`: Numero de pagina actual

### Ejemplo de URL completa:
```
/?q=matematicas&campus=Santo%20Domingo&page=2
/virtual?q=programacion&page=1
```

## Estructura de Archivos

```
src/
├── App.tsx                 # Router principal y layout
├── pages/                  # Componentes de pagina
│   ├── HomePage.tsx
│   ├── VirtualPage.tsx
│   ├── SemipresencialPage.tsx
│   ├── FAQPage.tsx
│   ├── ForumPage.tsx
│   └── AdminPage.tsx
└── components/
    └── Navigation.tsx      # Navegacion con React Router Links
```

## Navegacion Programatica

Si necesitas navegar programaticamente en el codigo:

```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/foro');
  };

  return <button onClick={handleClick}>Ir al Foro</button>;
}
```

## Acceso a Parametros de URL

```tsx
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');
  const page = searchParams.get('page');

  // Actualizar parametros
  const updateQuery = (newQuery: string) => {
    searchParams.set('q', newQuery);
    setSearchParams(searchParams);
  };
}
```

## Mejoras Futuras

- Lazy loading de paginas para reducir el tamano del bundle
- Animaciones de transicion entre rutas
- Breadcrumbs para navegacion jerarquica
- 404 page para rutas no encontradas
- Proteccion de rutas (PrivateRoute para /admin)
