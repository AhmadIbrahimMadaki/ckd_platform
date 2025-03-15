import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Assessments = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patient_id: null,
    responses: {},
    is_draft: true,
  });
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPatientData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("User not authenticated. Redirecting to login...");
        navigate("/login");
        return;
      }
      const user = JSON.parse(storedUser);
      if (!user?.id) {
        toast.error("User not authenticated. Redirecting to login...");
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}patient/${user.id}`);
        const data = await response.json();
        if (response.ok && data.patient_id) {
          setFormData((prev) => ({ ...prev, patient_id: data.patient_id }));
          const draftResponse = await fetch(`${API_BASE_URL}assessments/draft/${data.patient_id}`);
          const draftData = await draftResponse.json();
          if (draftResponse.ok && draftData.responses) {
            toast.info("Resuming your saved draft...");
            setFormData((prev) => ({
              ...prev,
              responses: { ...prev.responses, ...draftData.responses },
            }));
            if (draftData.last_step) {
              setCurrentStep(draftData.last_step);
            }
          }
        } else {
          toast.error("Patient data not found. Redirecting...");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Unable to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [API_BASE_URL, navigate]);

  const steps = [
    { id: 1, question: "Do you experience swelling in your feet, ankles, or hands that does not go away easily?", field: "swelling", options: ["A) No swelling ", "B) Mild, occasional swelling  ", "C) Frequent swelling, but manageable", "D) Severe swelling that affects daily activities"] },
    { id: 2, question: "Have you noticed changes in your urination pattern (e.g., foamy urine, frequent urination at night, very little urine output)?", field: "urination_changes", options: ["A) No changes", " B) Slight increase in urination at night", "C) Foamy urine or noticeable decrease in urine output ", "D) Very little or almost no urine output"] },
    { id: 3, question: "Do you often feel extreme tiredness, dizziness, or shortness of breath without exertion?", field: "fatigue", options: ["A) Rarely or never", "B) Occasionally, but not severe", "C) Frequently, making daily tasks harder", "D) Almost all the time, making normal activities difficult"] },
    { id: 4, question: "What is your current blood pressure level?", field: "blood_pressure", options: ["A) Normal", "B) Slightly elevated", "C) High", "D) Very high"] },
    { id: 5, question: "Do you have diabetes or high blood sugar levels (above 126 mg/dL fasting or above 200 mg/dL after eating)?", field: "diabetes", options: ["A) No, and never had high blood sugar", "B) Borderline or prediabetic levels", "C) Diagnosed diabetes, but controlled", "D) Uncontrolled diabetes with frequent high sugar readings"] },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      responses: {
        ...prev.responses,
        [field]: value, // Store the full selected option
      },
    }));
  };
  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (isDraft) => {
    try {
      const response = await fetch(`${API_BASE_URL}assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          is_draft: isDraft,  // Include draft status
        }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Server error");
  
      if (isDraft) {
        toast.success("Draft saved successfully!");
        navigate("/undiagnosed-dashboard");
      } else {
        toast.success("Assessment submitted successfully!");
  
        // Fetch patient ID for results page
        const storedUser = localStorage.getItem("user");
        const user = JSON.parse(storedUser);
        const patientResponse = await fetch(`${API_BASE_URL}patient/${user.id}`);
        const patientData = await patientResponse.json();
  
        navigate(`/patientresults/${patientData.patient_id}`);
      }
    } catch (error) {
      toast.error("You must take the assessment/Unable to connect to the server.");
    }
  };
  
  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Patient Assessment</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 font-semibold">Step {currentStep} of {steps.length}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">{steps[currentStep - 1]?.question}</h2>
        <select
          className="w-full border p-2 rounded"
          value={formData.responses?.[steps[currentStep - 1]?.field] || ""}
          onChange={(e) => handleChange(steps[currentStep - 1]?.field, e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          {steps[currentStep - 1]?.options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded" onClick={handlePrevious}>Previous</button>
        )}
        {currentStep < steps.length ? (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
        ) : (
          <div className="flex gap-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleSubmit(false)}>Submit</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => handleSubmit(true)}>Save Draft</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;
