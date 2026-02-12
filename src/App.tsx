import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, type SetStateAction } from 'react';
import { AuthService } from './services/auth.service';
import type { Session } from '@supabase/supabase-js';

// Layouts
import { RootLayout } from './components/layouts/RootLayout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto de autenticación (igual que antes)
  useEffect(() => {
    AuthService.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const subscription = AuthService.onAuthStateChange((session: SetStateAction<Session | null>) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono uppercase tracking-widest animate-pulse">
        Cargando Sistema...
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<RootLayout />}>
        
        {/* Rutas Públicas */}
        <Route path="/" element={!session ? <Landing /> : <Navigate to="/app" />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/app" />} />
        <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/app" />} />
        
        {/* Rutas Privadas */}
        <Route 
          path="/app" 
          element={session ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
}

export default App;