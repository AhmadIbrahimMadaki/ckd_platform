// src/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  // const handleChangeLanguage = (language) => {
  //   i18n.changeLanguage(language);
  // };
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language); // Save to localStorage
  };

  return (
    <select onChange={(e) => handleChangeLanguage(e.target.value)} className="p-2 border rounded">
      <option value="en">English</option>
      <option value="ha">Hausa</option>
      <option value="ar">Arabic</option>
      <option value="ff">Fulfulde</option>
      <option value="yo">Yoroba</option>
      <option value="ig">Igbo</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSelector;
