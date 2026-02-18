import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerificationCode from './pages/VerificationCode';
import SetNewPassword from './pages/SetNewPassword';
import PasswordSuccess from './pages/PasswordSuccess';
import AccountSuccess from './pages/AccountSuccess';
import Dashboard from './pages/Dashboard';
import Protocol from './pages/Protocol';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import AIMatching from './pages/AIMatching';
import PatientDetails from './pages/PatientDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerificationCode />} />
          <Route path="/reset-password" element={<SetNewPassword />} />
          <Route path="/password-success" element={<PasswordSuccess />} />
          <Route path="/account-success" element={<AccountSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-matching" element={<AIMatching />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
