import React, { useState, useEffect } from 'react';

function Countdown({ initialTime }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div id="countdown-container">
      <div id="countdown" className={time === 0 ? 'expired' : ''}>
        {time > 0 ? `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s` : "Time's up!"}
      </div>
    </div>
  );
}

export default Countdown;
