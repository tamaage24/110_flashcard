import React, { useState, useRef, useEffect } from 'react';

export interface CardProps {
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  onNext, 
  onPrevious, 
  className = '' 
}) => {
  const [animation, setAnimation] = useState<string>('');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // タップハンドラ
  const handleTap = () => {
    if (onNext) {
      setAnimation('fade-in');
      setTimeout(() => setAnimation(''), 300);
      onNext();
    }
  };

  // タッチ開始
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  // タッチ終了（フリック判定）
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50; // 最小フリック距離

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // 左フリック（次へ）
        if (onNext) {
          setAnimation('slide-left');
          setTimeout(() => setAnimation(''), 300);
          onNext();
        }
      } else {
        // 右フリック（前へ）
        if (onPrevious) {
          setAnimation('slide-right');
          setTimeout(() => setAnimation(''), 300);
          onPrevious();
        }
      }
    } else {
      // フリックではない場合はタップとして扱う
      handleTap();
    }

    setTouchStart(null);
  };

  // マウスイベント（PC用）
  const handleClick = (e: React.MouseEvent) => {
    // タッチデバイスでない場合のみ処理
    if (e.detail > 0) { // マウスクリックの場合
      handleTap();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card-container ${animation} ${className}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: 'none', // スクロール等を無効化
        userSelect: 'none',  // テキスト選択を無効化
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  );
};