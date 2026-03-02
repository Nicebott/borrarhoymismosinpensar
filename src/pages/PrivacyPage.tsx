import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  darkMode: boolean;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ darkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-8 ${
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          } transition-colors`}
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <div className={`rounded-lg shadow-lg p-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Política de Privacidad
          </h1>
          <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                En <strong>MiSemestre</strong>, tu privacidad es importante para nosotros. Queremos ser transparentes sobre cómo cuidamos tu información para que puedas usar nuestra plataforma con confianza. Esta política explica de forma sencilla qué datos recogemos y por qué.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Información que Recopilamos
              </h2>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Para crear tu cuenta
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Correo electrónico</li>
                <li>Nombre de usuario</li>
                <li>Contraseña (protegida)</li>
                <li>Fecha de registro</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Lo que compartes en la plataforma
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Reseñas y calificaciones de profesores</li>
                <li>Publicaciones y comentarios en el foro</li>
                <li>Mensajes en el chat</li>
                <li>Tus búsquedas e intereses</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Datos técnicos automáticos
              </h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Tipo de dispositivo y navegador</li>
                <li>Dirección IP (para seguridad)</li>
                <li>Cookies para recordar tus preferencias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Cómo Usamos tu Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Usamos tus datos principalmente para que la plataforma funcione bien para ti:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Mantener tu cuenta segura y activa</li>
                <li>Mostrarte el contenido que te interesa</li>
                <li>Evitar spam y comportamientos abusivos</li>
                <li>Mejorar la experiencia basándonos en cómo usas el sitio</li>
                <li>Envíarte notificaciones importantes sobre tu cuenta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Compartir Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                No vendemos tus datos. Solo compartimos lo estrictamente necesario para que el servicio funcione:
              </p>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Proveedores de confianza
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li><strong>Supabase:</strong> Para guardar tus datos y gestionar tu login de forma segura.</li>
                <li><strong>Servicios de Infraestructura:</strong> Para que la web esté siempre online.</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Lo que es público
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Recuerda que lo que publicas en los foros o reseñas es visible para la comunidad:
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Tu nombre de usuario</li>
                <li>Tus reseñas y comentarios</li>
                <li>Tus participaciones en discusiones</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Seguridad de los Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tomamos la seguridad muy en serio. Utilizamos encriptación moderna para proteger tus contraseñas y tus datos viajan por canales seguros (HTTPS). Aunque hacemos todo lo posible por proteger tu información, ten en cuenta que internet no es 100% infalible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Retención de Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Guardamos tu información mientras tu cuenta esté activa. Si decides eliminar tu cuenta, borraremos tus datos personales de nuestros sistemas activos en un plazo de 30 días. El contenido público (como reseñas) podría permanecer anonimizado para no afectar las discusiones de la comunidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Tus Derechos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tú tienes el control. Puedes:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Ver qué datos tenemos sobre ti</li>
                <li>Corregir información si está mal</li>
                <li>Borrar tu cuenta cuando quieras</li>
                <li>Descargar una copia de tu información</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Cookies
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Usamos cookies pequeñas para recordar si prefieres el modo oscuro, mantener tu sesión iniciada y hacer que la web cargue más rápido. Puedes configurar tu navegador para bloquearlas, pero algunas funciones de la web podrían no funcionar correctamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Cambios a esta Política
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                A veces actualizamos esta política para mejorarla. Si hacemos cambios importantes, te avisaremos en la plataforma o por correo. Te invitamos a revisarla de vez en cuando.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Enlaces a Otros Sitios
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nuestra web puede tener enlaces a otras páginas. No controlamos ni somos responsables de cómo esas páginas manejan tu privacidad, así que te recomendamos leer sus propias políticas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Contacto
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Si tienes dudas sobre tu privacidad o quieres ejercer tus derechos, escríbenos a través del chat de soporte. Estaremos encantados de ayudarte.
              </p>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Al usar MiSemestre, aceptas esta política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;