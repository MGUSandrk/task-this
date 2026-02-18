export const isEventPast = (dateStr: string, timeStr?: string | null): boolean => {
  const now = new Date();
  
  // 1. Construimos la fecha del evento
  // Si tiene hora, usamos esa hora.
  // Si NO tiene hora, le ponemos "23:59:59" para que dure todo el día de hoy.
  const timeComponent = timeStr ? timeStr : '23:59:59';
  
  // Creamos el objeto Date (El navegador asume zona horaria local al usar T sin Z)
  const eventDate = new Date(`${dateStr}T${timeComponent}`);

  // 2. Comparamos (Retorna true si el evento es menor a "ahora")
  return eventDate < now;
};