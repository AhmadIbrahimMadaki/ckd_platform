// src/components/Footer.jsx
import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} CKD Platform. {t("Powered by")} <span className="font-bold text-blue-400">NAIR</span>
        </p>
      </footer>
  );
};

export default Footer;
