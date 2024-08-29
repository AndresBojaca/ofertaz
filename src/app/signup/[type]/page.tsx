"use client";

import { useState, useEffect, FormEvent } from 'react';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import animationSuccessData from '@/assets/animations/success.json';
import { Separator } from '@/components/ui/separator';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSession } from '@/store/userSlice';

interface Country {
  name: string;
  code: string;
  flag: string;
}

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca3,
        flag: country.flags.svg
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
  } catch (err) {
    console.error('Error fetching countries:', err);
    return [];
  }
};

const RegisterForm = ({ role }: { role: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Nuevo estado para mostrar la confirmación
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name, email, password, rolesId: role, confirmed: false, country: selectedCountry
      });
      if (response.status === 200) {
        // Dispatch to set session in Redux store and localStorage
        setTimeout(() => {
          setLoading(false);
          dispatch(setSession(response.data.sessionUser));
          setShowConfirmation(true);
        }, 800);

      }
    } catch (err) {
      setError('Error al registrar. Inténtalo de nuevo.');
    }
  };

  if (showConfirmation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md dark:bg-slate-900 bg-slate-50">
          <Lottie animationData={animationSuccessData} className="h-40" />
          <h2 className="text-2xl font-bold text-center">Registro exitoso!</h2>
          <p className="text-center">Por favor, confirma tu cuenta verificando tu correo electrónico.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md dark:bg-slate-900 bg-slate-50">
        <h2 className="text-2xl font-bold text-center">{role === '2' ? '¡Regístrate!' : '¡Registra Tu Empresa!'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">{role === '2' ? 'Nombre' : 'Nombre de la Empresa'}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md sm:text-sm bg-slate-50 dark:bg-slate-950/50 focus-visible:outline-none focus-visible:border-cyan-400"
            />
          </div>
          {role === '3' && (
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-slate-300">País</label>
              <Select onValueChange={(value) => setSelectedCountry(value)}>
                <SelectTrigger className="w-full focus:border-cyan-400 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Seleccione un país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      <div className='flex gap-1 flex-row-reverse items-center object-fill'>{country.name}<img className="w-4 h-3" src={country.flag} alt={country.name} /></div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Correo Electrónico {role === '3' ? 'Corporativo' : ''}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md sm:text-sm bg-slate-50 dark:bg-slate-950/50 focus-visible:outline-none focus-visible:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md sm:text-sm bg-slate-50 dark:bg-slate-950/50 focus-visible:outline-none focus-visible:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md sm:text-sm bg-slate-50 dark:bg-slate-950/50 focus-visible:outline-none focus-visible:border-cyan-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-cyan-400 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {role === '2' ? 'Registrarse' : 'Registrar Empresa'}
            </button>
          </div>
        </form>
        <Separator />
        <div className="mt-4 text-center flex justify-center gap-8">
          <div className="border-r border-slate-600 pr-7">
            <p className="text-sm text-gray-600">¿Ya tienes una cuenta?</p>
            <a
              href="/login"
              className="text-sm text-cyan-500 hover:text-cyan-700 font-medium"
            >
              Inicia Sesión
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">¿Eres una {role === '2' ? 'Empresa' : 'Persona'}?</p>
            <a
              href={role === '2' ? '/signup/company' : '/signup/user'}
              className="text-sm text-cyan-500 hover:text-cyan-700 font-medium"
            >
              {role === '2' ? 'Registra tu Empresa' : 'Regístrate'}
            </a>
          </div>
      </div>
    </div>
    </div >
  );
};

export default function Register() {
  const params = useParams();
  const role = params.type === 'user' ? '2' : '3';

  return <RegisterForm role={role} />;
}
