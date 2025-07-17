// src/pages/AdminDashboard.jsx
import React from 'react';

export default function AdminDashboard() {
  // You can add logic here to check if the admin is logged in (using the JWT token)
  // If not, redirect them to the login page.

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Create new forms here or view all form responses in the main Django Admin Panel.
      </p>
      <div className="space-x-4">
         <a href="/admin/create" className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition">
          Create New Form
        </a>
        {/* THIS IS THE KEY LINK! */}
        <a
          href="http://127.0.0.1:8000/admin/"
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition"
        >
          View Responses (Django Admin)
        </a>
      </div>
    </div>
  );
}