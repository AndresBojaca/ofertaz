'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
export default function HeaderSimple() {
  const [isOpen, setIsOpen] = useState(false);

  const sessionData = useSelector((state: RootState) => state.session);

  const Buttons = () => {
    return (
      <div className="flex flex-col gap-3 mt-8 md:mt-0 md:flex-row md:gap-0">
        {!sessionData.token && (
          <div className='flex'>
            <ThemeSwitcher />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <nav className="shadow-md py-5 fixed w-full top-0 z-10 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              <div className="header__logo">
                <span>
                  <span className="text-blue-950 dark:text-slate-300">Ofert</span>
                  <span className="text-cyan-400">a</span>
                  <span className="text-cyan-400 opacity-50">z</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Botones y elementos de navegación */}
          <div className="hidden md:flex space-x-4 justify-center align-middle">
            <Buttons />
          </div>

          {/* Menú desplegable en dispositivos móviles */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>

          {/* Mostrar menú desplegable en dispositivos móviles si está abierto */}
        </div>
        {isOpen && (
          <div className="md:hidden px-4">
            <Buttons />
          </div>
        )}
      </nav>
    </div>
  );
}
