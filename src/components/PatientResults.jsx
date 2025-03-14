import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const PatientResults = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/assessments/${patientId}`);
        // console.log("Full API Response:", response.data); // Log the full response
    
        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstAssessment = response.data[0]; // Access the first item in the array
          // console.log("First Assessment Object:", firstAssessment);
          setAssessment(firstAssessment);
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

  
  // console.log("Created At:", assessment.risk_category);


  // Risk level indicator styling
  const riskColors = {
    "Red (Very High Risk)": "bg-red-500", // Critical risk should be red
    "Orange (High Risk)": "bg-orange-500",
    "Yellow (Moderate Risk)": "bg-yellow-500", // Moderate risk should be yellow
    "Light Green (Mild Risk)": "bg-green-300",
    "Green (Low Risk)": "bg-green-500", // Stable should be green
  };

  // Extract patient name (modify based on your API response structure)
  const patientName = assessment?.responses?.name || "Patient";

  return (
    <>
      {/* Navbar at the top outside the content container */}
      <Navbar patientName={patientName} />

      {/* Main content container */}
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Assessment Results</h2>

        {/* Patient Details */}
        <div className="mb-6 text-center">
          <p className="text-gray-700 font-semibold">
            Created_at Date: {assessment.created_at ? new Date(assessment.created_at).toLocaleDateString() : "Not Available"}
          </p>
          <p className="text-gray-700 font-semibold">
            Updated_at Date: {assessment?.updated_at || "Not Available"}
          </p>
        </div>

        {/* Risk Indicator */}
{assessment ? (
  <div className={`p-4 rounded-md text-white text-center ${riskColors[assessment.risk_category] || "bg-gray-500"}`}>
    <h3 className="text-lg font-semibold">
      Risk Level: {assessment.risk_category || "Not Available"}
    </h3>
    <p>
      Probability: 
      <span className="font-bold">
        {assessment.risk_score !== undefined
          ? (assessment.risk_score).toFixed(0) + "%"
          : "Not Available"}
      </span>
    </p>
  </div>
) : (
  <p>Loading risk assessment...</p>
)}

        {/* AI-Powered Recommendations */}
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc list-inside text-gray-700">
            {Array.isArray(assessment.recommendations)
              ? assessment.recommendations.map((rec, index) => <li key={index}>{rec}</li>)
              : <li>{assessment.recommendations || "No recommendations available"}</li>
            }
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/assessment")}>
            New Assessment
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate("/teleconsultation")}>
            Consult a Doctor
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientResults;