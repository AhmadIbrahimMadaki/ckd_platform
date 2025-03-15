import React, { useState } from "react";


const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang) => {
    // i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">CKD Platform</div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">About Us</li>
            <li className="hover:text-blue-500 cursor-pointer">Course</li>
            <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
          </ul>

          {/* Language Selector and Get Started Button */}
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-100 border rounded px-3 py-2 text-gray-700"
            >
              <option value="en">English</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ff">Fulfulde</option>
              <option value="ar">Arabic</option>
            </select>
            <button
              onClick={() => window.location.href = '/register'}
              className="bg-blue-500 px-6 py-3 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              {("Get Started")}
              {/* {t("Get Started")} */}
            </button>

          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
            <a href="#home" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-500">About Us</a>
            <a href="#course" className="text-gray-700 hover:text-blue-500">Course</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-500">Contact Us</a>

            {/* Language Selector for Mobile */}
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-100 border rounded px-3 py-2 text-gray-700 w-full"
            >
              <option value="en">English</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ff">Fulfulde</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550831107-1553da8c8464')`, // Health-related background
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {("Chronic Kidney Disease Awareness")}
            {/* {t("Chronic Kidney Disease Awareness")} */}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            {("Learn how to monitor and manage ckd effectively. your health is our priority.")}
          </p>
          <button
            onClick={() => window.location.href = '/register'}
            className="bg-blue-500 px-6 py-3 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            {("Get Started")}
          </button>
        </div>
      </div>

      {/* Body Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {("What is CKD?")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {(
              "Chronic Kidney Disease (CKD) is a condition characterized by the gradual loss of kidney function over time. Early detection and management are crucial to preventing complications. Our platform offers a wealth of resources to help individuals and healthcare providers take control of CKD management."
            )}
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md max-w-sm">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                {("Prevention")}
              </h3>
              <p className="text-gray-600">
                {(
                  "Learn the steps you can take to reduce the risk of CKD, including maintaining a healthy lifestyle, staying hydrated, and regular checkups."
                )}
              </p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg shadow-md max-w-sm">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                {("Monitoring")}
              </h3>
              <p className="text-gray-600">
                {(
                  "Get tools and insights to track kidney health, analyze symptoms, and keep track of your overall well-being."
                )}
              </p>
            </div>
            <div className="bg-blue-300 p-6 rounded-lg shadow-md max-w-sm">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                {("Treatment Options")}
              </h3>
              <p className="text-gray-600">
                {(
                  "Access detailed information about treatment plans, lifestyle modifications, and expert guidance tailored to your needs."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
