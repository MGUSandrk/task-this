import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formato: HH:MM:SS
  const timeString = time.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  // Fecha: LUNES 24 ENERO
  const dateString = time.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center py-10 border-b-2 border-grid select-none">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none font-mono">
        {timeString}
      </h1>
      <p className="mt-2 text-sm md:text-base tracking-[0.2em] font-mono text-gray-500">
        {dateString}
      </p>
    </div>
  );
};