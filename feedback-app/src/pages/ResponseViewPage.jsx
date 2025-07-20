import React, { useState, useEffect ,useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import SummaryCharts from './SummaryCharts'; 
import Papa from 'papaparse'; 

export default function ResponseViewPage() {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

   const fetchData = useCallback(() => {
    apiClient.get(`/admin/forms/${formId}/responses/`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch form data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formId]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  const handleExportCSV = () => {
    if (!formData) return;

    const { questions, responses } = formData;
    
    const headers = ['Submitted At', ...questions.map(q => q.text)];
    
    const dataRows = responses.map(resp => {
      const row = {
        'Submitted At': new Date(resp.submitted_at).toLocaleString(),
      };
      questions.forEach(q => {
        row[q.text] = resp.answers[q.id] || '';
      });
      return row;
    });

    const csv = Papa.unparse({
      fields: headers,
      data: dataRows,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      const safeTitle = formData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.setAttribute('download', `${safeTitle}_responses.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading Responses...</div>;
  }

  if (!formData) {
    return <div className="text-center p-10 text-red-500">Could not load form data.</div>;
  }

  const { title, questions, responses } = formData;
  const publicUrl = `${window.location.origin}/form/${formId}`;

  return (
    <div className="max-w-6xl mx-auto  p-8 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline mb-2 sm:mb-0">← Back to Dashboard</Link>
        
        {responses.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Export to CSV
          </button>
        )}
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="my-4 p-3 bg-gray-100 rounded-md">
        <span className="font-semibold">Public Link: </span>
        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{publicUrl}</a>
      </div>
      <SummaryCharts questions={questions} responses={responses} />

      <h2 className="text-2xl font-semibold mt-8 mb-4 border-t pt-4">All Responses ({responses.length})</h2>

      
      {responses.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border text-left text-sm font-semibold text-gray-700">Submitted At</th>
                {questions.map(q => (
                  <th key={q.id} className="py-2 px-4 border text-left text-sm font-semibold text-gray-700">{q.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map(resp => (
                <tr key={resp.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-sm text-gray-600">{new Date(resp.submitted_at).toLocaleString()}</td>
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