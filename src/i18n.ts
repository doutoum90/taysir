import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./locales/fr/translation.json";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import tr from "./locales/tr/translation.json";

export const RTL_LANGS = new Set(["ar"]);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
    },
    lng: "tr",              // ✅ langue par défaut
    fallbackLng: "tr",      // ✅ fallback aussi en turc
    supportedLngs: ["tr", "fr", "en", "ar"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
