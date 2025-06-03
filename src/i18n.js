// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationZH from './locales/zh.json';
import translationDE from './locales/de.json';
import translationTH from './locales/th.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  zh: { translation: translationZH },
  de: { translation: translationDE },
  th: { translation: translationTH }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
