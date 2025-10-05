import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { End } from './pages/End';
import SingleMode from './pages/SingleMode';
import MultiMode from './pages/MultiMode';
import NumberMode from './pages/NumberMode';
import CalcMode from './pages/CalcMode';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* メインページ */}
          <Route path="/" element={<Home />} />
          
          {/* 各モードページ */}
          <Route path="/single" element={<SingleMode />} />
          <Route path="/multi" element={<MultiMode />} />
          <Route path="/number" element={<NumberMode />} />
          <Route path="/calc" element={<CalcMode />} />
          
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