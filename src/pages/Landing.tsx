import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className=''> 
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
      
      
      {/* SECCIÓN IZQUIERDA: COPYWRITING */}
      <div className="flex-1 space-y-8 text-left">
        <div className="inline-block px-3 py-1 border border-foreground text-xs font-bold tracking-widest bg-background">
          v1.0 BETA
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9]">
          TASK<br/>THIS.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-md leading-relaxed border-l-4 border-grid pl-6">
          Un sistema para trackear tu vida de manera minimalista y aumentar tu productividad. 
          <span className="block mt-4 font-bold text-foreground">
            Sin ruido. Solo foco.
          </span>
        </p>

        <div className="flex gap-4 pt-4">
          <Button onClick={() => navigate('/signup')} className="px-8 py-4 text-lg">
            EMPEZAR AHORA
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")} className="px-8 py-4 text-lg">
            INCIAR SESION
          </Button>
        </div>
      </div>

      {/* SECCIÓN DERECHA: VISUAL/PREVIEW */}
      <div className="flex-1 w-full max-w-md md:max-w-full flex justify-center">
        {/* Tarjeta decorativa estilo 'Swiss Design' */}
        <div className="relative w-full aspect-square max-w-md border-1 bg-foreground text-background p-8 flex flex-col justify-between shadow-[15px_15px_0px_0px_rgba(100,100,100,0.2)]">
          <div className="border-b border-background/20 pb-4">
            <h3 className="text-4xl font-mono">01</h3>
            <p className="text-sm tracking-widest opacity-70">v1.0 BETA</p>
          </div>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between items-center border border-background/20 p-2">
              <span>[ ] RELOJ</span>
              <span className="opacity-50">14:00</span>
            </div>
            <div className="flex justify-between items-center border border-background/20 p-2 bg-background text-foreground font-bold">
              <span>[x] HABITOS</span>
              <span>DONE</span>
            </div>
            <div className="flex justify-between items-center border border-background/20 p-2">
              <span>[ ] TAREAS</span>
              <span className="opacity-50">18:30</span>
            </div>
          </div>

          <div className="text-right text-xs opacity-50">
            SYSTEM STATUS: ONLINE
          </div>
        </div>
        
      </div>
      </div>
      <Footer />
    </div>
  );
};