// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function AdminDashboard() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    apiClient.get('/admin/my-forms/')
      .then(res => {
        setForms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch forms:", err);
        if (err.response && err.response.status === 401) {
             navigate('/admin/login');
        }
        setLoading(false);
      });
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="text-center p-10">Loading Dashboard...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 border-b pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">My Forms</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Link 
              to="/admin/create"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors text-center sm:w-auto w-full"
            >
              + New Form
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors sm:w-auto w-full"
            >
              Logout
            </button>
          </div>
        </div>

      
      <div className="space-y-4">
        {forms.length > 0 ? (
          forms.map(form => (
            <div key={form.id} className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/admin/forms/responses/${form.id}`} className="block">
                <h2 className="text-xl font-semibold text-blue-700 hover:underline">{form.title}</h2>
                <p className="text-sm text-gray-500">Created on: {new Date(form.created_at).toLocaleDateString()}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">You haven't created any forms yet.</p>
        )}
      </div>
    </div>
  );
}