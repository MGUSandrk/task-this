import  supabase  from '../core/supabase';
import { type Task } from '../core/types';

export const TaskService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Task[];
  },

  create: async (title: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title}])
      .select()
      .single();
      
    if (error) throw error;
    return data as Task;
  },

  toggle: async (id: string, isCompleted: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: isCompleted })
      .eq('id', id);
      
    if (error) throw error;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};