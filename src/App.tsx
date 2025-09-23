import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { End } from './pages/End';

// ステップ2で実装予定の各モードページ用のダミーコンポーネント
const SingleModePlaceholder: React.FC = () => (
  <div className="card-container">
    <h2>単語カード（単独）モード</h2>
    <p>実装予定</p>
    <button className="button" onClick={() => window.history.back()}>
      戻る
    </button>
  </div>
);

const MultiModePlaceholder: React.FC = () => (
  <div className="card-container">
    <h2>単語カード（複数）モード</h2>
    <p>実装予定</p>
    <button className="button" onClick={() => window.history.back()}>
      戻る
    </button>
  </div>
);

const NumberModePlaceholder: React.FC = () => (
  <div className="card-container">
    <h2>数字カードモード</h2>
    <p>実装予定</p>
    <button className="button" onClick={() => window.history.back()}>
      戻る
    </button>
  </div>
);

const CalcModePlaceholder: React.FC = () => (
  <div className="card-container">
    <h2>計算モード</h2>
    <p>実装予定</p>
    <button className="button" onClick={() => window.history.back()}>
      戻る
    </button>
  </div>
);

function App() {
  return (
    <Router basename="/flashcard-app">
      <div className="App">
        <Routes>
          {/* メインページ */}
          <Route path="/" element={<Home />} />
          
          {/* 各モードページ（ステップ1ではダミー実装） */}
          <Route path="/single" element={<SingleModePlaceholder />} />
          <Route path="/multi" element={<MultiModePlaceholder />} />
          <Route path="/number" element={<NumberModePlaceholder />} />
          <Route path="/calc" element={<CalcModePlaceholder />} />
          
          {/* 終了ページ */}
          <Route path="/end" element={<End />} />
          
          {/* 404ページ（ホームにリダイレクト） */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;