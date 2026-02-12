import supabase  from '../core/supabase';

export const AuthService = {
  // 1. Registro con Email/Pass y Metadatos (Nombre)
  signUp: async (email: string, password: string, fullName: string) => {
    return await supabase.auth.signUp({email,password,options: {data: { full_name: fullName },},});
  },

  signInWithPassword: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({email,password,});
  },

  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({provider: 'google',options: {redirectTo: window.location.origin,}});
  },
  
  signOut: async () => await supabase.auth.signOut(),

  getSession: async () => await supabase.auth.getSession(),

  getUser: async () => await supabase.auth.getUser(),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAuthStateChange: (callback: any) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
    return subscription
  }
  
};