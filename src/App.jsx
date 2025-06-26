import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import RoleSelectionPage from './components/RoleSelectionPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPassword';
import TeacherSignUpPage from './components/TeacherSignUpPage';
import AdminPanel from './components/AdminPanel';
import Dashboard from './pages/Dashboard';
import MarksUpload from './pages/MarksUpload';
import Queries from './pages/Queries';
import FAMode from './pages/FAMode';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/signup', '/signup/teacher', '/forgot-password'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
};

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        {/* Pages without Navbar */}
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/teacher" element={<TeacherSignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminPanel />} />

        {/* Pages with Navbar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marks-upload" element={<MarksUpload />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/fa-mode" element={<FAMode />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
