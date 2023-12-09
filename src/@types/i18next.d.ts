// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import type en from '../i18n/en.json';
import type ge from '../i18n/geo.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    // custom resources type
    resources: {
      ge: typeof ge;
      en: typeof en;
    };
    // other
  }
}
