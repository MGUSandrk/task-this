import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoute = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) setLoading(false); 
    });

    const  {data:{subscription}}  = AuthService.onAuthStateChange((event, session) => {
      // Este evento se dispara cuando Supabase termina de leer el LocalStorage
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ESTADO DE CARGA:
  if (loading ) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono uppercase tracking-widest animate-pulse">
        Cargando Sistema...
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/" replace/>;
};