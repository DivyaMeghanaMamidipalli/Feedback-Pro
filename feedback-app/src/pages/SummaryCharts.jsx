import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const processDataForChart = (question, responses) => {
  const counts = {};
  question.options.forEach(option => {
    counts[option] = 0;
  });
  responses.forEach(response => {
    const answer = response.answers[question.id];
    if (answer in counts) {
      counts[answer]++;
    }
  });

  return {
    labels: Object.keys(counts),
    datasets: [{
      label: '# of Votes',
      data: Object.values(counts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
  };
};

export default function SummaryCharts({ questions, responses }) {
  const choiceQuestions = questions.filter(q => q.question_type === 'CHOICE');

  if (choiceQuestions.length === 0) {
    return null; 
  }

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
      <h2 className="text-2xl font-semibold mb-6">Response Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {choiceQuestions.map(question => (
          <div key={question.id}>
            <h3 className="font-bold text-center mb-2">{question.text}</h3>
            <Pie data={processDataForChart(question, responses)} />
          </div>
        ))}
      </div>
    </div>
  );
}