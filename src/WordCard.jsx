import React from 'react';

const WordCard = ({ cards, currentIndex }) => {
  const card = cards[currentIndex];

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1, width:'100%', maxWidth:'400px' }}>
      <img 
        src={card.image} 
        alt={`${card.folder}/${card.file}`}
        style={{ maxWidth:'80%', maxHeight:'300px', marginBottom:'20px', borderRadius:'8px' }}
      />
      <div style={{ fontSize:'24px', fontWeight:'bold', color:'black', textAlign:'center' }}>
        {card.folder} / {card.file}
      </div>
    </div>
  );
};

export default WordCard;
