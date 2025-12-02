// export default function DPAssessment() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100 px-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
//         <h2 className="text-center text-2xl font-bold mb-6 text-blue-700">
//           Patient Risk Prediction
//         </h2>

//         {/* FORM */}
//         <div className="space-y-4">
//           {/* Age */}
//           <div>
//             <label className="block mb-1 font-medium">Age (years)</label>
//             <input
//               type="number"
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Enter age"
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block mb-1 font-medium">Gender</label>
//             <select className="w-full border px-3 py-2 rounded">
//               <option>Male</option>
//               <option>Female</option>
//             </select>
//           </div>

//           {/* eGFR */}
//           <div>
//             <label className="block mb-1 font-medium">eGFR (ml/min/1.73m²)</label>
//             <input
//               type="number"
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Enter eGFR"
//             />
//           </div>

//           {/* Divider section */}
//           <div className="border p-3 rounded bg-blue-50">
//             <p className="font-medium mb-3">
//               If the patient doesn't know their eGFR, enter the following:
//             </p>

//             {/* Race */}
//             <div className="mb-3">
//               <label className="block mb-1 font-medium">Race</label>
//               <select className="w-full border px-3 py-2 rounded">
//                 <option>Asian</option>
//                 <option>Black</option>
//                 <option>Caucasian</option>
//                 <option>Other</option>
//               </select>
//             </div>

//             {/* Creatinine */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block mb-1 font-medium">Creatinine</label>
//                 <input
//                   type="number"
//                   className="w-full border px-3 py-2 rounded"
//                   placeholder="Enter creatinine"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Unit</label>
//                 <select className="w-full border px-3 py-2 rounded">
//                   <option>mg/dL</option>
//                   <option>µmol/L</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* NEXT BUTTON */}
//           <button
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md font-medium"
//             onClick={() => alert("Proceeding to next step...")}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// DPAssessment.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function DPAssessment() {
  const [form, setForm] = useState({
    patient_name: "",
    age: "",
    gender: "Male",
    egfr: "",
    creatinine: "",
    creatinine_unit: "mg/dL",
    race: "Black"
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { assessment_id } = useParams();

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);

      const res = await axios.post(`${API}diagnosed-assessments`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const assessment = res.data.assessment
      toast.success("Assessment saved!");
      // navigate to result page — pass id
      console.log(assessment_id);
      navigate(`/diagnosed-result/${assessment.id}`, { replace: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-blue-700">Patient Risk Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="patient_name" value={form.patient_name} onChange={handleChange} placeholder="Patient name" className="w-full border p-2 rounded" />
          <div className="grid grid-cols-2 gap-3">
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="border p-2 rounded" />
            <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>

          <input name="egfr" value={form.egfr} onChange={handleChange} placeholder="eGFR (ml/min/1.73m2)" className="w-full border p-2 rounded" type="number" step="any" />
          <div className="grid grid-cols-3 gap-3">
            <input name="creatinine" value={form.creatinine} onChange={handleChange} placeholder="Creatinine" className="border p-2 rounded" type="number" step="any" />
            <select name="creatinine_unit" value={form.creatinine_unit} onChange={handleChange} className="border p-2 rounded">
              <option>mg/dL</option><option>µmol/L</option>
            </select>
            <select name="race" value={form.race} onChange={handleChange} className="border p-2 rounded">
              <option>Black</option><option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Upload image (optional)</label>
            <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])} />
            <p className="text-xs text-gray-500">You can also test with the example image file at <code>/mnt/data/WhatsApp Image 2025-11-19 at 19.40.58.jpeg</code></p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded">
            {loading ? "Saving..." : "Submit & Compute"}
          </button>
        </form>
      </div>
    </div>
  );
}
