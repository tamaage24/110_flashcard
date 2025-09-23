import React, { useState, useEffect } from 'react';
import { generateDots } from '../utils/generateDots';

const NumberCard = ({ currentNumber }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    setDots(generateDots(currentNumber));
    setShowNumber(false);
  }, [currentNumber]);

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1, width:'100%', maxWidth:'400px' }} onClick={() => setShowNumber(true)}>
      <div style={{ position:'relative', width:'300px', height:'300px', border:'1px solid #ddd', borderRadius:'8px', marginBottom:'20px' }}>
        <div style={{ position:'absolute', top:'10px', left:'10px', fontSize:'24px', fontWeight:'bold', color:'black', opacity: showNumber ? 1 : 0, transition:'opacity 0.3s' }}>
          {currentNumber}
        </div>
        {dots.map((dot,index) => (
          <div key={index} style={{ position:'absolute', left:`${dot.x}px`, top:`${dot.y}px`, width:`${dot.size}px`, height:`${dot.size}px`, backgroundColor:'red', borderRadius:'50%' }} />
        ))}
      </div>
      {!showNumber && <div style={{ fontSize:'16px', color:'#666' }}>タップして数字を表示</div>}
    </div>
  );
};

export default NumberCard;
