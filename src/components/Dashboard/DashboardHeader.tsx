import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { Button } from '../ui/Button';

interface HeaderProps {
  userName: string | null;
}

export const DashboardHeader = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.signOut();
    navigate('/login');
  };

  return (
    // HEADER FINO: py-3 en lugar de p-6
    <header className="w-full flex justify-between items-center border-b-2 border-foreground bg-background py-3 px-6 select-none">
      
      <div className="flex items-center gap-3">
        {/* Logo más compacto */}
        <div className="font-black text-lg tracking-tighter uppercase border border-foreground px-2">
          TASK THIS.
        </div>
        <span className="font-mono text-md md:text-[10px] uppercase opacity-60 mt-1">
          {userName || 'GHOST'}
        </span>
      </div>

      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="py-1 px-3 text-[10px] h-auto border-foreground hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors uppercase tracking-widest"
      >
        Salir
      </Button>
    </header>
  );
};