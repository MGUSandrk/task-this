import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  startOfDay,
  isBefore
} from 'date-fns';

import { es } from 'date-fns/locale'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getConsistentPastelBg } from '../colors';
import type { CalendarEvent } from '../../core/types';

interface ActivityCalendarProps {
  events: CalendarEvent[];
  currentMonth: Date;           
  onMonthChange: (date: Date) => void;
}

export const ActivityCalendar = ({ events, currentMonth, onMonthChange }: ActivityCalendarProps) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => onMonthChange(addMonths(currentMonth, 1));
  const prevMonth = () => onMonthChange(subMonths(currentMonth, 1));

  

  return (
    <div className="flex flex-col md:flex-row max-h-xl w-full max-w-5xl">
      {/* --- SECCIÓN IZQUIERDA: CALENDARIO --- */}
      <div className="flex-1 border-2 border-foreground bg-background shadow-[6px_6px_0px_0px_var(--foreground)] p-4 max-w-xl max-h-sm ">
        {/* Header del Calendario */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-1 hover:bg-neutral-100 border border-transparent hover:border-foreground transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-neutral-100 border border-transparent hover:border-foreground transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
            <div key={day} className="text-center text-xs font-bold opacity-50 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grid de Días */}
        <div className="grid grid-cols-7 gap-1 auto-rows-[1fr]"> 
          {calendarDays.map((day) => {
            // Buscamos si hay actividades ese día para poner un indicador
            // (Usamos un string simple para comparar, idealmente usar tu util date)
            const dayStr = format(day, 'yyyy-MM-dd');
            const hasActivity = events.some(a => a.event_date === dayStr);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const randomBg = hasActivity ? getConsistentPastelBg(dayStr) : '';
            const today = startOfDay(new Date());
            const isPast = isBefore(day, today);

            return (
              <div
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative min-h-20 md:min-h-18 p-1 border transition-all cursor-pointer flex flex-col justify-between
                  ${!isCurrentMonth ? 'opacity-30 bg-neutral-50 border-dashed' : 'bg-background border-foreground/20'}
                  ${isSameDay(day, selectedDate) ? '' : ''}
                  ${isToday(day) ? '' : ''}
                  ${hasActivity ? randomBg:''}
                `}
              >
                {/* --- LA CRUZ (Solo si es pasado) --- */}
              {isPast && (
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 text-foreground p-6" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {/* Línea de arriba-izq a abajo-der */}
                  <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* Línea de arriba-der a abajo-izq */}
                  <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              )}
                {/* Número del día */}
                <div className={` ${isToday(day) ? 'border mr-9.5 rounded-4xl' : ''}`}>
                <span className={`text-sm font-mono font-bold pl-0.5`}>
                  {format(day, 'd')}
                </span>
                </div>

                {/* Indicadores de Actividad */}
                {/* <div className="flex">
                  Aquí filtramos las actividades de este día específico para pintar puntitos
                  {events.filter(a => a.date === dayStr).slice(0, 4).map((act, i) => (
                    <div 
                      key={i} 
                      className={`w-full h-20 ${act.completed ? 'bg-foreground' : 'bg-neutral-700'}`} 
                      title={act.title}
                    />
                  ))}
                  {events.filter(a => a.date === dayStr).length > 4 && (
                    <span className="text-[8px] leading-none text-gray-500">+</span>
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

      
    </div>
  );
};