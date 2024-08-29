'use client';

import { useState } from 'react';
import { Loader2 } from "lucide-react"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSession } from '@/store/userSlice';
import { Separator } from '@/components/ui/separator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      if (response.status === 200) {
        // Dispatch to set session in Redux store and localStorage
        setTimeout(() => {
          setLoading(false);
          dispatch(setSession(response.data.sessionUser));
          // Redirigir al dashboard
          router.push('/profile');
        }, 800);
      }
    } catch (err) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 dark:bg-slate-900 bg-slate-50 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus-visible:ring-indigo-500 focus-visible:border-cyan-400 sm:text-sm bg-black/10"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black/10"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-cyan-400 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {loading ? <Loader2 className="inline-block w-5 h-5 ml-2 animate-spin"/> :  'Iniciar Sesión' }
            </button>
          </div>
        </form>
        <Separator />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <a
            href="/signup/user"
            className="text-cyan-500 hover:text-cyan-700 font-medium"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
