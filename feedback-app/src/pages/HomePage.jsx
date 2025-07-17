import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/register');
    }
  }, [navigate]); 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-700">Redirecting...</p>
        <div className="w-8 h-8 mt-4 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}