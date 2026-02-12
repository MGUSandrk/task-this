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
      <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full items-start mr-100">
        
        {/* 1. RELOJ (Focal Point - 2/3 ancho) */}
        <div className="justify-self-center md:col-span-2 border-2 border-foreground p-8 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background flex flex-col justify-center items-center md:min-h-[280px] relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
           <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
             System_Time
           </div>
           <Clock />
        </div>

        {/* 2. ARTE + FRASE (Decorativo - 1/3 ancho) */}
        <div className="md:col-span-1 border-2 border-foreground h-full min-h-[280px] shadow-[6px_6px_0px_0px_var(--foreground)] relative group overflow-hidden bg-zinc-900">
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
             <div className="text-right">
               <h2 className="text-3xl md:text-4xl font-black leading-[0.85] text-white drop-shadow-md">
                 LESS <br/>BUT <br/>BETTER
               </h2>
               <span className="text-[10px] text-gray-300 mt-2 block">— DIETER RAMS</span>
             </div>
          </div>
        </div>

        {/* --- FILA 2 --- */}

       {/* 3. HÁBITOS */}
        <div className="mx-10 md:mb-30 md:ml-10 md:col-span-1 border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background h-fit self-end">
          <div className="flex justify-between items-end mb-6 border-b-2 border-foreground pb-2">
             <h2 className="text-xl font-black uppercase tracking-tight">Habits</h2>
             <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">PLS KEEP</span>
           </div>

          <form onSubmit={handleAddHabit} className="flex gap-2 mb-6">
            <input 
              placeholder="Nuevo Hábito..." 
              value={newHabit} 
              onChange={e => setNewHabit(e.target.value)}
              className="w-full bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-sm placeholder:uppercase placeholder:text-xs"
            />
            <button type="submit" className="font-bold text-xl hover:text-gray-500 px-2">+</button>
          </form>

          <div className="flex flex-col gap-3">
            {habits.map(habit => {
               const isDone = habit.last_completed_at === getTodayStr();
               return (
                <div 
                  key={habit.id}
                  onClick={() => handleToggleHabit(habit)}
                  className={`
                    group cursor-pointer w-full border-2 border-foreground p-3 
                    flex items-center justify-between transition-all hover:translate-x-1 active:scale-[0.98]
                    ${isDone ? 'bg-foreground text-background' : 'bg-background hover:bg-grid/10'}
                  `}
                >
                  <span className={`font-bold text-xs uppercase tracking-wide truncate pr-2 ${isDone ? "line-through" : ""}`}>{habit.name}</span>
                  
                  {/* CONTENEDOR DERECHO: Icono Borrar + Días + Checkbox */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    
                    {/* BOTÓN BORRAR: Ahora está en el flujo, no absoluto */}
                    <button 
                      onClick={(e) => handleDeleteHabit(habit.id, e)}
                      className={`
                        opacity-0 group-hover:opacity-100 transition-opacity p-1
                        ${isDone ? 'text-background hover:text-gray-300' : 'text-gray-400 hover:text-foreground'}
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
        <div className="mx-10 md:ml-40 md:col-span-2 border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background min-h-[400px] max-w-xl flex flex-col ">
           <div className="flex justify-between items-end mb-6 border-b-2 border-foreground pb-2">
             <h2 className="text-xl font-black uppercase tracking-tight">Tasks</h2>
             <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">JUST DO IT</span>
           </div>
           
           <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
            <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-lg opacity-50 pb-1">›</span>
                <input 
                  placeholder="Nueva misión..." 
                  value={newTask} 
                  onChange={e => setNewTask(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-sm placeholder:uppercase placeholder:text-xs"/>
            </div>
            <button type="submit" className="font-bold text-xl hover:text-gray-500 px-2">+</button>
          </form>

          {/* LISTA TAREAS (flex-1 para empujar el archivo abajo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 content-start justify-items-center">
             {tasks.filter(t => !t.is_completed).map(task => (
               <div 
                 key={task.id} 
                 onClick={() => handleToggleTask(task)}
                 className="group flex items-center gap-3 p-3 pr-10 sm:pr-0 border border-transparent hover:border-grid transition-all cursor-pointer hover:bg-grid/5 h-fit "
               >
                  {/* Icono Tacho (Izquierda) */}
                  <button 
                    onClick={(e) => handleDeleteTask(task.id, e)} 
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-foreground"
                    title="Borrar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>

                  <div className="w-4 h-4 border-2 border-foreground flex-shrink-0 group-hover:bg-foreground transition-colors" />
                  <span className="flex-1 text-sm font-medium leading-tight pt-0.5 break-words select-none ">{task.title}</span>
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
            <div className="mt-auto border-t border-grid pt-4 opacity-50 hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-bold uppercase mb-2">Archivo (Click para restaurar)</p>
              <div className="flex flex-wrap gap-2">
                {tasks.filter(t => t.is_completed).map(task => (
                  <button
                    key={task.id}
                    onClick={() => handleToggleTask(task)}
                    className="text-xs font-mono line-through decoration-1 hover:no-underline hover:font-bold border border-transparent hover:border-foreground px-2 py-1 transition-all"
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