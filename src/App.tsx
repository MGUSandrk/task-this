import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { RootLayout } from './components/layouts/RootLayout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './core/ProtectedRoute';
import { CalendarPage } from './pages/CalendarPage';
import { AppLayout } from './components/layouts/AppLayout';

function App() {

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Rutas Públicas */}
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* Rutas Privadas */}
        <Route element={<ProtectedRoute />}>
         <Route element={<AppLayout/>}>
          <Route path="/app" element={<Dashboard />} />
          <Route path='/calendar' element={<CalendarPage/>}/>
         </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;