import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PatientSelection = () => {
  const navigate = useNavigate();
  // const [setPatientId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    

    if (user && user.id) {
      // console.log("Fetching patient data for user ID:", user.id);

      fetch(`http://127.0.0.1:5000/api/patient/${user.id}`)
        .then((res) => res.json())
        .then((patientData) => {
          // console.log("Fetched patient data:", patientData);

        
        })
        .catch((error) => console.error("Error fetching patient data:", error));
    }
  }); // Run only once when component mounts

  const handleExistingPatientClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.id) {
      // console.log("Navigating to patient results with ID:", user.id);
      navigate(`/patientresults/${user.id}`);
    } else {
      alert("Patient ID not found. Please log in again.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
        <p className="text-gray-600 mb-6">Are you a new or existing patient?</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/new-patient")}
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            New Patient
          </button>

          <button
            onClick={handleExistingPatientClick}
            className="w-full bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition"
          >
            Existing Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientSelection;
