// src/components/TransactionForm.tsx
import React, { useState } from 'react';
import { useTransaction } from '../context/TransactionContext';

export const TransactionForm = () => {
  const { addTransaction } = useTransaction();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addTransaction({
      title,
      amount,
      type,
      category,
      date: new Date().toISOString(),
    });

    // Limpa os campos
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('entrada');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
    >
      {/* Inputs agrupados */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', width: '180px', borderRadius: '10px', border: '1px solid black' }}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          style={{ padding: '8px', width: '180px', borderRadius: '10px', border: '1px solid black' }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'entrada' | 'saida')}
          style={{ padding: '8px', width: '180px', borderRadius: '10px', border: '1px solid black' }}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ padding: '8px', width: '180px', borderRadius: '10px', border: '1px solid black' }}
        />
      </div>

      {/* Botão de submit */}
      <button
        type="submit"
        style={{
          padding: '10px 60px',
          borderRadius: '20px',
          border: '1px solid black',
          backgroundColor: '#4caf50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Adicionar
      </button>
    </form>
  );
};
