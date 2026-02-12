/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await AuthService.signUp(
        formData.email, 
        formData.password, 
        formData.fullName
      );
      
      if (error) throw error;
      
      // Éxito: Redirigir al login o mostrar mensaje
      alert('Cuenta creada con éxito. Por favor verifica tu correo para activar la cuenta.');
      navigate('/login');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      <div className="w-full max-w-md">
        {/* BOTÓN VOLVER (Estilo Brutalista) */}
        <button 
          onClick={() => navigate('/')}
          className="mb-6 font-mono text-sm hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
        >
          ← VOLVER AL INICIO
        </button>

        <div className="bg-background border-2 border-foreground p-8 shadow-[8px_8px_0px_0px_var(--grid-color)]">
          <h2 className="text-3xl font-black mb-2 tracking-tight">CREAR CUENTA</h2>
          <p className="text-sm text-gray-500 font-mono mb-6">ÚNETE AL MANIFIESTO.</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <Input 
              label="NOMBRE COMPLETO"
              name="fullName"
              placeholder="Ej. Ana Lovelace"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            
            <Input 
              label="CORREO ELECTRÓNICO"
              type="email" 
              name="email"
              placeholder="usuario@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input 
              label="CONTRASEÑA"
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-500 text-red-600 text-xs font-mono font-bold">
                ERROR: {error}
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={loading}>
              REGISTRARSE
            </Button>
          </form>

          {/* LINK AL LOGIN */}
          <div className="mt-6 text-center font-mono text-xs">
            <span className="text-gray-500">¿YA TIENES CUENTA? </span>
            <Link to="/login" className="font-bold underline decoration-2 underline-offset-2 hover:text-gray-600">
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};