import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const PatientProfilePage = () => {
  const { user } = useAuth(); // Get user data from context
  const [diagnosed, setDiagnosed] = useState(null); // Keep track of diagnosed status
  const [error, setError] = useState(null);
  const [clinicalHistory, setClinicalHistory] = useState(""); // For clinical history input
  const [previousAssessments, setPreviousAssessments] = useState([]); // Store previous assessments
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setError("");
      return;
    }

    const fetchProfile = async () => {
      const email = user.email; // Get email from authenticated user
      const API_BASE_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(`${API_BASE_URL}patient/profile?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setDiagnosed(data.diagnosed);
          if (data.diagnosed) {
            // Fetch clinical history or other necessary info
            const historyResponse = await fetch(`${API_BASE_URL}clinical-history?email=${email}`);
            const historyData = await historyResponse.json();
            if (historyResponse.ok) {
              setClinicalHistory(historyData.history || "");
            }
          } else {
            // Fetch previous assessments
            const assessmentsResponse = await fetch(`${API_BASE_URL}previous-assessments?email=${email}`);
            const assessmentsData = await assessmentsResponse.json();
            if (assessmentsResponse.ok) {
              setPreviousAssessments(assessmentsData.assessments || []);
            }
          }
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleClinicalHistoryChange = (e) => {
    setClinicalHistory(e.target.value);
  };

  const handleSubmitClinicalHistory = async () => {
    const email = user.email; // Get email from authenticated user
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${API_BASE_URL}update-clinical-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, history: clinicalHistory }),
      });
      const data = await response.json();
      if (response.ok) {
        setError(null); // Clear any previous errors
        alert("Clinical history updated successfully!");
      } else {
        setError(data.message || "Error updating clinical history");
      }
    } catch (error) {
      setError("Unable to update clinical history.");
    }
  };

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Patient Profile</h1>
      {diagnosed ? (
        <div>
          <h2>Update Clinical History</h2>
          <textarea
            value={clinicalHistory}
            onChange={handleClinicalHistoryChange}
            rows="6"
            placeholder="Enter your clinical history here..."
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleSubmitClinicalHistory}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Save Clinical History
          </button>
        </div>
      ) : (
        <div>
          <h2>View Previous Assessments</h2>
          {previousAssessments.length > 0 ? (
            <ul>
              {previousAssessments.map((assessment, index) => (
                <li key={index}>
                  <strong>{assessment.date}</strong>: {assessment.details}
                </li>
              ))}
            </ul>
          ) : (
            <p>No previous assessments available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientProfilePage;
