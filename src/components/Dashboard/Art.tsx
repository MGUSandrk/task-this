export const Art = () => {
     return(
<<<<<<< HEAD
          <div className="border-2 border-foreground h-65 md:w-70 shadow-[6px_6px_0px_0px_var(--foreground)] relative group overflow-hidden bg-zinc-900 md:mt-4" >
=======
          <div className="border-2 border-foreground h-65 md:w-70 shadow-[6px_6px_0px_0px_var(--foreground)] relative group overflow-hidden bg-zinc-900 2xl:mt-4" >
>>>>>>> 0aaa89a56bc0f1d9062a0d2546824203cd3ec45e
               {/* Imagen de fondo (URL Actualizada y Backup color) */}
               <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                    alt="Minimalist Architecture" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                    onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'; // Si falla, se muestra el fondo negro
                    }}
               />
               
               <div className="absolute inset-0 z-10 h-full flex flex-col justify-between p-6 pointer-events-none">
                    <div className="self-end border border-background text-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                    Daily_Mantra
                    </div>
                    <div className="text-right self-end">
                    <h2 className="text-3xl md:text-4xl font-black leading-[0.85] text-white drop-shadow-md">
                         LESS <br/>BUT <br/>BETTER
                    </h2>
                    <span className="text-[10px] text-gray-300 mt-2 block">— DIETER RAMS</span>
                    </div>
               </div>
               </div>
     )
}