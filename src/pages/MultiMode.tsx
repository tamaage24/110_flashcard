import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { loadMultiData, CardData } from '../utils/dataLoader';

const MultiMode: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const data = await loadMultiData();
        
        if (data.length === 0) {
          setError('表示するカードがありません');
          return;
        }

        // MultiモードではJSONがフラット化されていることを前提とし、
        // カテゴリ情報を含んだlabelがすでに設定されている想定
        setCards(data);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Failed to load multi mode data:', err);
        setError('データの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 最後のカードの場合、終了画面へ遷移
      navigate('/end');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">読み込み中...</div>
      </div>
    );
  }

  if (error || cards.length === 0) {
    return (
      <div className="error-container">
        <div className="error-text">{error || 'カードがありません'}</div>
        <button onClick={() => navigate('/')} className="home-button">
          ホームに戻る
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const hasImageError = imageErrors.has(currentIndex);

  return (
    <div className="multi-mode-container">
      <Card onNext={handleNext} onPrevious={handlePrevious}>
        <div className="card-content">
          {/* テキストエリア */}
          <div className="card-text">
            {currentCard.label}
          </div>
          
          {/* 画像エリア */}
          <div className="card-image-container">
            {hasImageError ? (
              <div className="image-error">
                画像が読み込めませんでした
              </div>
            ) : (
              <img
                src={currentCard.path}
                alt={currentCard.label}
                className="card-image"
                onError={() => handleImageError(currentIndex)}
              />
            )}
          </div>
        </div>
      </Card>

      {/* 進捗表示 */}
      <div className="progress-indicator">
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default MultiMode;