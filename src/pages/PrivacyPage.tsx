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
            Última actualización: 18/2/2026
          </p>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                En Nicebott, respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta política explica qué información recopilamos y cómo la utilizamos.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Información que Recopilamos
              </h2>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información de Registro
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Correo electrónico</li>
                <li>Nombre de usuario</li>
                <li>Contraseña (encriptada)</li>
                <li>Fecha de registro</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información de Uso
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Reseñas y calificaciones de profesores</li>
                <li>Publicaciones y comentarios en el foro</li>
                <li>Mensajes en el chat</li>
                <li>Historial de búsquedas y navegación</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información Técnica
              </h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Sistema operativo</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Cómo Usamos tu Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Utilizamos la información recopilada para:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Autenticar tu identidad y proteger tu cuenta</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Moderar contenido y prevenir abusos</li>
                <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
                <li>Comunicarnos contigo sobre actualizaciones o cambios importantes</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Base Legal para el Procesamiento
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Procesamos tus datos personales bajo las siguientes bases legales:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Consentimiento: Al registrarte y usar nuestros servicios</li>
                <li>Ejecución de contrato: Para proporcionar los servicios solicitados</li>
                <li>Interés legítimo: Para mejorar y proteger nuestros servicios</li>
                <li>Obligación legal: Cuando sea requerido por ley</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Compartir Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                No vendemos tu información personal. Podemos compartir información limitada con:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Proveedores de servicios: Firebase/Google para autenticación y almacenamiento</li>
                <li>Usuarios públicos: Tu nombre de usuario y contenido público (reseñas, foro)</li>
                <li>Autoridades: Cuando sea requerido por ley o para proteger derechos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Seguridad de los Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Implementamos medidas de seguridad para proteger tus datos:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Encriptación de contraseñas mediante Firebase Authentication</li>
                <li>Conexiones seguras HTTPS</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo regular de seguridad</li>
                <li>Copias de seguridad regulares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Retención de Datos
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Conservamos tu información mientras tu cuenta esté activa o según sea necesario para proporcionar servicios. Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Tus Derechos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tienes derecho a:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Eliminar tu cuenta y datos asociados</li>
                <li>Exportar tus datos en formato portable</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Limitar el procesamiento en ciertas circunstancias</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Cookies
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Las cookies nos ayudan a recordar tus preferencias (como el modo oscuro) y proporcionar funciones esenciales del servicio. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Privacidad de Menores
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nuestros servicios están dirigidos a estudiantes universitarios mayores de 18 años. No recopilamos intencionalmente información de menores de edad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Cambios a esta Política
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos mediante un aviso en la plataforma o por correo electrónico. Te recomendamos revisar esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Transferencia Internacional
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Tus datos pueden ser transferidos y almacenados en servidores ubicados fuera de República Dominicana. Utilizamos proveedores que cumplen con estándares internacionales de protección de datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                12. Contacto
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, puedes contactarnos a través del chat de soporte en la plataforma.
              </p>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Última actualización: 18/2/2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
