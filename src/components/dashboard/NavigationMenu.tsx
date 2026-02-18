import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Settings } from 'lucide-react';

interface SidebarNavProps {
  className?: string;
}

export const SidebarNav = ({ className = '' }: SidebarNavProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/app', icon: Home, exact: true },
    { path: '/calendar', icon: CalendarDays, exact: false },
    { path: '/app', icon: Settings, exact: false }
  ];

  return (
    // CONTENEDOR PRINCIPAL: Un rectángulo vertical con borde grueso y sombra dura
    <nav className={`
      left-2 -translate-y-1/2 z-50
      flex flex-row sm:flex-col w-fit h-fit
      bg-background 
      border-2 border-foreground 
      sm:shadow-[6px_6px_0px_0px_var(--foreground)]
      ${className}
    `}>
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        
        // Lógica de activo
        const isActive = item.exact 
          ? location.pathname === item.path
          : location.pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            title={item.path} // Tooltip nativo simple
            className={`
              /* DIMENSIONES: Cuadrado perfecto (w-13 h-13 = 64px) */a
              w-13 h-13
              flex items-center justify-center
              transition-colors duration-200
              
              /* BORDES INTERNOS: Solo ponemos borde abajo si NO es el último */
              ${index !== menuItems.length - 1 ? 'border-b-2 border-foreground' : ''}

              /* ESTADOS (Activo vs Inactivo) */
              ${isActive 
                ? 'bg-foreground text-background' // Activo: Negro con icono blanco
                : 'bg-background text-foreground hover:bg-neutral-200' // Inactivo: Blanco hover gris
              }
            `}
          >
            {/* ICONO: Grande y grueso */}
            <Icon className="w-7 h-7 stroke-[2px]" />
          </Link>
        );
      })}
    </nav>
  );
};