// src/components/TransactionList.tsx
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTransaction } from '../context/TransactionContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const TransactionList = () => {
  const { transactions, removeTransaction } = useTransaction();

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();

      doc.text('Relatório de Transações', 14, 16);

      autoTable(doc, {
        startY: 22,
        head: [['Título', 'Valor', 'Categoria', 'Data']],
        body: transactions.map(tx => [
          tx.title,
          formatCurrency(tx.amount),
          tx.category,
          formatDate(tx.date),
        ]),
      });

      doc.save('transacoes.pdf');
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  return (
    <div className="list" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Transações</h2>
        <button
          onClick={handleExportPDF}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Exportar PDF
        </button>
      </div>

      {transactions.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Nenhuma transação encontrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <span>{tx.title}</span>
              <span>{formatCurrency(tx.amount)}</span>
              <span>{tx.category}</span>
              <span>{formatDate(tx.date)}</span>
              <button
                onClick={() => removeTransaction(tx.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
