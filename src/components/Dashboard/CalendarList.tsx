import { format, parse } from "date-fns";
import type { CalendarEvent } from "../../core/types";
import { isEventPast } from "../../core/utils";
import { es } from "date-fns/locale";

interface CalendarListProps{
     events: CalendarEvent[];
}

export const CalendarList = ({events}:CalendarListProps) =>{
     return(
          <div className="w-full md:w-80 border-2 border-foreground bg-background p-4 h-fit self-start shadow-[6px_6px_0px_0px_var(--foreground)]">
        <div className="mb-4 border-b-2 border-foreground pb-2">
          <h2 className="text-xl font-black uppercase tracking-tight">Actividades</h2>
          {/* <span className="text-xs font-bold opacity-50 uppercase tracking-widest">Actividades</span> */}
          {/* <h3 className="text-2xl font-black uppercase">
            {format(currentMonth, "MMMM", { locale: es })}
          </h3> */}
        </div>

        <div className="flex flex-col gap-3">
          {events.length > 0 ? (
            events.map((event) => {
              const isPast = isEventPast(event.event_date, event.event_time);
              const fechaLocal = parse(event.event_date, 'yyyy-MM-dd', new Date());
              return(
              <div key={event.id} className="flex items-start gap-3 group">
                {/* <div className="mt-1">
                  {act.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div> */}
                <div className="flex flex-1 justify-between">
                  <span className={` font-medium text-sm leading-tight ${isPast ? 'line-through opacity-50 disabled' : ''}`}>
                    {event.title} ({format(fechaLocal, 'EEEE d', { locale: es })})
                  </span>
                  <button 
                      onClick={() =>{}}
                      className={`
                        md:opacity-50 group-hover:opacity-100 transition-opacity
                        text-gray-400 hover:text-foreground
                      `}
                      title="Borrar Hábito"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
              </div>
            )})
          ) : (
            <div className="py-10 text-center opacity-40">
              <p className="text-sm font-mono">Nada para este mes.</p>
              {/* <p className="text-xs mt-1">¡Tómate un descanso!</p> */}
            </div>
          )}
        </div>
        
        {/* Botón opcional para agregar rápido */}
        {/* <button className="w-full mt-6 border-2 border-dashed border-gray-300 py-2 text-xs font-bold uppercase text-gray-400 hover:border-foreground hover:text-foreground transition-colors">
          + Agregar Tarea
        </button> */}
      </div>
     )
}