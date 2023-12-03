import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJSON from './en.json';
import geJSON from './geo.json';

export const defaultNS = 'geJSON';

i18next
  .use(initReactI18next)
  .init({
    lng: 'ge',
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
