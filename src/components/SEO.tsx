import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MiSemestre - Programacion Docente UASD 2025-10',
  description = 'Programacion docente UASD 2025-10. Encuentra horarios, profesores, asignaturas y resenas de la Universidad Autonoma de Santo Domingo.',
  keywords = 'programacion docente uasd, uasd, MiSemestre, universidad uasd, horarios uasd',
  ogImage = 'https://misemestre.com/og-image.jpg',
  canonical
}) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const metaTags: Record<string, string> = {
      description,
      keywords,
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"]`) ||
                    document.querySelector(`meta[property="${name}"]`);

      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    });

    const canonicalUrl = canonical || `https://misemestre.com${location.pathname}`;
    let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (linkElement) {
      linkElement.href = canonicalUrl;
    } else {
      linkElement = document.createElement('link');
      linkElement.rel = 'canonical';
      linkElement.href = canonicalUrl;
      document.head.appendChild(linkElement);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }
  }, [title, description, keywords, ogImage, canonical, location.pathname]);

  return null;
};

export default SEO;
