import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'es'],
  hideLocale: 'default-locale',
});

// Fumadocs's language switcher uses `displayName` from here to label each
// option in the dropdown. The `provider()` function returns props shaped for
// <RootProvider i18n={...}>; Provider consumes it below.
export const i18nUI = defineI18nUI(i18n, {
  translations: {
    en: { displayName: 'English' },
    es: { displayName: 'Español' },
  },
});
