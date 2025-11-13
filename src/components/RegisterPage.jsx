import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the translation hook
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "patient", // Default user type
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t("Full name is required");
    if (!formData.email.trim()) newErrors.email = t("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("Invalid email format");
    if (!formData.password.trim()) newErrors.password = t("Password is required");
    else if (formData.password.length < 6) newErrors.password = t("Password must be at least 6 characters long");
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t("Passwords do not match");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const API_BASE_URL = process.env.REACT_APP_API_URL;
    // console.log("API_BASE_URL:", API_BASE_URL);
    setLoading(true);   // ✅ Start loader

    try {
      const response = await fetch(`${API_BASE_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(t("Registration successful!"));
        setFormData({
          fullName: "",
          email: "",
          userType: "patient",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        toast.error(t("Something went wrong!"));
        setErrors({ server: data.message });
      }
    } catch (error) {
      toast.error(t("Unable to connect to the server!"));
    }
    setLoading(false);  // ✅ Stop loader
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {t("Create Your Account")}
        </h1>
        {errors.server && <p className="text-red-500 text-center mb-4">{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {t("Full Name")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              placeholder={t("Enter your full name")}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {t("Email Address")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder={t("Enter your email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              {t("User Type")}
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 text-gray-700"
            >
              <option value="patient">{t("Patient")}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {t("Password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder={t("Enter your password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {t("Confirm Password")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder={t("Re-enter your password")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("Register")
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {t("Already have an account?")}{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              {t("Login")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
