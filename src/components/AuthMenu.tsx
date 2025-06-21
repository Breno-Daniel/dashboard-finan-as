// src/components/AuthMenu.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthMenu = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redireciona após logout
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',    // corrigido aqui
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 999,
      }}
    >
      {!user ? (
        <div style={{ position: 'relative' }}>
          <button
            onClick={toggleMenu}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              minWidth: '110px',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            Login
          </button>

          {showMenu && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: '#222',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                borderRadius: '8px',
                overflow: 'hidden',
                width: '160px',              // largura fixa para um tamanho melhor
                marginTop: '8px',
              }}
            >
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4caf50')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate('/register');
                  setShowMenu(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '15px',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4caf50')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Criar Conta
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '110px',
            userSelect: 'none',
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};
