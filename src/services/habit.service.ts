import  supabase  from '../core/supabase';
import { type Habit } from '../core/types';

export const HabitService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return data as Habit[];
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
  ,

  create: async (name: string) => {
    const { data, error } = await supabase
      .from('habits')
      .insert([{ name }])
      .select()
      .single();
      
    if (error) throw error;
    return data as Habit;
  },

  /**
   * Lógica de Negocio: Toggle inteligente
   * Calcula si debe sumar o restar racha basándose en el estado actual
   */
  toggle: async (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const isDoneToday = habit.last_completed_at === today;

    // Si ya estaba hecho hoy -> Lo desmarcamos (volvemos a ayer o null, restamos racha)
    // Si no estaba hecho hoy -> Lo marcamos (ponemos hoy, sumamos racha)
    const updates = isDoneToday
      ? { last_completed_at: null, streak_count: Math.max(0, habit.streak_count - 1) }
      : { last_completed_at: today, streak_count: habit.streak_count + 1 };

    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', habit.id)
      .select()
      .single();

    if (error) throw error;
    return data as Habit; // Devolvemos el hábito actualizado
  }
};