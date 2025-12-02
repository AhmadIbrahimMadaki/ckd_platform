// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Navbar from "../components/Navbar";

// const PatientResults = () => {
//   const { patientId } = useParams();
//   const navigate = useNavigate();
//   const [assessment, setAssessment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");


//   useEffect(() => {
//     const fetchResults = async () => {
//       const API_BASE_URL = process.env.REACT_APP_API_URL;
//       try {
//         const response = await axios.get(`${API_BASE_URL}assessments/${patientId}`);
//         // console.log("Full API Response:", response.data); // Log the full response
    
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           const firstAssessment = response.data[0]; // Access the first item in the array
//           // console.log("First Assessment Object:", firstAssessment);
//           setAssessment(firstAssessment);
//         } else {
//           setError("No assessment data found.");
//           toast.error("No assessment available.");
//         }
//       } catch (err) {
//         setError("Error fetching assessment results.");
//         toast.error("Failed to load results.");
//       } finally {
//         setLoading(false);
//       }
//     };
    
    

//     fetchResults();
//   }, [patientId]);

//   if (loading) return <p className="text-center text-gray-600">Loading assessment results...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

  
//   // console.log("Created At:", assessment.risk_category);


//   // Risk level indicator styling
//   const riskColors = {
//     "Red (Very High Risk)": "bg-red-500", // Critical risk should be red
//     "Orange (High Risk)": "bg-orange-500",
//     "Yellow (Moderate Risk)": "bg-yellow-500", // Moderate risk should be yellow
//     "Light Green (Mild Risk)": "bg-green-300",
//     "Green (Low Risk)": "bg-green-500", // Stable should be green
//   };

//   // Extract patient name (modify based on your API response structure)
//   const patientName = assessment?.responses?.name || "Patient";

//   return (
//     <>
//       {/* Navbar at the top outside the content container */}
//       <Navbar patientName={patientName} />

//       {/* Main content container */}
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-bold text-center mb-4">Assessment Results</h2>

//         {/* Patient Details */}
//         <div className="mb-6 text-center">
//           <p className="text-gray-700 font-semibold">
//             Created_at Date: {assessment.created_at ? new Date(assessment.created_at).toLocaleDateString() : "Not Available"}
//           </p>
//           <p className="text-gray-700 font-semibold">
//             Updated_at Date: {assessment?.updated_at || "Not Available"}
//           </p>
//         </div>

//         {/* Risk Indicator */}
// {assessment ? (
//   <div className={`p-4 rounded-md text-white text-center ${riskColors[assessment.risk_category] || "bg-gray-500"}`}>
//     <h3 className="text-lg font-semibold">
//       Risk Level: {assessment.risk_category || "Not Available"}
//     </h3>
//     <p>
//       Probability: 
//       <span className="font-bold">
//         {assessment.risk_score !== undefined
//           ? (assessment.risk_score).toFixed(0) + "%"
//           : "Not Available"}
//       </span>
//     </p>
//   </div>
// ) : (
//   <p>Loading risk assessment...</p>
// )}

//         {/* AI-Powered Recommendations */}
//         <div className="mt-6 bg-gray-100 p-4 rounded-md">
//           <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {Array.isArray(assessment.recommendations)
//               ? assessment.recommendations.map((rec, index) => <li key={index}>{rec}</li>)
//               : <li>{assessment.recommendations || "No recommendations available"}</li>
//             }
//           </ul>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex justify-between mt-6">
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/assessment")}>
//             New Assessment
//           </button>
//           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate("/teleconsultation")}>
//             Consult a Doctor
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PatientResults;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PatientResults = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${API_BASE_URL}assessments/${patientId}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAssessment(response.data[0]);
        } else {
          setError("No assessment data found.");
          toast.error("No assessment available.");
        }
      } catch (err) {
        setError("Error fetching assessment results.");
        toast.error("Failed to load results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [patientId]);

  if (loading) return <p className="text-center text-gray-600">Loading assessment results...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Risk level indicator styling
  const riskColors = {
    "Red (Very High Risk)": "bg-red-500",
    "Orange (High Risk)": "bg-orange-500",
    "Yellow (Moderate Risk)": "bg-yellow-400",
    "Light Green (Mild Risk)": "bg-green-300",
    "Green (Low Risk)": "bg-green-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-600">CKD Assessment Results</h1>
        <p className="text-gray-500">Your personalized kidney health analysis</p>
      </div>

      {/* Risk Level */}
      {assessment && (
        <div
          className={`w-full max-w-md p-6 rounded-xl shadow-md text-white text-center ${riskColors[assessment.risk_category] || "bg-gray-500"}`}
        >
          <h2 className="text-xl font-semibold">Risk Level</h2>
          <p className="text-lg">{assessment.risk_category || "Not Available"}</p>
          <p className="mt-2">
            Probability:{" "}
            <span className="font-bold">
              {assessment.risk_score !== undefined
                ? assessment.risk_score.toFixed(0) + "%"
                : "Not Available"}
            </span>
          </p>
        </div>
      )}

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
        <button
          onClick={() => navigate("/landingPageDP")}
          className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50"
        >
          <div className="text-blue-600 text-3xl mb-2">🤖</div>
          <p className="font-semibold">AI Symptom Checker</p>
        </button>
        <button
          onClick={() => navigate("/teleconsultation")}
          className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50"
        >
          <div className="text-green-600 text-3xl mb-2">👨‍⚕️</div>
          <p className="font-semibold">Talk to a Doctor</p>
        </button>
        <button
          onClick={() => navigate(`/pharmacy/${patientId}`)}
          className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50"
        >
          <div className="text-purple-600 text-3xl mb-2">💊</div>
          <p className="font-semibold">Pharmacy & Prescriptions</p>
        </button>
        <button
          onClick={() => navigate("/appointments")}
          className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50"
        >
          <div className="text-orange-600 text-3xl mb-2">📅</div>
          <p className="font-semibold">Appointments</p>
        </button>
      </div>

      {/* Recommendations */}
      <div
        className={`w-full max-w-md shadow-md rounded-xl p-6 mt-8 text-white transition-all duration-300 
        ${riskColors[assessment.risk_category] || "bg-gray-500"}`}
      >
        <h3 className="text-lg font-bold mb-2">
          AI Recommendations
          
        </h3>

        <ul className="list-disc list-inside text-left text-white/90">
          {Array.isArray(assessment.recommendations)
            ? assessment.recommendations.map((rec, index) => (
                <li key={index} className="mb-1">
                  {rec}
                </li>
              ))
            : (
              <li>{assessment.recommendations || "No recommendations available"}</li>
            )}
        </ul>
      </div>

    </div>
  );
};

export default PatientResults;
