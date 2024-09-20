import React, { useState, useEffect, useMemo } from 'react';

function Countdown({ initialTime }) {
  const [time, setTime] = useState(initialTime);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  
    return () => clearInterval(timer);
  }, [initialTime]);
  

  const minutes = React.useMemo(() => Math.floor(time / 60), [time]);
  const seconds = React.useMemo(() => time % 60, [time]);
  

  return (
    <div id="countdown-container">
      <div 
        id="countdown" 
        className={time === 0 ? 'expired' : ''} 
        aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
      >
        {time > 0 ? `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s` : "Time's up!"}
      </div>

    </div>
  );
}

export default Countdown;
