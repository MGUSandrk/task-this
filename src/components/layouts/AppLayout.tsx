import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../dashboard/NavigationMenu';
import { DashboardHeader } from '../dashboard/Header';

export const AppLayout = () => {
  return (
    // 1. CONTENEDOR MAESTRO (Viewport)
    <div className="w-screen h-screen bg-background flex flex-col font-mono text-foreground overflow-hidden">
      
      {/* 2. HEADER (Full Width / Pegado arriba) */}
      <div className="flex-none w-full z-30 relative">
        <DashboardHeader userName={null} />
      </div>

      {/* 3. CONTENEDOR DEL CUERPO (Sidebar + Main) */}
      <div className="flex flex-1 min-h-0 overflow-hidden w-full relative">
        
        {/* A. SIDEBAR (Izquierda) */}
        <aside className="hidden md:flex flex-col justify-start mt-20 p-4 border-r-2 border-transparent z-20 h-full">
          <SidebarNav />
        </aside>

        {/* B. ÁREA DE CONTENIDO (Derecha) */}
        <main className="flex flex-1 overflow-y-auto scroll-smooth bg-background w-full
                         md:max-2xl:justify-items-center md:-ml-22
                         max-sm:p-2">
          {/* Contenedor centralizado para pantallas muy anchas */}
          <div className="max-w-7xl mx-auto h-full ">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};