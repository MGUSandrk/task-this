import { Clock } from '../components/dashboard/Clock'; 
import { Habits } from '../components/dashboard/Habits';
import { Art } from '../components/dashboard/Art';
import { Tasks } from '../components/dashboard/Tasks';

export const Dashboard = () => {
  return (
    <div className="flex-1 grid grid-cols-1 gap-4 max-w-6xl mx-auto w-full content-start
                    md:grid-cols-3
                    md:p-4 
                    max-sm:pb-13">
      {/* 1. RELOJ (Focal Point - 2/3 ancho) */}
      <div className=" md:col-span-2 flex flex-col items-end">
        <Clock/>
      </div>
      {/* 2. ARTE + FRASE (Decorativo - 1/3 ancho) */}
      <div className='sm:max-2xl:hidden md:col-span-1 '>
        <Art/>
      </div>
      {/* --- FILA 2 --- */}
      {/* 3. HÁBITOS */}
      <div className="md:col-span-1 md:row-span-2 h-full min-w-68 
                      2xl:-mt-20 flex flex-col md:max-2xl:justify-center">
        <Habits/>
      </div>
      {/* 4. TAREAS */}
        <div className='md:col-span-2 flex flex-col md:max-2xl:items-end
                        h-full'>
        <Tasks/>
      </div>
    </div>
   );
};