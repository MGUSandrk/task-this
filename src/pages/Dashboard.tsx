import { Clock } from '../components/Dashboard/Clock'; 
import { Habits } from '../components/Dashboard/Habits';
import { Art } from '../components/Dashboard/Art';
import { Tasks } from '../components/Dashboard/Tasks';

export const Dashboard = () => {
  return (
      <div className="flex-1 px-3.5 2xl:pt-2 max-sm:pb-13 grid grid-cols-1  gap-4 max-w-5xl mx-auto w-full content-start
                      2xl:p-4 2xl:py-2 md:grid-cols-3 ">
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
        <div className='md:col-span-1 max-2xl:hidden'>
          <Art/>
        </div>

        {/* --- FILA 2 --- */}
       {/* 3. HÁBITOS */}
        <div className=" md:col-span-1 max-2xl:row-span-2 h-fit">
          <Habits/>
        </div>

        {/* 4. TAREAS */}
        <div className='md:col-span-2 
                        md:max-2xl:ml-35 md:max-2xl:mt-4
                        md:w-120 2xl:ml-20 2xl:mt-10 md:flex-1 md:relative md:min-h-70'>
          <Tasks/>
        </div>

      </div>
  );
};