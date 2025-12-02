import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patient_id:"",
    patient_name: "",
    patient_contact: "",
    reason: "",
    // doctor_email: "maryamamshi65@gmail.com" doctor_email: "hauwa.amshi@gmail.com"
    doctor_email: "hauwa.amshi@gmail.com"
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  if (!localStorage.getItem("patient_id")) {
  toast.error("You are not logged in. Please log in first.");
  return;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      patient_id: Number(localStorage.getItem("patient_id")),  // <<< important fix
      patient_name: formData.patient_name,
      patient_contact: formData.patient_contact,
      reason: formData.reason,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      time: selectedTime ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
      doctor_email: "hauwa.amshi@gmail.com"
    };

    const API_BASE_URL = process.env.REACT_APP_API_URL; 

    const res = await fetch(`${API_BASE_URL}schedule-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });


    await res.json();
    toast.success("Appointment scheduled successfully and Email sent to doctor.");
    // alert(data.message);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Schedule an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Email / Phone
            </label>
            <input
              type="text"
              name="patient_contact"
              value={formData.patient_contact}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="0703..."
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Choose appointment date"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Select Time
            </label>
            <DatePicker
              selected={selectedTime}
              onChange={setSelectedTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Choose appointment time"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Describe your symptoms or reason..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Scheduling..." : "Schedule Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
