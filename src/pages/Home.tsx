import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/single', label: '単語カード（単独）' },
    { path: '/multi', label: '単語カード（複数）' },
    { path: '/number', label: '数字カード' },
    { path: '/calc', label: '計算' },
  ];

  return (
    <div className="card-container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'black' }}>
        フラッシュカード
      </h1>
      
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.path}
            className="button"
            onClick={() => navigate(item.path)}
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              border: '2px solid #ddd',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center'
        }}
      >
        モードを選択してください
      </div>
    </div>
  );
};