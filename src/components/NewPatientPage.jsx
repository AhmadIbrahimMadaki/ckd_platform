import { useNavigate } from "react-router-dom";

const NewPatientPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">New Patient Registration</h2>
        <p className="text-gray-700 text-center mb-6">
          Does the patient already have a CKD diagnosis?
        </p>

        {/* Buttons for options */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/patient/assessments")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Yes, CKD is Confirmed
          </button>

          <button
            onClick={() => navigate("/unknown-ckd")}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Not Sure, Check CKD Risk
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPatientPage;
