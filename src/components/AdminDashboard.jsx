import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditUserModal from "./EditUserModal";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    diagnosedPatients: 0,
    undiagnosedPatients: 0,
    totalConsultants: 0
  });

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}admin/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch stats.");
      });

    fetch(`${API_BASE_URL}admin/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      });
  }, [API_BASE_URL]);

  // Delete user
  const handleDelete = (userId) => {
    fetch(`${API_BASE_URL}admin/users/${userId}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      });
  };

  // Open edit modal
  const handleEdit = (user) => {
    // console.log("Edit clicked for user:", user); // Debug
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Update user
  const handleUserUpdate = (updatedUser) => {
    fetch(`${API_BASE_URL}admin/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user.");
        return res.json();
      })
      .then((data) => {
        toast.success("User updated successfully.");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setIsModalOpen(false); // Close modal
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user.");
      });
  };

  // Render user list
  const renderUsers = () => {
    return users.map((user) => (
      <div key={user.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow mb-2">
        <div>
          <h3 className="font-semibold">{user.full_name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
            onClick={() => handleEdit(user)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token"); // or sessionStorage.removeItem
            toast.success("Logged out successfully");
            window.location.href = "/login"; // Redirect to login page
         }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Patients</h3>
          <p className="text-2xl">{stats.totalPatients}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-lg font-semibold">Diagnosed Patients</h3>
          <p className="text-2xl">{stats.diagnosedPatients}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-lg font-semibold">Undiagnosed Patients</h3>
          <p className="text-2xl">{stats.undiagnosedPatients}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-md text-center">
          <h3 className="text-lg font-semibold">Consultants</h3>
          <p className="text-2xl">{stats.totalConsultants}</p>
        </div>
      </div>

      {/* User List */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        {renderUsers()}
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedUser && (
  <>
    {console.log("Opening modal for user:", selectedUser)}
    <EditUserModal
      user={selectedUser}
      onClose={() => setIsModalOpen(false)}
      onUpdateUser={handleUserUpdate}
    />
  </>
)}

    </div>
  );
};

export default AdminDashboard;
