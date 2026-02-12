
export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-foreground bg-background py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono tracking-widest uppercase">
        
        {/* IZQUIERDA: COPYRIGHT & AÑO */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold">TASK THIS © {new Date().getFullYear()}</span>
          <span className="opacity-50">LATAM_SERVER_NODE_01</span>
        </div>

        {/* CENTRO: DEVELOPER */}
        <div className="flex items-center gap-2">
          <span className="opacity-50">ARCHITECTED BY</span>
          <a 
            //href="https://portfolio.tuweb.com" /* Pon tu portfolio o LinkedIn aquí */
            //target="_blank" 
            rel="noopener noreferrer"
            className="border-b border-foreground hover:bg-foreground hover:text-background transition-colors pb-0.5 font-bold"
          >
            MIRKO_SANDRK
          </a>
        </div>

        {/* DERECHA: REPO & STATUS */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/MGUSandrk/task-this" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline decoration-1 underline-offset-4 flex items-center gap-2"
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            SOURCE_CODE
          </a>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="opacity-50">SYSTEM_OK</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
