// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-localstorage-backend"; // Optionally use a backend for language persistence

// Import translation files for different languages
import en from './locales/en.json';
import ha from './locales/ha.json';
import ar from './locales/ar.json';
import ff from './locales/ff.json';
import yo from './locales/yo.json';
import ig from './locales/ig.json';


// Initialize i18n
i18n
  .use(LanguageDetector) // Detect language automatically
  .use(Backend) // Persist language selection in localStorage
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language (used when language detection fails)
    debug: true, // Enable debug logs
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    detection: {
      order: ["localStorage", "navigator"], // First look in localStorage, then use browser language
      caches: ["localStorage"], // Cache the language in localStorage
    },
    resources: {
      en: { translation: en },
      ha: { translation: ha },
      ar: { translation: ar },
      ff: { translation: ff },
      yo: { translation: yo },
      ig: { translation: ig },
      // Add more languages here as needed
    },
  });

export default i18n;
