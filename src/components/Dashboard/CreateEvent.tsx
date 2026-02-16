import React, { useState } from 'react';
import { Calendar, Clock, AlignLeft} from 'lucide-react';

interface EventFormData {
  title: string;
  date: string;
  time?: string;
  description?: string;
}

interface EventFormWidgetProps {
  className?: string;
  onSubmit: (data: EventFormData) => Promise<void>;
}

export const EventFormWidget = ({ className, onSubmit }: EventFormWidgetProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: new Date().toISOString().split('T')[0], // Por defecto Hoy
    time: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    setLoading(true);
    await onSubmit(formData);
    
    // Resetear form (mantenemos la fecha en hoy)
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      description: ''
    });
    setLoading(false);
  };

  return (
    <div className={`border-2 border-foreground bg-background p-5 shadow-[6px_6px_0px_0px_var(--foreground)] md:mt-4 h-65 w-70 ${className}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-1 border-b-2 border-foreground pb-1">
        <h2 className="text-xl font-black uppercase tracking-tight">New Event</h2>
        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest animate-pulse">
          Add +
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        
        {/* TITULO (Grande) */}
        <div className="relative group flex flex-1">
          <span className="absolute left-0.5 top-5 md:top-3.5 -translate-y-1/2 font-bold text-3xl md:text-lg opacity-50 pb-1">›</span>
          <input
            type="text"
            placeholder="TÍTULO DEL EVENTO..."
            required
                className="w-full pl-5 bg-transparent border-b-2 border-grid focus:border-foreground p-1 font-mono outline-none text-lg md:text-sm placeholder:uppercase placeholder:text-lg md:placeholder:text-xs"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <button disabled={loading} type="submit" className="md:font-bold text-4xl md:text-xl hover:text-gray-500 px-2 ">+</button>
        </div>

        {/* FECHA Y HORA (Grid) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Fecha */}
          <div className="relative">
            <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" />
            <input
              type="date"
              required
              className="w-full bg-background border-2 border-foreground/20 focus:border-foreground py-2 pl-7 pr-2 font-mono text-sm outline-none transition-all"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {/* Hora (Opcional) */}
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" />
            <input
              type="time"
              className="w-full bg-background border-2 border-dashed border-foreground/30 focus:border-foreground py-2 pl-9 pr-2 font-mono text-sm outline-none transition-all"
              value={formData.time}
              onChange={e => setFormData({...formData, time: e.target.value})}
            />
          </div>
        </div>

        {/* DESCRIPCIÓN (Textarea Opcional) */}
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 w-4 h-4 opacity-40" />
          <textarea
            rows={3}
            placeholder="Descripción..."
            className="w-full bg-background border-2 border-dashed border-foreground/30 focus:border-foreground py-2 pl-9 pr-2 text-sm outline-none resize-none transition-all placeholder:text-gray-400"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* BOTÓN SUBMIT */}
        {/* <button
          type="submit"
          disabled={loading}
          className="w-full justify-center g-foreground text-background font-black uppercase hover:bg-background hover:text-foreground hover:border-foreground transition-all active:translate-y-1 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? 'Guardando...' : 'Crear Evento'}
        </button> */}

      </form>
    </div>
  );
};