// // src/i18n.js
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// // Translation data for different languages
// const resources = {
//   en: {
//     translation: {
//       home: "Home",
//       aboutUs: "About Us",
//       course: "Course",
//       contactUs: "Contact Us",
//       getStarted: "Get Started",
//       ckdAwareness: "Chronic Kidney Disease Awareness",
//       ckdInfo: "Learn how to monitor and manage CKD effectively. Your health is our priority.",
//       whatIsCkd: "What is CKD?",
//       prevention: "Prevention",
//       monitoring: "Monitoring",
//       treatmentOptions: "Treatment Options",
//     },
//   },
//   fr: {
//     translation: {
//       home: "Accueil",
//       aboutUs: "À propos de nous",
//       course: "Cours",
//       contactUs: "Contactez-nous",
//       getStarted: "Commencer",
//       ckdAwareness: "Sensibilisation à la maladie rénale chronique",
//       ckdInfo: "Apprenez à surveiller et à gérer la MRC efficacement. Votre santé est notre priorité.",
//       whatIsCkd: "Qu'est-ce que la MRC ?",
//       prevention: "Prévention",
//       monitoring: "Surveillance",
//       treatmentOptions: "Options de traitement",
//     },
//   },
//   ha: {
//     translation: {
//       home: "Gida",
//       aboutUs: "Game da Mu",
//       course: "Koyarwa",
//       contactUs: "Tuntuɓi Mu",
//       getStarted: "Fara",
//       ckdAwareness: "Sanin Cututtukan Koda Na Dindindin",
//       ckdInfo: "Koyi yadda ake lura da kuma sarrafa cututtukan koda yadda ya kamata. Lafiyarka ita ce fifikon mu.",
//       whatIsCkd: "Menene CKD?",
//       prevention: "Rigakafi",
//       monitoring: "Lura",
//       treatmentOptions: "Zaɓuɓɓukan Magani",
//     },
//   },
//   yo: {
//     translation: {
//       home: "Ile",
//       aboutUs: "Nipa Wa",
//       course: "Eko",
//       contactUs: "Kan si Wa",
//       getStarted: "Bẹrẹ",
//       ckdAwareness: "Imoye Nipa Arun Kidinrin Titilai",
//       ckdInfo: "Kọ ẹkọ bi o ṣe le ṣe abojuto ati ṣakoso CKD ni imunadoko. Ilera rẹ jẹ pataki julọ fun wa.",
//       whatIsCkd: "Kini CKD?",
//       prevention: "Idena",
//       monitoring: "Ṣiṣọ",
//       treatmentOptions: "Àṣàyàn Ìtọ́jú",
//     },
//   },
//   ig: {
//     translation: {
//       home: "Ụlọ",
//       aboutUs: "Banyere Anyị",
//       course: "Ụmụakwụkwọ",
//       contactUs: "Kpọtụrụ Anyị",
//       getStarted: "Malite",
//       ckdAwareness: "Mara Banyere Ọrịa Akụkụ Kidni Maka Oge Na-adịru Oge",
//       ckdInfo: "Mụta otu esi echedo na ịchịkwa CKD nke ọma. Ahụike gị bụ ihe kacha mkpa nye anyị.",
//       whatIsCkd: "Gịnị bụ CKD?",
//       prevention: "Mgbochi",
//       monitoring: "Nlekota",
//       treatmentOptions: "Nhọrọ Ọgwụgwọ",
//     },
//   },
//   ff: {
//     translation: {
//       home: "Gasa",
//       aboutUs: "Rewɓe Ena",
//       course: "Heɓere",
//       contactUs: "Njam Rewɓe",
//       getStarted: "Fuɗa",
//       ckdAwareness: "Anndingal Fii Saccuu Na Koya Timmunde",
//       ckdInfo: "Anndu fof njaltin ngaaɗo, ɗum waɗata anndu ko ɗum ina haɓutoo nguurndam kanko.",
//       whatIsCkd: "Holno ko CKD?",
//       prevention: "Koɗal",
//       monitoring: "Nanaɓɓe",
//       treatmentOptions: "Holnoɓe Gorol",
//     },
//   },
//   ar: {
//     translation: {
//       home: "الرئيسية",
//       aboutUs: "من نحن",
//       course: "الدورة",
//       contactUs: "اتصل بنا",
//       getStarted: "ابدأ",
//       ckdAwareness: "التوعية بمرض الكلى المزمن",
//       ckdInfo: "تعلم كيفية مراقبة وإدارة مرض الكلى المزمن بفعالية. صحتك هي أولويتنا.",
//       whatIsCkd: "ما هو مرض الكلى المزمن؟",
//       prevention: "الوقاية",
//       monitoring: "المراقبة",
//       treatmentOptions: "خيارات العلاج",
//     },
//   },
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: "en", // Default language
//     keySeparator: false, // Use keys as they are
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpApi from "i18next-http-backend";

// i18n
//   .use(HttpApi) // Load translations from backend
//   .use(LanguageDetector) // Detect user's language
//   .use(initReactI18next) // Pass i18n instance to react-i18next
//   .init({
//     fallbackLng: "en", // Default language
//     debug: true, // Enable debug for troubleshooting
//     supportedLngs: ["en", "ha", "yo", "ig", "ff", "ar"], // Supported languages
//     interpolation: {
//       escapeValue: false, // React already handles escaping
//     },
//     backend: {
//       loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
//     },
//     detection: {
//       order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
//       caches: ["localStorage", "cookie"],
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ha from "./locales/ha.json";
// Add other languages as needed

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ha: { translation: ha },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
