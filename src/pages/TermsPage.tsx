import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  darkMode: boolean;
}

const TermsPage: React.FC<TermsPageProps> = ({ darkMode }) => {
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
                Bienvenido a la plataforma de Programación Docente UASD. Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Uso del Servicio
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Esta plataforma proporciona información sobre la programación docente de la Universidad Autónoma de Santo Domingo (UASD). El servicio está diseñado para uso académico y educativo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Registro de Cuenta
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Debes proporcionar información precisa y actualizada al registrarte.</li>
                <li>Eres responsable de mantener la confidencialidad de tu cuenta.</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
                <li>No puedes compartir tu cuenta con terceros.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Contenido de Usuario
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Al publicar reseñas, comentarios o participar en el foro, garantizas que:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>El contenido es original y no infringe derechos de terceros.</li>
                <li>No contiene material ofensivo, difamatorio o ilegal.</li>
                <li>Respeta las normas de convivencia y respeto mutuo.</li>
                <li>Es veraz y basado en tu experiencia personal.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Propiedad Intelectual
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Todo el contenido de la plataforma, incluyendo diseño, código, textos y gráficos, está protegido por derechos de autor y es propiedad de Nicebott o sus licenciantes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Conducta Prohibida
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Está estrictamente prohibido:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Publicar contenido falso, engañoso o difamatorio.</li>
                <li>Acosar, intimidar o amenazar a otros usuarios.</li>
                <li>Intentar acceder sin autorización a cuentas de otros usuarios.</li>
                <li>Utilizar la plataforma para actividades ilegales.</li>
                <li>Realizar scraping o recopilación automatizada de datos.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Moderación de Contenido
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nos reservamos el derecho de revisar, moderar o eliminar cualquier contenido que viole estos términos o que consideremos inapropiado. También podemos suspender o terminar cuentas que incumplan estas normas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Disponibilidad del Servicio
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                No garantizamos que el servicio esté disponible de forma ininterrumpida. Podemos realizar mantenimiento, actualizaciones o modificaciones sin previo aviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Limitación de Responsabilidad
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                La información proporcionada en la plataforma es con fines informativos. No nos hacemos responsables de decisiones tomadas basándose en esta información. La programación docente oficial debe ser consultada directamente con la UASD.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Modificaciones
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Podemos actualizar estos términos en cualquier momento. Los cambios significativos serán notificados a través de la plataforma. El uso continuo del servicio después de las modificaciones constituye la aceptación de los nuevos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Ley Aplicable
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Estos términos se rigen por las leyes de la República Dominicana. Cualquier disputa será resuelta en los tribunales competentes del país.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Contacto
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Si tienes preguntas sobre estos términos, puedes contactarnos a través del chat de soporte en la plataforma.
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
