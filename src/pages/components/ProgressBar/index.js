import React, { useState, useEffect } from 'react';

const ProgressBar = ({ onTimePassed }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          onTimePassed(true); // Chamando a função de callback quando o tempo passar
          return prevProgress;
        } else {
          return prevProgress + 1;
        }
      });
    }, 550); // Atualiza a cada 600ms para simular 1 minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '20px',
          backgroundColor: '#53BAD9',
          borderRadius:'8px'
        }}
      />
    </div>
  );
};

export default ProgressBar;
