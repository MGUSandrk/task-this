import supabase  from '../core/supabase';

export const EventService = {
  create: async (eventData: { title: string; date: string; time?: string; description?: string }) => {
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title: eventData.title,
          event_date: eventData.date, // Mapeamos date -> event_date
          event_time: eventData.time || null, // Si viene string vacío, mandamos null
          description: eventData.description || null
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  getByRange: async (startDate: string, endDate: string) => {
    // startDate: '2026-02-01'
    // endDate:   '2026-02-28'
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', startDate) // Greater Than or Equal (Desde)
      .lte('event_date', endDate)   // Less Than or Equal (Hasta)
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
  }
};