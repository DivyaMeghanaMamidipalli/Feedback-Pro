import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PublicFormPage from './pages/PublicFormPage';
import CreateFormPage from './pages/CreateFormPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
        <Routes>
          <Route path="/form/:formId" element={<PublicFormPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/create" element={<CreateFormPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;