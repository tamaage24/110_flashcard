import React from 'react';
import { useNavigate } from 'react-router-dom';

export const End: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div 
      className="card-container"
      onClick={handleReturnHome}
      style={{ cursor: 'pointer' }}
    >
      {/* メインアイコン */}
      <div 
        style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        🎉
      </div>
      
      {/* おわりメッセージ */}
      <h1 
        style={{
          fontSize: '3rem',
          color: 'black',
          marginBottom: '2rem',
          textAlign: 'center'
        }}
      >
        おわり
      </h1>
      
      {/* サブメッセージ */}
      <div 
        style={{
          fontSize: '1.2rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        よくできました！
      </div>
      
      {/* ホームに戻るボタン */}
      <button
        className="button"
        onClick={handleReturnHome}
        style={{
          fontSize: '1.1rem',
          padding: '1rem 2rem',
          backgroundColor: '#e8f4fd',
          border: '2px solid #4a90e2',
          color: '#4a90e2',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        ホームに戻る
      </button>
      
      {/* タップで戻るヒント */}
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          fontSize: '0.9rem',
          color: '#999',
          textAlign: 'center'
        }}
      >
        画面をタップしてホームに戻る
      </div>
    </div>
  );
};