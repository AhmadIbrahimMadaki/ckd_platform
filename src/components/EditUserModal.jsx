import React, { useState, useEffect } from "react";

const EditUserModal = ({ user, onClose, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    user_type: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        user_type: user.user_type || "",
        password: "", // Empty by default — admin can choose to set
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };

    // If password field is empty, remove it from update payload
    if (!formData.password) {
      delete updatedUser.password;
    }

    onUpdateUser(updatedUser);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
        />
        <select
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="consultant">Consultant</option>
          <option value="patient">Patient</option>
        </select>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          placeholder="New Password (optional)"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

// import React, { useState } from "react";

// const EditUserModal = ({ user, onClose, onUpdateUser }) => {
//   const [formData, setFormData] = useState({ ...user });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onUpdateUser(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow w-96">
//         <h2 className="text-xl font-bold mb-4">Edit User</h2>
//         <input
//           type="text"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//           placeholder="Full Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//           placeholder="Email"
//         />
//         <div className="flex justify-end">
//           <button
//             className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={handleSubmit}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;
