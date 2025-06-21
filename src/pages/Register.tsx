// src/pages/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Falha ao criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button
            onClick={() => navigate('/')}
            style={styles.backButton}
            aria-label="Voltar ao Dashboard"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e8f5e9')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            ← Voltar
          </button>

          <h2 style={styles.title}>Crie sua conta</h2>

          <div style={{ width: 80 }} /> {/* Balanceador para centralizar título */}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Criando...' : 'Registrar'}
          </button>
        </form>
        <p>
          Já tem uma conta?{' '}
          <span
            style={styles.link}
            onClick={() => navigate('/login')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/login'); }}
          >
            Faça login aqui
          </span>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Inter, sans-serif',
    padding: '0 16px',
  },
  container: {
    width: '100%',
    maxWidth: 480,
    padding: 32,
    borderRadius: 8,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 14,
    cursor: 'pointer',
    userSelect: 'none',
    padding: '6px 12px',
    borderRadius: 6,
    transition: 'background-color 0.2s ease',
    minWidth: 80,
    textAlign: 'left',
  },
  title: {
    flexGrow: 1,
    margin: 0,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 0,
  },
  input: {
    padding: '14px 20px',
    fontSize: 18,
    borderRadius: 8,
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 0',
    backgroundColor: '#4caf50',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 18,
    transition: 'background-color 0.2s ease',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 0,
  },
  link: {
    color: '#4caf50',
    cursor: 'pointer',
    textDecoration: 'underline',
    userSelect: 'none',
  },
};
