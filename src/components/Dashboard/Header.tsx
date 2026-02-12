import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';

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

      <button
        onClick={handleLogout}
        className="bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background 
         hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors uppercase tracking-widest
         p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

      </button>
    </header>
  );
};