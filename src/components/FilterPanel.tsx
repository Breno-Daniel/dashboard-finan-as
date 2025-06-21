import React, { useState } from 'react';

export const FilterPanel = ({ onFilter }: { onFilter: (text: string) => void }) => {
  const [text, setText] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="filter">
      <input type="text" placeholder="Filtrar por título ou categoria" value={text} onChange={handleChange} />
    </div>
  );
};
