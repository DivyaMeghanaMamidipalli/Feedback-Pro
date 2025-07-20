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
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/forms/${formId}/`)
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
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/submit/`, {
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
            <div className="max-w-md mx-auto  p-8 bg-white rounded-lg shadow-md text-center">
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
                {form.questions.map(q => {
                    let inputComponent;
                    if (q.question_type === 'TEXTAREA') {
                    inputComponent = (
                        <textarea
                        onChange={(e) => handleInputChange(String(q.id), e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                        required
                        />
                    );
                    } else if (q.question_type === 'NUMBER') {
                    inputComponent = (
                        <input
                        type="number"
                        onChange={(e) => handleInputChange(String(q.id), e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    );
                    } else if (q.question_type === 'CHOICE') {
                    inputComponent = (
                        <div className="mt-2 space-y-2">
                        {q.options && q.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                            <input
                                id={`${q.id}-${index}`}
                                name={q.id} 
                                type="radio"
                                value={option}
                                onChange={(e) => handleInputChange(String(q.id), e.target.value)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                required
                            />
                            <label htmlFor={`${q.id}-${index}`} className="ml-3 block text-sm font-medium text-gray-700">
                                {option}
                            </label>
                            </div>
                        ))}
                        </div>
                    );
                    } else { 
                    inputComponent = (
                        <input
                        type="text"
                        onChange={(e) => handleInputChange(String(q.id), e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    );
                    }

                    return (
                    <div key={q.id}>
                        <label className="block text-lg font-medium text-gray-700 mb-2">{q.text}</label>
                        {inputComponent}
                    </div>
                    );
                })}
                <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
                    Submit Feedback
                </button>
                </form>
        </div>
    );
}