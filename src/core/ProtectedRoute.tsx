import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoute = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sesión actual al montar (Recuperar al refrescar F5)
    AuthService.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchar cambios (Por si se loguea en otra pestaña o se le vence el token)
    const subscription = AuthService.onAuthStateChange(() => {
      setSession(session);
      setLoading(false);
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

  return session ? <Outlet /> : <Navigate to="/login" replace/>;
};