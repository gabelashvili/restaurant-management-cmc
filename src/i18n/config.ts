import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enJSON from './en.json';
import geJSON from './geo.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ge: {
        geJSON,
      },
      en: {
        enJSON,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['ge', 'en'],
  })
  .then(() => {
    console.log('localization successfully initialized...');
  })
  .catch(() => {
    console.log('localization initialized failed...');
  });
