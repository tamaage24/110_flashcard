import React, { useState, useCallback } from 'react';
import { Card } from '../components/Card';
import { NumberDots } from '../components/NumberDots';

// 計算問題の型定義
interface CalcProblem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×' | '÷';
  result: number;
}

// 計算モードの型定義
type CalcMode = 'add' | 'subtract' | 'multiply' | 'divide' | 'random';

export const NumberMode: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState<CalcProblem | null>(null);
  const [mode, setMode] = useState<CalcMode>('random');

  // 足し算問題の生成（結果が100以内）
  const generateAddition = useCallback((): CalcProblem => {
    const num1 = Math.floor(Math.random() * 50) + 1; // 1-50
    const maxNum2 = Math.min(100 - num1, 50); // 結果が100以内になるように制限
    const num2 = Math.floor(Math.random() * maxNum2) + 1;
    return {
      num1,
      num2,
      operator: '+',
      result: num1 + num2
    };
  }, []);

  // 引き算問題の生成（結果が1以上）
  const generateSubtraction = useCallback((): CalcProblem => {
    const num1 = Math.floor(Math.random() * 100) + 2; // 2-101（最小でも1が残るように）
    const maxNum2 = num1 - 1; // 結果が1以上になるように制限
    const num2 = Math.floor(Math.random() * maxNum2) + 1;
    return {
      num1,
      num2,
      operator: '-',
      result: num1 - num2
    };
  }, []);

  // 掛け算問題の生成（結果が100以内）
  const generateMultiplication = useCallback((): CalcProblem => {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const maxNum2 = Math.floor(100 / num1); // 結果が100以内になるように制限
    const num2 = Math.floor(Math.random() * maxNum2) + 1;
    return {
      num1,
      num2,
      operator: '×',
      result: num1 * num2
    };
  }, []);

  // 割り算問題の生成（割り切れる数のみ）
  const generateDivision = useCallback((): CalcProblem => {
    const num2 = Math.floor(Math.random() * 10) + 1; // 1-10（割る数）
    const quotient = Math.floor(Math.random() * Math.floor(100 / num2)) + 1; // 商
    const num1 = num2 * quotient; // 割られる数（必ず割り切れる）
    return {
      num1,
      num2,
      operator: '÷',
      result: quotient
    };
  }, []);

  // 問題生成関数
  const generateProblem = useCallback((calcMode: CalcMode = mode): CalcProblem => {
    let selectedMode = calcMode;
    
    // ランダムモードの場合は4種類からランダム選択
    if (calcMode === 'random') {
      const modes: CalcMode[] = ['add', 'subtract', 'multiply', 'divide'];
      selectedMode = modes[Math.floor(Math.random() * modes.length)];
    }

    switch (selectedMode) {
      case 'add':
        return generateAddition();
      case 'subtract':
        return generateSubtraction();
      case 'multiply':
        return generateMultiplication();
      case 'divide':
        return generateDivision();
      default:
        return generateAddition(); // フォールバック
    }
  }, [mode, generateAddition, generateSubtraction, generateMultiplication, generateDivision]);

  // 初期問題の生成
  React.useEffect(() => {
    setCurrentProblem(generateProblem());
  }, [generateProblem]);

  // 次の問題へ進む
  const handleNext = () => {
    setCurrentProblem(generateProblem());
  };

  // 前の問題へ戻る（新しい問題を生成）
  const handlePrevious = () => {
    setCurrentProblem(generateProblem());
  };

  // モード変更
  const changeMode = (newMode: CalcMode) => {
    setMode(newMode);
    setCurrentProblem(generateProblem(newMode));
  };

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calc-mode-container">
      {/* モード選択ボタン */}
      <div className="calc-mode-selector" style={{ padding: '10px', textAlign: 'center' }}>
        <button 
          onClick={() => changeMode('add')}
          style={{ 
            margin: '5px', 
            padding: '10px 15px',
            backgroundColor: mode === 'add' ? '#ff4444' : '#fff',
            color: mode === 'add' ? '#fff' : '#000',
            border: '2px solid #ff4444',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          足し算
        </button>
        <button 
          onClick={() => changeMode('subtract')}
          style={{ 
            margin: '5px', 
            padding: '10px 15px',
            backgroundColor: mode === 'subtract' ? '#ff4444' : '#fff',
            color: mode === 'subtract' ? '#fff' : '#000',
            border: '2px solid #ff4444',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          引き算
        </button>
        <button 
          onClick={() => changeMode('multiply')}
          style={{ 
            margin: '5px', 
            padding: '10px 15px',
            backgroundColor: mode === 'multiply' ? '#ff4444' : '#fff',
            color: mode === 'multiply' ? '#fff' : '#000',
            border: '2px solid #ff4444',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          掛け算
        </button>
        <button 
          onClick={() => changeMode('divide')}
          style={{ 
            margin: '5px', 
            padding: '10px 15px',
            backgroundColor: mode === 'divide' ? '#ff4444' : '#fff',
            color: mode === 'divide' ? '#fff' : '#000',
            border: '2px solid #ff4444',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          割り算
        </button>
        <button 
          onClick={() => changeMode('random')}
          style={{ 
            margin: '5px', 
            padding: '10px 15px',
            backgroundColor: mode === 'random' ? '#ff4444' : '#fff',
            color: mode === 'random' ? '#fff' : '#000',
            border: '2px solid #ff4444',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ランダム
        </button>
      </div>

      <Card
        onNext={handleNext}
        onPrevious={handlePrevious}
        className="calc-card"
      >
        <div className="calc-content" style={{ textAlign: 'center', padding: '20px' }}>
          {/* 計算式の表示 */}
          <div className="calc-problem" style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {/* 第1項 */}
            <div className="calc-term" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <NumberDots number={currentProblem.num1} />
            </div>

            {/* 演算子 */}
            <div className="calc-operator" style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              color: '#000',
              alignSelf: 'center',
              margin: '0 10px'
            }}>
              {currentProblem.operator}
            </div>

            {/* 第2項 */}
            <div className="calc-term" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <NumberDots number={currentProblem.num2} />
            </div>

            {/* イコール */}
            <div className="calc-equals" style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              color: '#000',
              alignSelf: 'center',
              margin: '0 10px'
            }}>
              =
            </div>

            {/* 結果 */}
            <div className="calc-result" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <NumberDots number={currentProblem.result} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NumberMode;