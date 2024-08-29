'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogIn, User, Building, LogOut } from 'lucide-react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Button } from '../ui/button';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { UserNav } from "@/components/UserNav/UserNav";
import './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const sessionData = useSelector((state: RootState) => state.session);

  const Buttons = () => {
    return (
      <div className="flex flex-col gap-3 mt-8 md:mt-0 md:flex-row md:gap-0">
        {!sessionData.token && (
          <div className='flex'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mr-2 dark:text-slate-300" variant="outline">
                  <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login">
                    <DropdownMenuItem>
                      Como Persona <User className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login">
                    <DropdownMenuItem>
                      Como Empresa <Building className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mr-2 text-slate-900 bg-cyan-400 hover:bg-cyan-600" variant="outline">
                  <LogIn className="mr-2 h-4 w-4" /> Registrarse
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => null}>
                  <Link href="/signup/user">
                    <DropdownMenuItem>
                      Como Persona <User className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => null}>
                  <Link href="/signup/company">
                    <DropdownMenuItem>
                      Como Empresa <Building className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Componente de cambio de tema */}
            <ThemeSwitcher />
          </div>
        )}

        {sessionData.token && (
          <div className="">
            <div className="mx-auto flex w-full max-w-lg items-center justify-center">
              <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-full border dark:border-slate-800 border-slate-300 p-[1.5px]">
                <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
                <div className="relative z-20 flex w-full rounded-full dark:bg-slate-900 bg-slate-100 p-2">
                  <UserNav userData={sessionData.user} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative mb-10 h-20">
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
