import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UnknownCKDForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    frequent_urination: "",
    swelling: "",
    high_blood_pressure: "",
    fatigue: "",
    family_history: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to calculate risk score
  const calculateRiskScore = () => {
    let score = 0;
    if (formData.frequent_urination === "yes") score += 20;
    if (formData.swelling === "yes") score += 20;
    if (formData.high_blood_pressure === "yes") score += 15;
    if (formData.fatigue === "yes") score += 10;
    if (formData.family_history === "yes") score += 20;
    return score;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const score = calculateRiskScore();
      setResult(score);

      if (score >= 70) {
        // Redirect to CKD Assessment Form if high risk
        navigate("/patient/assessments");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">CKD Risk Check</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Do you experience frequent urination?
          </label>
          <select name="frequent_urination" value={formData.frequent_urination} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Do you have swelling in your legs or feet?
          </label>
          <select name="swelling" value={formData.swelling} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Have you been diagnosed with high blood pressure?
          </label>
          <select name="high_blood_pressure" value={formData.high_blood_pressure} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Do you feel fatigue or weakness often?
          </label>
          <select name="fatigue" value={formData.fatigue} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Do you have a family history of CKD?
          </label>
          <select name="family_history" value={formData.family_history} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Processing..." : "Check Risk"}
        </button>
      </form>

      {/* Display Result */}
      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Assessment Result:</h3>
          {result >= 70 ? (
            <p className="text-red-600 font-bold">You may be at risk for CKD. Proceeding to detailed assessment...</p>
          ) : (
            <div>
              <p className="text-green-600 font-bold">Your risk level is low. Here's how you can stay healthy:</p>
              <ul className="list-disc ml-5 text-gray-700">
                <li>Stay hydrated and drink enough water daily.</li>
                <li>Eat a balanced diet with low sodium.</li>
                <li>Avoid smoking and alcohol consumption.</li>
                <li>Exercise regularly to maintain kidney health.</li>
                <li>Monitor your blood pressure and sugar levels.</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnknownCKDForm;
