import React, { useState } from 'react';
import Intrestcard from './Intrestcard';
import IntrestB from './IntrestB';

const Intresstock = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(true); // Updated initial state

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Toggle Content</button>
      {showContent && isLoggedIn ? <IntrestB /> : <Intrestcard />}
    </div>
  );
};

export default Intresstock;
