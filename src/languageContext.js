import React, { createContext, useState, useEffect } from "react";
import i18n from "./i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng); // Trigger re-render
  };

  useEffect(() => {
    const handleLangChange = (lng) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', handleLangChange);

    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
