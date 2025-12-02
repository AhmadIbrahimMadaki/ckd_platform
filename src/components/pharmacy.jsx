import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Pharmacy = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [recommendations, setRecommendations] = useState("");
  const [riskCategory, setRiskCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch prescriptions (AI recommendation + medicines)
  useEffect(() => {
  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}assessments/${patientId}`);
      // console.log("Full API response:", response.data);

      // If backend wraps the data inside "assessment"
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      // console.log("Full API response/data:", data.recommendations);

      setMedicines(data?.medicines ?? []);
      setRecommendations(data?.recommendations ?? "No recommendations available.");
      setRiskCategory(data?.risk_category ?? "Unknown");


    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      toast.error("Failed to fetch prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  fetchPrescriptions();
}, [API_BASE_URL, patientId]);

  // Order medicines
  // const handleOrder = async () => {
  //   if (medicines.length === 0) {
  //     toast.error("No medicines to order.");
  //     return;
  //   }

  //   setOrdering(true);
  //   try {
  //     window.open("https://share.google/EDJvuhNX6shDUG3AJ", "_blank"); // open in new tab
  //     await axios.post(`${API_BASE_URL}orders`, {
  //       patientId,
  //       medicines,
  //     });
  //     toast.success("Your medicine order is in process");
      
  //     navigate("/appointments"); // redirect after ordering
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to place order.");
  //   } finally {
  //     setOrdering(false);
  //   }
  // };

  if (loading) return <p className="text-center text-gray-600">Loading prescriptions...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-purple-600">Pharmacy & Prescriptions</h1>
        <p className="text-gray-500">Your AI-based treatment guidance</p>
      </div>

      {/* Risk & Recommendations */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-lg font-bold text-purple-600">AI Recommendations</h2>
        <p className="text-gray-600 mt-2">
          <strong>Risk Level:</strong> {riskCategory}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>Advice:</strong> {recommendations}
        </p>
      </div>

      {/* Medicines List */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-lg font-bold mb-4 text-purple-600">Prescribed Medicines</h2>
        {medicines.length > 0 ? (
          medicines.map((m, index) => (
            <div
              key={index}
              className="p-4 mb-3 border rounded-lg shadow-sm hover:shadow-md bg-gray-50"
            >
              <p className="font-semibold">{m.name || m.medicine_name}</p>
              <p className="text-sm text-gray-600">Dosage: {m.dosage}</p>
              <p className="text-sm text-gray-600">Frequency: {m.frequency}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No medicines available.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={() => navigate(`/patientresults/${patientId}`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={() => {
            setOrdering(true);
            setTimeout(() => {
              window.open("https://share.google/EDJvuhNX6shDUG3AJ", "_blank");
              setOrdering(false);
            }, 1000); // simulate small delay
          }}
          disabled={ordering}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {ordering ? "Placing Order..." : "Order Medicines"}
        </button>

        {/* <button
          onClick={handleOrder}
          disabled={ordering}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {ordering ? "Placing Order..." : "Order Medicines"}
        </button> */}
      </div>
    </div>
  );
};

export default Pharmacy;
