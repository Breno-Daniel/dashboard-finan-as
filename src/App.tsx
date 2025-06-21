// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { TransactionProvider } from './context/TransactionContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { BalanceSummary } from './components/BalanceSummary';
import { ChartSection } from './components/ChartSection';
import { AuthMenu } from './components/AuthMenu';

import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard protegido com contexto das transações
const Dashboard = () => (
  <TransactionProvider>
    <h1>Dashboard de Finanças</h1>
    <BalanceSummary />
    <TransactionForm />
    <TransactionList />
    <ChartSection />
  </TransactionProvider>
);

// Componente para proteger rotas privadas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Enquanto autenticação carrega, mostra uma mensagem
    return <p style={{ textAlign: 'center', marginTop: 50 }}>Carregando...</p>;
  }

  // Se não estiver logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuário está autenticado, renderiza o conteúdo protegido
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthMenu />

        <Routes>
          {/* Rota protegida para dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rota coringa para qualquer outra rota não definida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
