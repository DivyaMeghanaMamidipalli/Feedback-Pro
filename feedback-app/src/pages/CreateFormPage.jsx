import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; // Use our custom authenticated API client

export default function CreateFormPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']); // Start with one empty question
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Effect to protect the route: if no auth token, redirect to login
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Updates a specific question text when the user types
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  // Adds a new empty question field, up to a maximum of 5
  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, '']);
    }
  };

  // Removes a question field, but not if it's the last one
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  // Handles the final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Client-side validation: filter out any empty question fields before submitting
    const validQuestions = questions.filter(q => q.trim() !== '');

    if (!title.trim() || validQuestions.length < 1) {
      setError('Please provide a title and at least one valid question.');
      return;
    }

    // Use our 'apiClient' which automatically includes the JWT auth token
    apiClient.post('/forms/create/', {
      title: title,
      questions: validQuestions,
    })
    .then(res => {
      // On success, construct the public URL for the new form
      const formId = res.data.id;
      const publicUrl = `${window.location.origin}/form/${formId}`;
      setSuccessMessage(`Form created! Public URL: ${publicUrl}`);
      
      // Clear the form for a good user experience
      setTitle('');
      setQuestions(['']);
    })
    .catch(err => {
      console.error('Form creation failed:', err);
      setError('Failed to create form. The session may have expired; please try logging in again.');
    });
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Create a New Form</h1>

      {/* Conditional Rendering: Show success message OR the form */}
      {successMessage ? (
        <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-200 rounded-md">
          <p className="font-bold">Success!</p>
          <p>Your form has been created. Share this link with your users:</p>
          <input 
            type="text" 
            value={successMessage.split(': ')[1]} 
            readOnly 
            className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-md" 
            // Makes the URL text easy to copy
            onClick={(e) => e.target.select()}
          />
          <Link to="/admin/dashboard" className="block text-center mt-4 text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Form Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Customer Satisfaction Survey"
              required
            />
          </div>
          
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Questions</label>
            {questions.map((question, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder={`Question ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                  disabled={questions.length <= 1}
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
              disabled={questions.length >= 5}
            >
              + Add Question (Max 5)
            </button>
          </div>
          
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          
          <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
            Create Form
          </button>
        </form>
      )}
    </div>
  );
}