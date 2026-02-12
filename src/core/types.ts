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