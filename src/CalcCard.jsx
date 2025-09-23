import React, { useState, useEffect } from 'react';
import { generateDots } from '../utils/generateDots';

// ランダムに演算子を選ぶ関数
const getRandomOperator = () => {
  const ops = ['+', '-', '×', '÷'];
  return ops[Math.floor(Math.random() * ops.length)];
};

const CalcCard = ({ operator = 'ランダム' }) => {
  const [step, setStep] = useState(0);   // 0=数1, 1=演算子, 2=数2, 3=答え
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState('+');
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    resetProblem();
  }, [operator]);

  const resetProblem = () => {
    const n1 = Math.floor(Math.random() * 100) + 1;
    const n2 = Math.floor(Math.random() * 100) + 1;
    const chosenOp = operator === 'ランダム' ? getRandomOperator() : operator;

    let ans = 0;
    switch (chosenOp) {
      case '+': ans = n1 + n2; break;
      case '-': ans = n1 - n2; break;
      case '×': ans = n1 * n2; break;
      case '÷': ans = n2 !== 0 ? Math.floor(n1 / n2) : 0; break;
      default: ans = 0;
    }

    setNum1(n1);
    setNum2(n2);
    setOp(chosenOp);
    setAnswer(ans);
    setStep(0);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      resetProblem();
    }
  };

  const renderCard = (number) => {
    const dots = generateDots(number);
    return (
      <div style={{ position:'relative', width:'300px', height:'300px', border:'1px solid #ddd', borderRadius:'8px', margin:'10px' }}>
        <div style={{ position:'absolute', top:'10px', left:'10px', fontSize:'24px', fontWeight:'bold' }}>{number}</div>
        {dots.map((dot, index) => (
          <div key={index} style={{
            position:'absolute',
            left:`${dot.x}px`,
            top:`${dot.y}px`,
            width:`${dot.size}px`,
            height:`${dot.size}px`,
            backgroundColor:'red',
            borderRadius:'50%'
          }} />
        ))}
      </div>
    );
  };

  return (
    <div onClick={nextStep} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1 }}>
      {step === 0 && renderCard(num1)}
      {step === 1 && <div style={{ fontSize:'40px', fontWeight:'bold' }}>{op}</div>}
      {step === 2 && renderCard(num2)}
      {step === 3 && renderCard(answer)}
      <div style={{ marginTop:'20px', fontSize:'16px', color:'#666' }}>
        {step < 3 ? 'タップして次へ' : 'タップして新しい問題へ'}
      </div>
    </div>
  );
};

export default CalcCard;
