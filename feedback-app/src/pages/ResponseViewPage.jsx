import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function ResponseViewPage() {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific form with its questions and responses
    apiClient.get(`/admin/forms/${formId}/responses/`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch form data:", err);
        setLoading(false);
      });
  }, [formId]);

  if (loading) {
    return <div className="text-center p-10">Loading Responses...</div>;
  }

  if (!formData) {
    return <div className="text-center p-10 text-red-500">Could not load form data.</div>;
  }

  const { title, questions, responses } = formData;
  const publicUrl = `${window.location.origin}/form/${formId}`;

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
      <Link to="/admin/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="my-4 p-3 bg-gray-100 rounded-md">
        <span className="font-semibold">Public Link: </span>
        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{publicUrl}</a>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-t pt-4">Responses ({responses.length})</h2>
      
      {responses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border text-left text-sm font-semibold text-gray-700">Submitted At</th>
                {/* Dynamically create a header for each question */}
                {questions.map(q => (
                  <th key={q.id} className="py-2 px-4 border text-left text-sm font-semibold text-gray-700">{q.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Map over each response to create a table row */}
              {responses.map(resp => (
                <tr key={resp.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-sm text-gray-600">{new Date(resp.submitted_at).toLocaleString()}</td>
                  {/* For each question, find the matching answer in the response's 'answers' object */}
                  {questions.map(q => (
                    <td key={q.id} className="py-2 px-4 border text-sm text-gray-800">
                      {resp.answers[q.id] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No responses have been submitted for this form yet.</p>
      )}
    </div>
  );
}