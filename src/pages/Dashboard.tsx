/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState} from 'react';
import { Clock } from '../components/Dashboard/Clock'; // Asumo que moviste Clock a features/clock/Clock.tsx
import { DashboardHeader } from '../components/Dashboard/Header';
import { Habits } from '../components/Dashboard/Habits';
import { Art } from '../components/Dashboard/Art';
import { Tasks } from '../components/Dashboard/Tasks';
import { AuthService } from '../services/auth.service';

export const Dashboard = () => {
  // --- STATE ---
  const [user, setUser] = useState<any>(null);

  const loadData = async () => {
           try {      
            const { data: { user } } = await AuthService.getUser()
            setUser(user)
           } catch (error) {console.error("Error cargando dashboard:", error);}}

           
         // eslint-disable-next-line react-hooks/set-state-in-effect
       useEffect(() => {loadData();}, [])

  return (
    <div className="w-full min-h-screen bg-background flex flex-col font-mono text-foreground overflow-x-hidden transition-colors duration-300 ">

      <DashboardHeader userName={user?.user_metadata?.full_name} />

      {/* LAYOUT PRINCIPAL: 3 COLUMNAS ASIMÉTRICAS */}
      <div className="flex-1 px-3.5 md:p-4 py-2 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full content-start">
        {/* 1. RELOJ (Focal Point - 2/3 ancho) */}
        <div className="md:col-span-2 md:relative md:mr-5 md:mb-8 ">
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