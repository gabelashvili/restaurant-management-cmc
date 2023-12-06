import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enJSON from './en.json';
import geJSON from './geo.json';

export const defaultNS = 'geJSON';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        enJSON,
      },
      ge: {
        geJSON,
      },
    },
    defaultNS,
  })
  .then(() => {
    console.log('localization successfully initialized...');
  })
  .catch(() => {
    console.log('localization initialized failed...');
  });
