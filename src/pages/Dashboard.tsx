/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import  supabase  from '../core/supabase';

// Imports modulares (Clean Architecture)
import { TaskService } from '../services/task.service';
import { type Task } from '../core/types';
import { HabitService } from '../services/habit.service';
import { type Habit } from '../core/types';

import { Clock } from '../components/Dashboard/Clock'; // Asumo que moviste Clock a features/clock/Clock.tsx
import { DashboardHeader } from '../components/Dashboard/DashboardHeader';

export const Dashboard = () => {
  // --- STATE ---
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Inputs State
  const [newTask, setNewTask] = useState('');
  const [newHabit, setNewHabit] = useState('');

  // Helper para fechas (YYYY-MM-DD)
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // --- CARGA DE DATOS ---
  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Carga paralela para mayor velocidad
        const [t, h] = await Promise.all([
          TaskService.getAll(), 
          HabitService.getAll()
        ]);
        setTasks(t || []);
        setHabits(h || []);
      }
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- HANDLERS TAREAS ---
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user) return;

    try {
      const created = await TaskService.create(newTask, user.id);
      setTasks([created, ...tasks]); // Optimistic add to top
      setNewTask('');
    } catch (e) { console.error(e); }
  };

  const handleToggleTask = async (task: Task) => {
    // Optimistic Update: Actualizamos UI inmediatamente
    const updatedTasks = tasks.map(t => 
      t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
    );
    setTasks(updatedTasks);

    try {
      await TaskService.toggle(task.id, !task.is_completed);
    } catch (e) { 
      loadData(); // Si falla, revertimos al estado real
    }
  };

  const handleDeleteTask = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el click active el toggle
    // Optimistic Delete
    setTasks(tasks.filter(t => t.id !== id));
    
    try {
      await TaskService.delete(id);
    } catch (e) {
      loadData(); // Revertir
    }
  }

  // --- HANDLERS HÁBITOS ---
  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim() || !user) return;

    try {
      const created = await HabitService.create(newHabit, user.id);
      setHabits([...habits, created]);
      setNewHabit('');
    } catch (e) { console.error(e); }
  };

  const handleToggleHabit = async (habit: Habit) => {
    // Aquí esperamos al servidor porque la lógica de racha es compleja
    try {
      const updatedHabit = await HabitService.toggle(habit);
      setHabits(habits.map(h => h.id === habit.id ? updatedHabit : h));
    } catch (e) { 
      console.error(e);
    }
  };

  const handleDeleteHabit = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se marque/desmarque al borrar
    
    // Actualización Optimista
    setHabits(habits.filter(h => h.id !== id));

    try {
      // Asumiendo que agregaste el método delete a tu HabitService
      // Si no, debes agregarlo en habit.service.ts similar al de tareas
      await HabitService.delete(id); 
    } catch (e) {
      loadData(); // Revertir si falla
    }
  };
  
  // --- RENDER ---
  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono uppercase tracking-widest animate-pulse">Cargando Sistema...</div>;

  return (
    <div className="w-full min-h-screen bg-background flex flex-col font-mono text-foreground overflow-x-hidden transition-colors duration-300 ">
      
      <DashboardHeader userName={user?.user_metadata?.full_name} />

      {/* LAYOUT PRINCIPAL: 3 COLUMNAS ASIMÉTRICAS */}
      <div className="flex-1 px-2 md:p-4 py-2 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full content-start">
        
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
        <div className="md:col-span-1 border-2 border-foreground min-h-80 md:min-w-40 md:max-w-80 md:justi shadow-[6px_6px_0px_0px_var(--foreground)] relative group overflow-hidden bg-zinc-900 md:-mb-5 md:mt-4" >
          {/* Imagen de fondo (URL Actualizada y Backup color) */}
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Minimalist Architecture" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'; // Si falla, se muestra el fondo negro
            }}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-between p-6 pointer-events-none">
             <div className="self-end border border-background text-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
               Daily_Mantra
             </div>
             <div className="text-right self-end">
               <h2 className="text-3xl md:text-4xl font-black leading-[0.85] text-white drop-shadow-md">
                 LESS <br/>BUT <br/>BETTER
               </h2>
               <span className="text-[10px] text-gray-300 mt-2 block">— DIETER RAMS</span>
             </div>
          </div>
        </div>

        {/* --- FILA 2 --- */}

       {/* 3. HÁBITOS */}
        <div className=" md:col-span-1 border-2 border-foreground p-5 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background h-fit">
          <div className="flex justify-between items-end mb-3 border-b-2 border-foreground pb-2">
             <h2 className="text-3xl md:text-xl font-black uppercase tracking-tight">Habits</h2>
             <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">PLS KEEP</span>
           </div>

          <form onSubmit={handleAddHabit} className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <span className="absolute left-0.5 top-5 md:top-3.5 -translate-y-1/2 font-bold text-3xl md:text-lg opacity-50 pb-1">›</span>
              <input 
                placeholder="Nuevo Hábito..." 
                value={newHabit} 
                onChange={e => setNewHabit(e.target.value)}
                className="w-full absolute pl-5 bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-lg md:text-sm placeholder:uppercase placeholder:text-lg md:placeholder:text-xs"
              />
            </div>
            <button type="submit" className="font-bold text-xl hover:text-gray-500 px-2">+</button>
          </form>

          {/* <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
            <div className="flex-1 relative">
                <span className="absolute left-0.5 top-5 md:top-3.5 -translate-y-1/2 font-bold text-3xl md:text-lg opacity-50 pb-1">›</span>
                <input 
                  placeholder="Nueva misión..." 
                  value={newTask} 
                  onChange={e => setNewTask(e.target.value)}
                  className="w-full absolute pl-5 pb-1 bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-lg md:text-sm placeholder:uppercase placeholder:text-lg md:placeholder:text-xs"/>
            </div>
            <button type="submit" className="font-bold text-xl hover:text-gray-500 px-2">+</button>
          </form> */}

          <div className="flex flex-col gap-3">
            {habits.map(habit => {
               const isDone = habit.last_completed_at === getTodayStr();
               return (
                <div 
                  key={habit.id}
                  onClick={() => handleToggleHabit(habit)}
                  className={`
                    group cursor-pointer w-full border-2 border-foreground p-2 md:p-3 
                    flex items-center justify-between transition-all hover:translate-x-1 active:scale-[0.98]
                    ${isDone ? 'bg-foreground text-background' : 'bg-background hover:bg-grid/10'}
                  `}
                >
                  <span className={`font-bold text-lg md:text-xs uppercase tracking-wide truncate pr-2 ${isDone ? "line-through" : ""}`}>{habit.name}</span>
                  
                  {/* CONTENEDOR DERECHO: Icono Borrar + Días + Checkbox */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    
                    {/* BOTÓN BORRAR: Ahora está en el flujo, no absoluto */}
                    <button 
                      onClick={(e) => handleDeleteHabit(habit.id, e)}
                      className={`
                        md:opacity-0 group-hover:opacity-100 transition-opacity p-1
                        text-gray-400 hover:text-foreground
                      `}
                      title="Borrar Hábito"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>

                    <span className={`text-[10px] font-mono border px-1 ${isDone ? 'border-background' : 'border-foreground'}`}>
                      {habit.streak_count}D
                    </span>

            
                  </div>
                </div>
               )
            })}
            {habits.length === 0 && <p className="opacity-40 text-[10px] text-center uppercase mt-4">No habits tracking</p>}
          </div>
        </div>

        {/* 4. TAREAS */}
        <div className="md:col-span-2 border-2 border-foreground px-6 pt-5 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background flex flex-col 
                        md:w-120 md:ml-20 md:mt-10 md:flex-1 md:relative h-fit md:min-h-70">
           <div className="flex justify-between items-end mb-3 border-b-2 border-foreground pb-2">
             <h2 className="text-3xl md:text-xl font-black uppercase tracking-tight">Tasks</h2>
             <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">JUST DO IT</span>
           </div>
           
           <form onSubmit={handleAddTask} className="flex gap-3 mb-5">
            <div className="flex-1 relative">
                <span className="absolute left-0.5 top-5 md:top-3.5 -translate-y-1/2 font-bold text-3xl md:text-lg opacity-50 pb-1">›</span>
                <input 
                  placeholder="Nueva misión..." 
                  value={newTask} 
                  onChange={e => setNewTask(e.target.value)}
                  className="w-full absolute pl-5 pb-1 bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-lg md:text-sm placeholder:uppercase placeholder:text-lg md:placeholder:text-xs"/>
            </div>
            <button type="submit" className="font-bold text-xl hover:text-gray-500 px-2">+</button>
          </form>

          {/* LISTA TAREAS (flex-1 para empujar el archivo abajo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 flex-1 md:justify-items-center pb-2">
             {tasks.filter(t => !t.is_completed).map(task => (
               <div 
                 key={task.id} 
                 onClick={() => handleToggleTask(task)}
                 className="group flex items-center gap-2 border border-transparent hover:border-grid transition-all cursor-pointer hover:bg-grid/5 h-fit "
               >
                  {/* Icono Tacho (Izquierda) */}
                  

                  <div className="w-4 h-4 border-2 border-foreground flex-shrink-0 group-hover:bg-foreground transition-colors mt-1.5 md:mt-0" />
                  <span className="flex-1 text-xl md:text-sm font-medium leading-tight pt-2 md:pt-0.5 break-words select-none ">{task.title}</span>
                  <button 
                    onClick={(e) => handleDeleteTask(task.id, e)} 
                    className="md:opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-gray-400 hover:text-foreground mt-1.5 md:mt-0"
                    title="Borrar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
               </div>
               
             ))}
             
          </div>

          {tasks.filter(t => !t.is_completed).length === 0 && (
            <div className="text-center py-10 opacity-40 text-sm w-full flex-1">
               [ SYSTEM IDLE ]<br/>No active tasks.
            </div>
          )}

          {/* ARCHIVO (Siempre abajo gracias a flex-col + mt-auto en el padre) */}
          {tasks.some(t => t.is_completed) && (
            <div className="mt-auto border-t border-grid pt-2 opacity-50 hover:opacity-100 transition-opacity pb-2 flex-col">
              <p className="text-[10px] font-bold uppercase mb-1">Historial (Click para restaurar)</p>
              <div className="flex flex-wrap gap-2">
                {tasks.filter(t => t.is_completed).map(task => (
                  <button
                    key={task.id}
                    onClick={() => handleToggleTask(task)}
                    className="text-lg md:text-xs font-mono line-through decoration-1 hover:no-underline hover:font-bold border border-transparent hover:border-foreground px-2 transition-all"
                  >
                    {task.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};