/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { TaskService } from "../../services/task.service";
import type { Task } from "../../core/types";

export const Tasks = () => {
     const [tasks, setTasks] = useState<Task[]>([]);
     const [newTask, setNewTask] = useState('');

     const loadData = async () => {
         try {      
          const [data] = await Promise.all([TaskService.getAll()])
          setTasks(data)
         } catch (error) {console.error("Error cargando dashboard:", error);}}
     

       // eslint-disable-next-line react-hooks/set-state-in-effect
     useEffect(() => {loadData();}, [])

     
       const handleAddTask = async (e: React.FormEvent) => {
         e.preventDefault();
         if (!newTask.trim()) return;
     
         try {
           const created = await TaskService.create(newTask);
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
           loadData(); 
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

       return(
          <div className=" border-2 border-foreground px-6 pt-5 shadow-[6px_6px_0px_0px_var(--foreground)] bg-background flex flex-col 
                         h-fit ">
           <div className="flex justify-between items-end mb-3 border-b-2 border-foreground pb-2">
             <h2 className="text-3xl md:text-xl font-black uppercase tracking-tight">Tasks</h2>
             <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">JUST DO IT</span>
           </div>
           
           <form onSubmit={handleAddTask} className="flex gap-3 mb-2 md:mb-5">
            <div className="flex-1 relative">
                <span className="absolute left-0.5 top-5 md:top-3.5 -translate-y-1/2 font-bold text-3xl md:text-lg opacity-50 pb-1">›</span>
                <input 
                  placeholder="Nueva misión..." 
                  value={newTask} 
                  onChange={e => setNewTask(e.target.value)}
                  className="w-full absolute pl-5 pb-1 bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-lg md:text-sm placeholder:uppercase placeholder:text-lg md:placeholder:text-xs"/>
            </div>
            <button type="submit" className="md:font-bold text-4xl md:text-xl hover:text-gray-500 px-1">+</button>
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
                  

                  <div className="w-4 h-4 border-2 border-foreground flex-shrink-0 group-hover:bg-foreground transition-colors mt-2 md:mt-0" />
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
       )
}