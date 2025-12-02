import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = t("Email is required");
    if (!formData.password.trim()) newErrors.password = t("Password is required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);   // ✅ Start loader
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(t("Login successful!"));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("patient_id", data.user.id);
        localStorage.setItem("patient_name", data.user.full_name);
        localStorage.setItem("patient_contact", data.user.email);

        navigate(data.redirect || "/");
      } else {
        toast.error(t("Invalid email or password."));
      }
    } catch {
      toast.error(t("Unable to connect to the server!"));
    }
    setLoading(false);  // ✅ Stop loader
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {t("Login to Your Account")}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>{t("Email Address")}</label>
            <input
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t("Enter your email")}
              className={`w-full border rounded px-4 py-2 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label>{t("Password")}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={t("Enter your password")}
              className={`w-full border rounded px-4 py-2 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 w-full rounded flex items-center justify-center
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("Login")
            )}
          </button>

        </form>

        <p className="mt-4 text-center">
          {t("Don't have an account?")}{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            {t("Register")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
