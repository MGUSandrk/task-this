import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

export const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getSession().then(({ data: { session } }) => {
          setIsAllowed(!!session)
          setLoading(false);
        });
  }, []);

  // ESTADO DE CARGA:
  if (loading ) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono uppercase tracking-widest animate-pulse">
        Cargando Sistema...
      </div>
    );
  }

  return isAllowed ? <Outlet /> : <Navigate to="/login" replace/>;
};