import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Video, MessageSquare, Calendar, AlertTriangle, User } from "lucide-react";

export default function Teleconsultation() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();
  
  const doctorEmail = "maryamamshi65@gmail.com"; // Replace with actual doctor's email

  // Function to send an email with the meeting link
  const sendEmailToDoctor = async (meetLink) => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;  
    try {
      const response = await fetch(`${API_BASE_URL}send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: doctorEmail,
          subject: "Teleconsultation Meeting Invitation",
          message: `Dear Doctor,\n\nA patient has requested a teleconsultation. Please join the session using the link below:\n\n${meetLink}\n\nThank you.`,
        }),
      });

      if (response.ok) {
        alert("Meeting link sent to the doctor successfully!");
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  // Function to handle button clicks
  const handleSelection = async (option) => {
    setSelectedOption(option);

    if (option === "video") {
      const meetLink = `https://meet.google.com/new`; // Google Meet generates a new meeting
      await sendEmailToDoctor(meetLink);
      window.open(meetLink, "_blank");
    } else if (option === "chat") {
      const phoneNumber = "2348028666887"; // Correct format
      const message = encodeURIComponent("Hello, I need assistance (Testing) from our telemedicine app.");
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
      alert("Opening WhatsApp Chat...");
      window.open(whatsappLink, "_blank");
    } else if (option === "schedule") {
      const schedulingLink = "https://calendly.com/your-clinic/30min"; // Use your actual Calendly link
      alert("Navigating to Appointment Scheduling...");
      window.open(schedulingLink, "_blank");
    }
  };

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
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Teleconsultation</h1>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-md"
          >
            <User size={20} /> Patient ▼
          </button>
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

      <h1 className="text-3xl font-bold text-center my-4 text-blue-600">Teleconsultation Options</h1>
      <p className="text-lg text-center text-gray-700 mb-6">Choose your preferred method for teleconsultation.</p>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Video Call Button */}
        <button
          onClick={() => handleSelection("video")}
          className={`flex flex-col items-center justify-center p-6 w-full md:w-1/3 border-2 border-blue-500 rounded-lg transition ${
            selectedOption === "video" ? "bg-blue-100" : "hover:bg-blue-50"
          }`}
        >
          <Video size={40} className="text-blue-600 mb-2" />
          Video Call
        </button>

        {/* Chat Button */}
        <button
          onClick={() => handleSelection("chat")}
          className={`flex flex-col items-center justify-center p-6 w-full md:w-1/3 border-2 border-blue-500 rounded-lg transition ${
            selectedOption === "chat" ? "bg-blue-100" : "hover:bg-blue-50"
          }`}
        >
          <MessageSquare size={40} className="text-blue-600 mb-2" />
          Chat
        </button>

        {/* Schedule Appointment Button */}
        <button
          onClick={() => handleSelection("schedule")}
          className={`flex flex-col items-center justify-center p-6 w-full md:w-1/3 border-2 border-blue-500 rounded-lg transition ${
            selectedOption === "schedule" ? "bg-blue-100" : "hover:bg-blue-50"
          }`}
        >
          <Calendar size={40} className="text-blue-600 mb-2" />
          Schedule Appointment
        </button>
      </div>

      {/* Selected Option Display */}
      {selectedOption && (
        <div className="mt-6 p-4 border rounded-lg bg-white w-full max-w-md mx-auto">
          <p className="text-xl font-medium text-gray-800">
            You selected: <span className="text-blue-600">{selectedOption.toUpperCase()}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Proceed with your selected teleconsultation method.</p>
        </div>
      )}

      {/* SOS Emergency Button */}
      <a
        href="tel:+1-800-7878-09"
        className="mt-8 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 flex items-center gap-2"
      >
        <AlertTriangle size={24} className="text-white" />
        SOS Emergency
      </a>
    </div>
  );
}
