// src/components/ChartSection.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTransaction } from '../context/TransactionContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartSection = () => {
  const { transactions } = useTransaction();

  const entrada = transactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
  const saida = transactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.amount, 0);

  const data = {
    labels: ['Entradas', 'Saídas'],
    datasets: [
      {
        data: [entrada, saida],
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart">
      <Pie data={data} />
    </div>
  );
};
