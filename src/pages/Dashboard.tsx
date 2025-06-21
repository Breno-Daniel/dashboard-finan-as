import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveTransaction, fetchUserTransactions, TransactionData } from '../services/transactions';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState<TransactionData & { id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchUserTransactions(user.uid).then(setTransactions);
  }, [user]);

  const handleAdd = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await saveTransaction(user.uid, {
        amount: 200,
        category: 'Salário',
        date: new Date(),
        description: 'Recebimento mensal',
      });
      const updated = await fetchUserTransactions(user.uid);
      setTransactions(updated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Dashboard de Finanças</h1>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </header>
      <button onClick={handleAdd} disabled={loading} style={styles.addButton}>
        {loading ? 'Salvando...' : 'Adicionar exemplo'}
      </button>

      <ul style={styles.list}>
        {transactions.map(t => (
          <li key={t.id} style={styles.listItem}>
            <strong>{t.category}</strong> - R$ {t.amount.toFixed(2)} em {t.date.toLocaleDateString()}
            {t.description && <p>{t.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 720,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  listItem: {
    padding: 12,
    borderBottom: '1px solid #ddd',
  },
};
