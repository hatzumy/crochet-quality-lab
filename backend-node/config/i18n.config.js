import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'node:path';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector) // <--- Este es el que lee el header de Postman
  .init({
    // Configuración de detección
    detection: {
      order: ['header', 'querystring', 'cookie'], // Primero mira los Headers de Postman
      caches: false
    },
    fallbackLng: 'es',
    preload: ['es', 'en'],
    supportedLngs: ['es', 'en'], 
    ns: ['auth'],
    defaultNS: 'auth',
    backend: {
      loadPath: path.join(process.cwd(), 'locales/{{lng}}/{{ns}}.json')
    },
    interpolation: {
      escapeValue: false 
    }
  });

export default i18next;