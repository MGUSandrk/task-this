import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ojo: usa react-router-dom
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 1. El Router envuelve a toda la app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)