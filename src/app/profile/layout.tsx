
import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Ofertaz | Perfil",
  description: "",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/profile",
  },
  {
    title: "Mis Ofertas",
    href: "/profile/applications",
  },
  {
    title: "Cuenta",
    href: "/profile/account",
  },
  {
    title: "Apariencia",
    href: "/profile/appearance",
  }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 py-10 mt pb-16 block pt-32">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
          <p className="text-muted-foreground">
            Gestiona la configuración de tu cuenta y establece las preferencias de correo electrónico.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
