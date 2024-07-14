'use client';

import React from "react";
import './Header.css'

import { LogIn, Sun, User, Building } from "lucide-react"
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <span>
          <span className="ofert">Ofert</span>
          <span className="a-letter">a</span>
          <span className="z-letter">z</span>
        </span>
      </div>
      <div className="header__theme">
      </div>
      {/* <div className="header__search">
        <input type="text" placeholder="Buscar..." />
        </div> */}
      <div className="header__actions">
        <div>
          {/* Item #1 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mr-2 text-white bg-background">
                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => null}>
                Cómo Persona <User className="ml-2 h-4 w-4" /> 
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => null}>
                Cómo Empresa <Building className="ml-2 h-4 w-4" /> 
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Item #2 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mr-2 text-white bg-background" variant="outline">
                <LogIn className="mr-2 h-4 w-4" /> Registrate
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => null}>
                Cómo Persona <User className="ml-2 h-4 w-4" /> 
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => null}>
                Cómo Empresa <Building className="ml-2 h-4 w-4" /> 
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Item #3 */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}