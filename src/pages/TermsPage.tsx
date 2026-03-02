import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  darkMode: boolean;
}

const TermsPage: React.FC<TermsPageProps> = ({ darkMode }) => {
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
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Términos y Condiciones
          </h1>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bienvenido a <strong>MiSemestre</strong>. Queremos que tengas una buena experiencia usando nuestra plataforma. Estos términos explican las reglas básicas para usar el servicio de manera justa y segura para todos.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Uso del Servicio
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Al usar MiSemestre, aceptas seguir estas normas. Nuestro objetivo es crear un espacio útil para la comunidad estudiantil. Si no estás de acuerdo con algo, lo mejor es que no utilices la plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Qué Ofrecemos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                MiSemestre es una plataforma independiente diseñada para ayudarte con:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Información sobre la programación docente (UASD)</li>
                <li>Reseñas y opiniones sobre profesores</li>
                <li>Foros y chat para conectar con otros estudiantes</li>
                <li>Herramientas para buscar asignaturas fácilmente</li>
              </ul>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <em>Nota:</em> No estamos afiliados oficialmente a la UASD. La información es para fines educativos y de orientación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Tu Cuenta
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Para participar, necesitas una cuenta. Te pedimos que:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Uses datos reales y seguros</li>
                <li>Protejas tu contraseña y no la compartas</li>
                <li>Nos avises si crees que alguien más usa tu cuenta</li>
                <li>Tengas en cuenta que solo permitimos una cuenta por persona</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Tu Contenido
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Cuando publicas reseñas o comentarios, eres dueño de lo que escribes, pero nos das permiso para mostrarlo en la plataforma. Solo te pedimos que:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Séas honesto y basado en tu experiencia real</li>
                <li>Respetes a los demás (sin insultos ni discriminación)</li>
                <li>No publiques información privada de otras personas</li>
                <li>Evites contenido ilegal o peligroso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Propiedad Intelectual
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Respetamos el trabajo de todos. El diseño y código de MiSemestre pertenecen a Nicebott. No está permitido copiar la web, vender acceso a ella o intentar hackear el sistema.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Normas de Convivencia
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Para mantener el orden, no permitimos:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Spam o publicidad no deseada</li>
                <li>Acoso o bullying hacia otros usuarios</li>
                <li>Crear cuentas falsas o múltiples para manipular votos</li>
                <li>Intentar dañar el funcionamiento de la web</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Moderación
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Queremos un ambiente sano. Nos reservamos el derecho de eliminar comentarios que rompan las reglas o suspender cuentas que abusen del sistema, siempre buscando el bienestar de la comunidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Disponibilidad
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Hacemos lo posible por mantener la web online, pero a veces pueden ocurrir caídas o mantenimiento. No podemos garantizar que el servicio esté disponible el 100% del tiempo sin interrupciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Información y Responsabilidad
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Ten en cuenta que:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Las reseñas son opiniones de estudiantes, no hechos oficiales.</li>
                <li>La programación docente puede cambiar; verifica siempre con la universidad.</li>
                <li>Usas la plataforma bajo tu propio criterio.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Cambios en los Términos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Podemos actualizar estas normas de vez en cuando. Si hay cambios importantes, te avisaremos en la web. Seguir usando MiSemestre significa que aceptas las nuevas condiciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Cancelación
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Puedes dejar de usar la plataforma cuando quieras. Nosotros también podemos cerrar tu cuenta si violas estas normas de manera grave.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                12. Contacto
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                ¿Tienes dudas? Escríbenos a través del chat de soporte. Estamos aquí para ayudarte a tener la mejor experiencia posible.
              </p>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;