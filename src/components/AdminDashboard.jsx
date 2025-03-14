import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    diagnosedPatients: 0,
    undiagnosedPatients: 0,
    totalConsultants: 0
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch stats and users from API
    fetch("http://127.0.0.1:5000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch stats.");
      });

    fetch("http://127.0.0.1:5000/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      });
  }, []);

  // Handle user deletion
  const handleDelete = (userId) => {
    fetch(`http://127.0.0.1:5000/api/admin/users/${userId}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      });
  };

  // Render user list
  const renderUsers = () => {
    return users.map((user) => (
      <div key={user.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow mb-2">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
            onClick={() => alert("Edit user functionality goes here")}
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
    </div>
  );
};

export default AdminDashboard;
