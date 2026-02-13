import React, { useEffect, useState } from 'react';
import type { Habit } from '../../core/types'; // Asegúrate de importar tu tipo Habit
import { HabitService } from '../../services/habit.service';
 // Asegúrate de importar tu tipo Habit

interface HabitsWidgetProps {
  className?: string
}

export const Habits = ({
  className = ""
}: HabitsWidgetProps) => {
const [habits, setHabits] = useState<Habit[]>([])
const [newHabit, setNewHabit] = useState('')

  const loadData = async () => {
    try {      
     const [data] = await Promise.all([HabitService.getAll()])
     setHabits(data)
    } catch (error) {console.error("Error cargando dashboard:", error);}}

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {loadData();}, [])

     // --- HANDLERS HÁBITOS ---
  const handleAddHabit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!newHabit.trim()) return;
     try {
          const created = await HabitService.create(newHabit);
          setHabits([...habits, created]);
          setNewHabit('');
     } catch (e) { console.error(e); }}
     

  const handleToggleHabit = async (habit: Habit) => {
     // Aquí esperamos al servidor porque la lógica de racha es compleja
     try {
          const updatedHabit = await HabitService.toggle(habit);
          setHabits(habits.map(h => h.id === habit.id ? updatedHabit : h));
     } catch (e) {  console.error(e);}}
     

  const handleDeleteHabit = async (id: string, e: React.MouseEvent) => {
     e.stopPropagation(); // Evita que se marque/desmarque al borrar
     // // Actualización Optimista
     setHabits(habits.filter(h => h.id !== id))
     try {
          await HabitService.delete(id); 
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (e) {loadData()}}

  // Helper interno (o impórtalo de tus utils si es compartido)
  const getTodayStr = () => new Date().toLocaleDateString('sv-SE').split('T')[0];

  return (
    <div className={`border-2 border-foreground p-5 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background h-fit ${className}`}>
      {/* HEADER */}
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
            <button type="submit" className="md:font-bold text-4xl md:text-xl hover:text-gray-500 px-2 ">+</button>
          </form>

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
  );
};