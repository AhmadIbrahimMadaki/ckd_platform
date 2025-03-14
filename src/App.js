import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import PatientProfilePage from "./components/PatientProfilePage";
import ClinicalHistoryPage from "./components/ClinicalHistoryPage";
import AssessmentsPage from "./components/AssessmentsPage";
import Assessments from "./components/Assessments/assessment";
import UndiagnosedDashboard from "./components/UndiagnosedDashboard ";
import AdminDashboard from "./components/AdminDashboard";
import Resources from "./components/Resources";
import PatientResults from "./components/PatientResults";
import Teleconsultation from "./components/Teleconsultation";
import PatientSelection from "./components/PatientSelection";
import NewPatientPage from "./components/NewPatientPage";
import UnknownCKDForm from "./components/UnknownCKDForm";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resources" element={<Resources />} />
          {/* <Route path="/teleconsultation"  element={<Teleconsultation />} /> */}

          {/* Protected Routes (Only Logged-in Users) */}
          <Route path="/patient/clinical-history" element={<ProtectedRoute element={<ClinicalHistoryPage />} />} />
          <Route path="/patient/assessments" element={<ProtectedRoute element={<AssessmentsPage />} />} />
          <Route path="/assessment" element={<ProtectedRoute element={<Assessments />} />} />
          <Route path="/undiagnosed-dashboard" element={<ProtectedRoute element={<UndiagnosedDashboard />} />} />
          <Route path="/teleconsultation" element={<ProtectedRoute element={<Teleconsultation />} />} />
          <Route path="/patientresults/:patientId" element={<ProtectedRoute element={<PatientResults />} />} />
          <Route path="/patientselection" element={<ProtectedRoute element={<PatientSelection />} />} />
          <Route path="/new-patient" element={<ProtectedRoute element={<NewPatientPage />} />} />
          <Route path="/unknown-ckd" element={<ProtectedRoute element={<UnknownCKDForm />} />} />

          {/* Admin-Only Route */}
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
        </Routes>

        {/* Wrap the Profile Page in AuthProvider */}
        <AuthProvider>
          <PatientProfilePage />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
