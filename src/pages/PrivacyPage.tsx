import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  darkMode: boolean;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ darkMode }) => {
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
            Política de Privacidad
          </h1>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                En la plataforma de Programación Docente UASD, tu privacidad es importante para nosotros. Esta política de privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos tu información.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Información que Recopilamos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Recopilamos información que proporcionas directamente:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Nombre y correo electrónico al registrarte</li>
                <li>Información de perfil que proporcionas voluntariamente</li>
                <li>Reseñas, comentarios y contenido que publicas</li>
                <li>Información de contacto cuando te comunicas con nosotros</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Información Recopilada Automáticamente
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Cuando utilizas nuestro sitio, podemos recopilar automáticamente:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Datos de referencia y estadísticas de uso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Cómo Utilizamos Tu Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Utilizamos tu información para:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Comunicarnos contigo sobre cambios o actualizaciones</li>
                <li>Prevenir fraude y actividades ilícitas</li>
                <li>Cumplir con obligaciones legales y reglamentarias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Seguridad de Datos
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Compartir Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                No vendemos ni alquilamos tu información personal. Podemos compartir información:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                <li>Cuando es requerido por ley o autoridades competentes</li>
                <li>Para proteger los derechos, privacidad y seguridad de nuestros usuarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Tus Derechos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tienes derecho a:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Optar por no recibir comunicaciones de marketing</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Cookies y Tecnologías Similares
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia de usuario, recordar tus preferencias y analizar el uso de la plataforma. Puedes controlar las cookies a través de la configuración de tu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Retención de Datos
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Conservamos tu información personal solo durante el tiempo que sea necesario para proporcionarte los servicios y cumplir con nuestras obligaciones legales. Cuando cierres tu cuenta, eliminaremos tus datos personales de acuerdo con nuestras políticas de retención.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Enlaces a Terceros
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nuestra plataforma puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos revisar sus políticas de privacidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Cambios a esta Política
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Podemos actualizar esta política de privacidad periódicamente. Los cambios serán notificados a través de la plataforma. Tu uso continuado del servicio indica tu aceptación de los cambios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Contacto
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información, puedes contactarnos a través del chat de soporte en la plataforma.
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

export default PrivacyPage;
