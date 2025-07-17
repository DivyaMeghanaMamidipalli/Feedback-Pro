import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PublicFormPage() {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch form details from your Django API
        axios.get(`http://127.0.0.1:8000/api/forms/${formId}/`)
            .then(res => {
                setForm(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching form:", err);
                setLoading(false);
            });
    }, [formId]);

    const handleInputChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/submit/`, {
            form: formId,
            answers: answers
        })
        .then(res => {
            setSubmitted(true);
        })
        .catch(err => console.error("Error submitting response:", err));
    };

    if (loading) {
        return <div className="text-center p-10">Loading Form...</div>;
    }

    if (submitted) {
        return (
            <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-green-600">Thank you!</h2>
                <p className="text-gray-700 mt-2">Your feedback has been submitted successfully.</p>
            </div>
        );
    }

    if (!form) {
        return <div className="text-center p-10 text-red-500">Form not found or could not be loaded.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">{form.title}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {form.questions.map(q => (
                    <div key={q.id}>
                        <label className="block text-lg font-medium text-gray-700 mb-2">{q.text}</label>
                        <input
                            type="text"
                            onChange={(e) => handleInputChange(String(q.id), e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}