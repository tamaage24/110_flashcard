import React from 'react';

export interface NumberDotsProps {
  number: number;
  className?: string;
}

export const NumberDots: React.FC<NumberDotsProps> = ({ number, className = '' }) => {
  // 数字の範囲チェック
  const validNumber = Math.max(0, Math.min(100, Math.floor(number)));

  // ドットを生成する関数
  const generateDots = (count: number) => {
    const dots = [];
    const columns = Math.ceil(count / 10); // 列数（10個で1列）
    
    for (let col = 0; col < columns; col++) {
      const dotsInThisColumn = Math.min(10, count - col * 10);
      const columnDots = [];
      
      for (let row = 0; row < dotsInThisColumn; row++) {
        const groups = Math.floor(row / 5); // 5個ずつのグループ
        const positionInGroup = row % 5;
        
        columnDots.push(
          <div
            key={`${col}-${row}`}
            className="red-dot"
            style={{
              marginBottom: positionInGroup === 4 ? '10px' : '2px' // 5個ごとにスペースを空ける
            }}
          />
        );
      }
      
      dots.push(
        <div
          key={col}
          className="dot-column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: col === columns - 1 ? '0' : '15px'
          }}
        >
          {columnDots}
        </div>
      );
    }
    
    return dots;
  };

  return (
    <div className={`number-dots-container ${className}`}>
      {/* 数字表示 */}
      <div className="number-display" style={{ marginBottom: '20px' }}>
        {validNumber}
      </div>
      
      {/* ドット表示 */}
      {validNumber > 0 && (
        <div 
          className="dots-grid"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            maxWidth: '100%',
            gap: '10px'
          }}
        >
          {generateDots(validNumber)}
        </div>
      )}
    </div>
  );
};