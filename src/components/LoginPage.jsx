import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // You can use React Router for navigation
import { toast } from "react-toastify";

const LoginPage = () => {
  // const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage] = useState("");
  const navigate = useNavigate(); // Initialize React Router's navigate

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = ("Email is required");
    if (!formData.password.trim()) newErrors.password = ("Password is required");
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
  
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      // console.log("API_BASE_URL:", API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      // console.log("Backend response:", data); // Debug response
  
      if (response.ok) {
        toast.success(("Login successful!"));
  
        // Store user data in localStorage
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
  
        // Redirect to the provided URL
        if (data.redirect) {
          navigate(data.redirect);
        } else {
          toast.error(("No redirect URL provided by the server."));
          // setErrors({ server: t("No redirect URL provided by the server.") });
        }
      } else {
        toast.error(("Invalid email or password."));
        // setErrors({ server: data.message || t("Something went wrong!") });
      }
    } catch (error) {
      toast.error(("Unable to connect to the server!"));
      // setErrors({ server: t("Unable to connect to the server!") });
      // console.error("Error during login:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {("Login to Your Account")}
        </h1>
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errors.server && <p className="text-red-500 text-center mb-4">{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {("Email Address")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${errors.email ? "border-red-500" : ""}`}
              placeholder={("Enter your email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {("Password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 text-gray-700 ${errors.password ? "border-red-500" : ""}`}
              placeholder={("Enter your password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition"
          >
            {("Login")}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {("Don't have an account?")}{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              {("Register")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;