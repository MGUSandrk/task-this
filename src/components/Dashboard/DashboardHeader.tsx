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
    <header className="w-full flex justify-between items-center border-b-2 border-foreground bg-background py-1 md:py-2 px-2 md:px-6 select-none">
      
      <div className="flex items-center gap-2">
        {/* Logo más compacto */}
        <div className="font-black text-lg tracking-tighter uppercase border-2 border-foreground px-1 md:px-2">
          TASK THIS.
        </div>
        <span className="font-mono text-sm md:text-[13px] uppercase opacity-60 mt-1">
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