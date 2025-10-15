import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();

  // Sample appointments (replace with API later) [appointments, setAppointments]
  const [appointments] = useState([
    { id: 1, doctor: "Dr. Ahmed", date: "2025-09-20", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Maryam", date: "2025-09-25", time: "2:00 PM" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-orange-600">Appointments</h1>
        <p className="text-gray-500">Manage your doctor appointments</p>
      </div>

      {/* Appointment List */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-lg font-bold mb-4 text-orange-600">Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-4 mb-3 border rounded-lg shadow-sm hover:shadow-md bg-gray-50"
            >
              <p className="font-semibold">{appt.doctor}</p>
              <p className="text-sm text-gray-600">Date: {appt.date}</p>
              <p className="text-sm text-gray-600">Time: {appt.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments scheduled.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={() => alert("New appointment booking feature coming soon!")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointments;
