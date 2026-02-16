import { Clock } from '../components/Dashboard/Clock'; 
import { Habits } from '../components/Dashboard/Habits';
import { Art } from '../components/Dashboard/Art';
import { Tasks } from '../components/Dashboard/Tasks';

export const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col font-mono text-foreground overflow-x-hidden transition-colors duration-300 ">

      {/* LAYOUT PRINCIPAL: 3 COLUMNAS ASIMÉTRICAS */}
      <div className="flex-1 px-3.5 md:p-4 pt-2 pb-13 md:py-2 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full content-start">
        {/* 1. RELOJ (Focal Point - 2/3 ancho) */}
        <div className="md:col-span-2 md:relative md:mb-8 ">
          <div className="border-2 border-foreground px-4 shadow-[6px_6px_0px_0px_var(--foreground)] h-35 md:h-45
                          bg-background flex flex-col justify-center items-center overflow-hidden group transition-transform relative md:absolute md:right-2 md:bottom-2">
            <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              System_Time
            </div>
            <Clock />
          </div>
        </div>

        {/* 2. ARTE + FRASE (Decorativo - 1/3 ancho) */}
        <div className='md:col-span-1 '>
          <Art/>
        </div>

        {/* --- FILA 2 --- */}
       {/* 3. HÁBITOS */}
        <div className=" md:col-span-1 h-fit">
          <Habits/>
        </div>

        {/* 4. TAREAS */}
        <div className='md:col-span-2'>
          <Tasks/>
        </div>

      </div>
    </div>
  );
};