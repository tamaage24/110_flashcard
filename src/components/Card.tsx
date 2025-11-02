import React, { useState, useRef } from 'react';

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
  const [isHandlingEvent, setIsHandlingEvent] = useState(false); // ★ 処理中フラグを追加
  const cardRef = useRef<HTMLDivElement>(null);
  
  // アニメーション時間
  const ANIMATION_DURATION = 300; 

  // 次のカードへ進む処理 (共通化)
  const triggerNext = () => {
    if (isHandlingEvent) return; // 処理中の場合は無視
    
    if (onNext) {
      setIsHandlingEvent(true); // フラグを立てる
      setAnimation('fade-in'); // タップ時はフェード
      onNext();
      
      // アニメーション時間後にフラグをリセット
      setTimeout(() => {
        setAnimation('');
        setIsHandlingEvent(false); // フラグを下ろす
      }, ANIMATION_DURATION);
    }
  };
  
  // 前のカードへ戻る処理 (共通化)
  const triggerPrevious = (animationType: string = 'slide-right') => {
    if (isHandlingEvent) return; // 処理中の場合は無視
    
    if (onPrevious) {
      setIsHandlingEvent(true); // フラグを立てる
      setAnimation(animationType);
      onPrevious();
      
      // アニメーション時間後にフラグをリセット
      setTimeout(() => {
        setAnimation('');
        setIsHandlingEvent(false); // フラグを下ろす
      }, ANIMATION_DURATION);
    }
  };


  // タップハンドラ（onNextを呼び出す）
  const handleTap = () => {
    triggerNext();
  };

  // タッチ開始
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  // タッチ終了（フリック判定）
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    if (isHandlingEvent) return; // 処理中の場合は無視

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50; // 最小フリック距離

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // 左フリック（次へ）
        triggerNext(); // triggerNextを呼び出す
      } else {
        // 右フリック（前へ）
        triggerPrevious('slide-right'); // triggerPreviousを呼び出す
      }
    } else {
      // フリックではない場合はタップとして扱う
      // ここで handleTap() を呼び出すと、タッチとクリックで二重になる可能性があるため、
      // タッチイベントの処理のみで完結させるために、フリックでない場合はタップとして triggerNext を直接呼び出します。
      // ※ただし、onClickとの兼ね合いを考えると、ここでは何もせずonClickに任せるのが一般的ですが、
      //   二重発火防止のため、タッチデバイスではここで処理を完結させます。
      triggerNext(); 
    }

    setTouchStart(null);
  };

  // マウスイベント（PC用）
  const handleClick = (e: React.MouseEvent) => {
    // タッチデバイスで onClick が発火しても、isHandlingEventでガードされるが、
    // PCでのマウス操作の互換性を保つために、handleTapを呼び出します。
    // Androidスマホ中心の仕様なので、ここではPCのマウスクリックでのみ有効になるように調整する手段もありますが、
    // isHandlingEventでガードされているため、現状のままとします。
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