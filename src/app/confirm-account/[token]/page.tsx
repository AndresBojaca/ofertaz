"use client";

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import animationSuccessData from '@/assets/animations/success.json';
import animationErrorData from '@/assets/animations/error.json';


export default function ConfirmAccount() {

  const params = useParams();
  const token = params.token;
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm`, { token });
        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    if (token) {
      confirmAccount();
    }
  }, [token]);

  if (status === 'loading') return <div>Cargando...</div>;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-slate-900 bg-slate-50">
        {status === 'success'
          ?
          <div>
            <Lottie animationData={animationSuccessData} className="h-40"/>
            <h2 className="text-2xl font-bold text-center">¡Cuenta confirmada exitosamente!</h2>
            <p className="text-center text-slate-400">Por favor, confirma tu cuenta verificando tu correo electrónico.</p>
          </div>
          :
          <div>
            <Lottie animationData={animationErrorData} className="h-40"/>
            <h2 className="text-2xl font-bold text-center">¡Ocurrió un problema!</h2>
            <p className="text-center text-slate-400">Intenta nuevamente o comunícate con soporte.</p>
          </div>
        }
        <div className="text-center">
          <span className="text-sm text-slate-600">Tambien puedes ir al inicio, <a href="/" className="text-cyan-800">ofertaz.com</a></span>
        </div>
      </div>
    </div>
  );
}
