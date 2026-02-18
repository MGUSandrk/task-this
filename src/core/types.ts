export interface Task {
  id: string;
  user_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  streak_count: number;
  last_completed_at: string | null; // YYYY-MM-DD
}

// src/types/index.ts (o donde tengas tus tipos)

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string | null; // Puede ser null desde la BDD
  event_date: string;          // Supabase devuelve fechas como string YYYY-MM-DD
  event_time?: string | null;  // Supabase devuelve hora como string HH:MM:SS
  created_at: string;
}