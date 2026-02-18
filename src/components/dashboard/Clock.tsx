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
    <div className="flex flex-col justify-center border-2 border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] 
                    bg-background items-center overflow-hidden group transition-transform relative
                    h-33 w-full
                    md:h-45 md:max-w-120">
      <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
        System_Time
      </div>
      <div className="flex flex-col items-center justify-center py-1 border-b-2 border-grid select-none">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none font-mono">
          {timeString}
        </h1>
        <p className=" text-sm md:text-base tracking-[0.2em] font-mono text-gray-500">
          {dateString}
        </p>
      </div>
    </div>
  );
};