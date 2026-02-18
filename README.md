# TASK THIS.

> **App WEB para trackear tu vida. https://taskthisxd.vercel.app/**

![Project Banner](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)

## 📋 Sobre el Proyecto

**Task This** nace como una respuesta al ruido visual de las aplicaciones modernas. Inspirado en el **Brutalismo Digital** este proyecto busca ofrecer una interfaz donde la funcionalidad dicta la forma.

**[V1.0]**
El objetivo es simple: proveer un espacio digital limpio para gestionar tareas ("Just Do It") y construir hábitos consistentes ("Pls Keep"), utilizando una arquitectura de información basada en bloques flotantes y tipografía monoespaciada.

**[V2.0]**
Calendario para anotar eventos y lista de eventos del mes.

### ✨ Características Principales

* **Dashboard Asimétrico:** Diseño de grilla flexible con bloques funcionales independientes.
* **Gestión de Tareas:** Sistema CRUD completo con modo "Focus" y archivo de completados.
* **Rastreador de Hábitos:** Algoritmo de "Racha" (Streak) con reinicio diario automático (Computed State).
* **Reloj Minimalista:** Visualización de tiempo en tiempo real como punto focal.
* **Estética Brutalista:** Uso intensivo de bordes, alto contraste y tipografía técnica (`JetBrains Mono`).
* **Modo Oscuro/Claro:** Adaptable a la preferencia del sistema (vía Tailwind).

---

## 🛠 Tech Stack

El proyecto fue construido utilizando tecnologías modernas, priorizando el rendimiento, la escalabilidad y la experiencia de desarrollo.

### Frontend
* **[React](https://reactjs.org/)** (Vite): Biblioteca principal para la UI.
* **[TypeScript](https://www.typescriptlang.org/):** Para un código robusto y tipado estático.
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilidad para el diseño brutalista y sistema de grillas.
* **[React Router](https://reactrouter.com/):** Gestión de rutas y navegación SPA.
### Backend & Servicios
* **[Supabase](https://supabase.com/):** Backend-as-a-Service (BaaS).
    * **Auth:** Autenticación segura de usuarios.
    * **PostgreSQL:** Base de datos relacional robusta.
    * **Row Level Security (RLS):** Políticas de seguridad a nivel de fila para proteger los datos de usuario.
