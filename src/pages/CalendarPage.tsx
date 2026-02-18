import { useEffect, useState } from 'react';
import { ActivityCalendar } from '../components/dashboard/Calendar';
import type { CalendarEvent} from '../core/types';
import { Clock } from '../components/dashboard/Clock';
import { EventFormWidget } from '../components/dashboard/CreateEvent';
import { EventService } from '../services/event.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { CalendarList } from '../components/dashboard/CalendarList';

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
      <div className="flex-1 grid grid-cols-1 gap-4 max-w-6xl mx-auto w-full content-start
                      px-3.5 pt-2 pb-13 
                      md:p-4 md:py-2 md:grid-cols-3
                      md:max-2xl:grid-flow-col">
        {/* Reloj */}
        <div className="md:col-span-2 md:relative md:mb-8 
                        max-2xl:hidden">
                  <Clock />
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