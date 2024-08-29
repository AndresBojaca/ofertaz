import { Button } from "@/components/ui/button";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearSession } from '@/store/userSlice'; // Importar la acción clearSession desde el userSlice

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav({ userData }: { userData: any }) {

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearSession()); // Llamar a la acción clearSession para cerrar sesión
    router.push('/');
  };

  const handleNavigate = (e: any) => {
    e.preventDefault();
    router.push(`/profile`);
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-8 w-8 hover:opacity-90 transition-all hover:scale-105">
          <ProfilePicture url="" name={userData.name} borderRadius="20" useFirstLetterOnly />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate ...">{userData.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              Perfil
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/applications">
            <DropdownMenuItem>
              Mis Ofertas
              <span className="relative flex h-2 w-2 -top-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/account">
            <DropdownMenuItem>
              Configuración
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
