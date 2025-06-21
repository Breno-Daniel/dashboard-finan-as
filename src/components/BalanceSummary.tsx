import React from 'react';
import { useTransaction } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';

// Componentes SVG para setas
const ArrowUp = ({ color = '#4caf50' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: 8, animation: 'bounceUp 1.5s infinite' }}
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
    <style>
      {`
        @keyframes bounceUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}
    </style>
  </svg>
);

const ArrowDown = ({ color = '#f44336' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: 8, animation: 'bounceDown 1.5s infinite' }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
    <style>
      {`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}
    </style>
  </svg>
);

export const BalanceSummary = () => {
  const { transactions } = useTransaction();

  const entrada = transactions
    .filter(t => t.type === 'entrada')
    .reduce((acc, t) => acc + t.amount, 0);

  const saida = transactions
    .filter(t => t.type === 'saida')
    .reduce((acc, t) => acc + t.amount, 0);

  const total = entrada - saida;

  const isProfit = total >= 0;

  return (
    <div className="summary" style={{ textAlign: 'center' }}>
      <p>Entradas: {formatCurrency(entrada)}</p>
      <p>Saídas: {formatCurrency(saida)}</p>
      <p>Total: {formatCurrency(total)}</p>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: isProfit ? '#4caf5022' : '#f4433622',
          color: isProfit ? '#4caf50' : '#f44336',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          userSelect: 'none',
        }}
      >
        {isProfit ? <ArrowUp /> : <ArrowDown />}
        {isProfit ? 'Você está no lucro' : 'Você está em prejuízo'}
      </div>
    </div>
  );
};
