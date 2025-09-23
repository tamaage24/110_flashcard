import React, { useState } from 'react';
import WordCard from './components/WordCard';
import NumberCard from './components/NumberCard';
import CalcCard from './components/CalcCard';
import TwoWordCard from './components/TwoWordCard';

// 単語カードのサンプル
const sampleWordCards = [
  { folder:'ライオン', file:'オス', image:'...' },
  { folder:'ライオン', file:'メス', image:'...' },
  { folder:'りんご', file:'赤', image:'...' }
];

const App = () => {
  const [currentMode, setCurrentMode] = useState('selection');
  const [currentIndex, setCurrentIndex] = useState(0);

  // モード選択、戻る、次へ処理は元コードを流用
  // 表示部分で WordCard, NumberCard, CalcCard, TwoWordCard を切り替える

  return (
    <div>
      {currentMode === 'word' && <WordCard cards={sampleWordCards} currentIndex={currentIndex} />}
      {currentMode === 'number' && <NumberCard currentNumber={currentIndex + 1} />}
      {currentMode === 'calc' && <CalcCard operator='ランダム' />}
      {currentMode === 'twoword' && <TwoWordCard />}
    </div>
  );
};

export default App;
