// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import type en from '../../public/locales/en/translation.json';
import type ka from '../../public/locales/ka/translation.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'ka';
    // custom resources type
    resources: {
      ka: typeof ka;
      en: typeof en;
    };
    // other
  }
}
