import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function CreateFormPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', question_type: 'TEXT' }]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // This part was correct
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { text: '', question_type: 'TEXT' }]);
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const validQuestions = questions.filter(q => q.text.trim() !== '');

    if (!title.trim() || validQuestions.length < 1) {
      setError('Please provide a title and at least one valid question.');
      return;
    }

    apiClient.post('/forms/create/', {
      title: title,
      questions: validQuestions,
    })
    .then(res => {
      const formId = res.data.id;
      const publicUrl = `${window.location.origin}/form/${formId}`;
      setSuccessMessage(`Form created! Public URL: ${publicUrl}`);
      setTitle('');
      setQuestions([{ text: '', question_type: 'TEXT' }]);
    })
    .catch(err => {
      console.error('Form creation failed:', err);
      setError('Failed to create form. Please try again.');
    });
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-4 sm:p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Create a New Form</h1>
      
      {/* The success message logic was correct */}
      {successMessage ? (
        <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-200 rounded-md">
          <p className="font-bold">Success!</p>
          <p>Your form has been created. Share this link with your users:</p>
          <input
            type="text"
            value={successMessage.split(': ')[1]}
            readOnly
            className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-md"
            onClick={(e) => e.target.select()}
          />
          <Link to="/admin/dashboard" className="block text-center mt-4 text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========================================================== */}
          {/* THIS WAS THE FIRST MISSING PART: THE FORM TITLE INPUT      */}
          {/* ========================================================== */}
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
              <div key={index} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder={`Question ${index + 1}`}
                />
                <select
                  value={question.question_type}
                  onChange={(e) => handleQuestionChange(index, 'question_type', e.target.value)}
                  className="w-full sm:w-auto p-3 border border-gray-300 rounded-md bg-white"
                >
                  <option value="TEXT">Single Line</option>
                  <option value="TEXTAREA">Multi-line</option>
                  <option value="NUMBER">Number</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="w-full sm:w-auto px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                  disabled={questions.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
            {/* ========================================================== */}
            {/* THIS WAS THE SECOND MISSING PART: THE ADD QUESTION BUTTON  */}
            {/* ========================================================== */}
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
          
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 border-t">
            <Link to="/admin/dashboard" className="w-full text-center px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
              Create Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
}