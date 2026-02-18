/* eslint-disable @typescript-eslint/no-unused-vars */
// En Dashboard.tsx
import { useEffect, useState } from 'react';
import { ActivityCalendar } from '../components/Dashboard/Calendar';
import type { CalendarEvent} from '../core/types';
import { DashboardHeader } from '../components/Dashboard/Header';
import { AuthService } from '../services/auth.service';
import { Clock } from '../components/Dashboard/Clock';
import { EventFormWidget } from '../components/Dashboard/CreateEvent';
import { EventService } from '../services/event.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { CalendarList } from '../components/Dashboard/CalendarList';

export const CalendarPage = () =>{

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]); 

  useEffect(() => {
    const fetchMonthData = async () => {
      // setLoading(true);
      try {
        const start = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
        const end = format(endOfMonth(currentMonth), 'yyyy-MM-dd');
        
        const data = await EventService.getByRange(start, end);
        setEvents(data);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
      //  finally {
      //   setLoading(false);
      // }
    }
    fetchMonthData();
  }, [currentMonth]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateEvent = async (data: any) => {
      // 1. Aquí llamas a tu service
      await EventService.create(data); 
      
      console.log("Creando evento:", data);
    };
return (
      <div className="flex-1 px-3.5 pt-2 pb-13  grid grid-cols-1  gap-4 max-w-6xl mx-auto w-full content-start
                      md:max-2xl:grid-flow-col
                      md:p-4 md:py-2 md:grid-cols-3">
        {/* Reloj */}
        <div className="md:col-span-2 md:relative md:mb-8 
                        max-2xl:hidden">
              <div className="border-2 border-foreground px-4 shadow-[6px_6px_0px_0px_var(--foreground)] h-35 
                              md:h-45 md:absolute md:right-2 md:bottom-2
                              bg-background flex flex-col justify-center items-center overflow-hidden group transition-transform relative">
                        <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                            System_Time
                        </div>
                  <Clock />
              </div>
        </div>
        <div className="w-full flex md:col-span-1">
         <EventFormWidget onSubmit={handleCreateEvent} />
        </div>
        <div className='flex md:col-span-1
                        md:max-xl:
                        2xl:mt-10'>
          <CalendarList events={events} />
        </div>
        <div className='md:col-span-2 md:max-2xl:row-span-2  '>
              <ActivityCalendar events={events} currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
        </div>
    </div>
);
}