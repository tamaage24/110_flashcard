import React, { useState } from 'react';
import { Card } from '../components/Card';
import { NumberDots } from '../components/NumberDots';

export const CalcMode: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);

  // 次の数字へ進む
  const handleNext = () => {
    setCurrentNumber(prev => (prev >= 100 ? 1 : prev + 1));
  };

  // 前の数字へ戻る
  const handlePrevious = () => {
    setCurrentNumber(prev => (prev <= 1 ? 100 : prev - 1));
  };

  return (
    <div className="number-mode-container">
      <Card
        onNext={handleNext}
        onPrevious={handlePrevious}
        className="number-card"
      >
        <div className="number-content">
          <NumberDots number={currentNumber} />
        </div>
      </Card>
    </div>
  );
};

export default CalcMode;