// DPAssessmentResultPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResultBox({ assessment }) {
  const riskColors = {
    High: "bg-red-500",
    Medium: "bg-orange-500",
    Low: "bg-green-500"
  };

  return (
    <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-blue-700 font-bold">RISK PREDICTION - YOUR RESULTS</h2>

      <div className={`mt-4 p-4 rounded ${
        riskColors[assessment?.risk_level] || "bg-gray-400"
      } text-white`}>
        <div className="text-xl font-semibold">{assessment?.stage}</div>
        <div className="text-sm">YOUR CKD STAGE</div>
        <div className="mt-3 text-3xl font-bold">{assessment?.risk_percent}%</div>
        <div className="mt-2 font-semibold">
          You are at a {assessment?.risk_level?.toLowerCase() || "N/A"} risk
        </div>
      </div>

      <div className="mt-4 text-left">
        <h3 className="font-semibold">Patient info</h3>
        <p>Name: {assessment?.patient_name || "N/A"}</p>
        <p>Age: {assessment?.age || "N/A"}  
           Gender: {assessment?.gender || "N/A"}
        </p>
        <p>
          eGFR: {assessment?.egfr || "N/A"}  
          Creatinine: {assessment?.creatinine || "N/A"} {assessment?.creatinine_unit}
        </p>
      </div>

      <div className="mt-4 text-left">
        <h3 className="font-semibold">Recommendations</h3>
        <pre className="whitespace-pre-wrap">{assessment?.recommendations}</pre>
      </div>

      {assessment?.image_path && (
        <div className="mt-4">
          <img src={assessment.image_path} alt="uploaded" className="max-w-full rounded shadow" />
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <a 
            href={`${process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api"}/diagnosed-assessments/${assessment?.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            Download PDF
        </a>

      </div>
    </div>
  );
}

export default function DPAssessmentResultPage() {
  const { assessment_id } = useParams();
  const [assessment, setAssessment] = useState(null);
  console.log("PARAM ID =", assessment_id);
  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000/api/"}diagnosed-assessments/${assessment_id}`);
        setAssessment(res.data.assessment);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [assessment_id]);

  if (!assessment) return <div className="p-6">Loading...</div>;
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <ResultBox assessment={assessment} />
    </div>
  );
}
