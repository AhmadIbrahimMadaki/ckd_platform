import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import PatientProfilePage from "./components/PatientProfilePage";
import "react-datepicker/dist/react-datepicker.css";

// import ClinicalHistoryPage from "./components/ClinicalHistoryPage";
import AssessmentsPage from "./components/AssessmentsPage";
import Assessments from "./components/Assessments/assessment";
import UndiagnosedDashboard from "./components/UndiagnosedDashboard ";
import AdminDashboard from "./components/AdminDashboard";
import Resources from "./components/Resources";
import PatientResults from "./components/PatientResults";
import Teleconsultation from "./components/Teleconsultation";
import Pharmacy  from "./components/pharmacy";
import Appointments  from "./components/appointments";
import PatientSelection from "./components/PatientSelection";
import NewPatientPage from "./components/NewPatientPage";
import UnknownCKDForm from "./components/UnknownCKDForm";
import LandingPageDP from "./components/LandingPageDP";
import DPAssessment from "./components/DPAssessment";
import DPAssessmentResultPage from "./components/DPAssessmentResultPage";
import AppointmentForm from "./components/AppointmentForm";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// ✅ Import your dropdown-based selector
import LanguageSelector from "./components/LanguageSelector";
import Layout from "./components/Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/resources" element={<Resources />} />
      {/* <Route path="/patient/clinical-history" element={<ProtectedRoute element={<ClinicalHistoryPage />} />} /> */}
      <Route path="/patient/assessments" element={<ProtectedRoute element={<AssessmentsPage />} />} />
      <Route path="/assessment" element={<ProtectedRoute element={<Assessments />} />} />
      <Route path="/undiagnosed-dashboard" element={<ProtectedRoute element={<UndiagnosedDashboard />} />} />
      <Route path="/teleconsultation" element={<ProtectedRoute element={<Teleconsultation />} />} />
      <Route path="/pharmacy/:patientId" element={<ProtectedRoute element={<Pharmacy />} />} />
      <Route path="/appointments" element={<ProtectedRoute element={<Appointments />} />} />
      <Route path="/patientresults/:patientId" element={<ProtectedRoute element={<PatientResults />} />} />
      <Route path="/patientselection" element={<ProtectedRoute element={<PatientSelection />} />} />
      <Route path="/new-patient" element={<ProtectedRoute element={<NewPatientPage />} />} />
      <Route path="/unknown-ckd" element={<ProtectedRoute element={<UnknownCKDForm />} />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
      <Route path="/landingPageDP" element={<ProtectedRoute element={<LandingPageDP />} />} />
      <Route path="/DPAssessment" element={<ProtectedRoute element={<DPAssessment />} />} />
      <Route path="/diagnosed-result/:assessment_id" element={<ProtectedRoute element={<DPAssessmentResultPage />} />} />
      <Route path="/schedule" element={<ProtectedRoute element={<AppointmentForm />} />} />
    </Routes>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <div className="p-4">
            <ToastContainer />
            {/* ✅ Place LanguageSelector globally */}
            <LanguageSelector />
            <AppRoutes />
            <PatientProfilePage />
          </div>
        </Router>
      </AuthProvider>
      <Layout/>
    </I18nextProvider>
  );
}

export default App;
