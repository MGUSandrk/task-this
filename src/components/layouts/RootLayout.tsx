import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = () => {
  return (
    // CONTENEDOR MAESTRO
    <div className="min-h-screen w-full bg-background text-foreground font-mono relative overflow-x-hidden">
      
      {/* CAPA DE FONDO (GRID INFINITA) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.6] z-0 pointer-events-none" />

      {/* CONTENEDOR DE CONTENIDO - Ya no restringe el ancho globalmente */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Aquí renderizamos las páginas. Ellas decidirán su propio ancho. */}
        <Outlet />
      </main>
      
    </div>
  );
};