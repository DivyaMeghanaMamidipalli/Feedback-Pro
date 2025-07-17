import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import PublicFormPage from './pages/PublicFormPage';
import CreateFormPage from './pages/CreateFormPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegisterPage from './pages/AdminRegisterPage';
import ResponseViewPage from './pages/ResponseViewPage';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Public Routes */}
          <Route path="/form/:formId" element={<PublicFormPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<CreateFormPage />} />
          <Route path="/admin/forms/responses/:formId" element={<ResponseViewPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;