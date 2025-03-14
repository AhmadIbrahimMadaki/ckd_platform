import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UndiagnosedDashboard = () => {
    const navigate = useNavigate();
    const [patientName, setPatientName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

    useEffect(() => {
        toast.dismiss(); // Clears old toasts
    
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            toast.error("User not authenticated. Redirecting...");
            navigate("/login");
            return;
        }
    
        const user = JSON.parse(storedUser);
        if (!user?.id) {
            toast.error("Invalid user data. Redirecting...");
            navigate("/login");
            return;
        }
    
        console.log("Fetching patient data for ID:", user.id);
    
        fetch(`http://127.0.0.1:5000/api/patient/${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data); // Log API response for debugging
    
                if (data && data.full_name) {
                    setPatientName(data.full_name);
                } else {
                    console.error("Patient name is missing in API response:", data);
                    toast.error("Patient name not found. Using default.");
                    setPatientName("Patient"); // Default fallback
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                toast.error("Unable to fetch patient data.");
            });
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.success("Logged out successfully.");
        navigate("/login");
    };

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">CKD Prediction System</h1>
                
                {/* User Dropdown */}
                <div className="relative">
                    <button 
                        onClick={toggleDropdown} 
                        className="bg-blue-800 px-4 py-2 rounded-md"
                    >
                        {patientName || "Patient"} ▼
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            <button 
                                onClick={handleLogout} 
                                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md mt-6">
                <h1 className="text-2xl font-bold mb-4">Welcome, {patientName || "Patient"}!</h1>
                <p>Your assessment has been submitted successfully. Your results are under review.</p>
                <p>Feel free to explore our resources while you wait.</p>
                <div className="mt-4">
                    <a href="/resources" className="text-blue-500 underline">
                        View Resources
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UndiagnosedDashboard;
