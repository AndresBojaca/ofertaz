"use client";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import withAuth from "@/components/AuthProvider";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type confirmedUser = {
  confirmedUser: boolean;
}

const SettingsProfilePage = () => {

  const sessionUserStorage = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const confirmedUser: confirmedUser = sessionUserStorage.user?.confirmed;

  const confirmmationDialog = () => {
    return (
      <div className="mt-5">
        <Separator />
        <Alert variant="warning" className="bg-white dark:bg-slate-950 my-6">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Confirma tu cuenta para disfrutar de <strong>Ofertaz</strong></AlertTitle>
          <AlertDescription className="opacity-70">
            Hemos enviado un correo de confirmación a tu dirección de correo electrónico. Por favor, sigue las instrucciones para confirmar tu cuenta.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mi perfil</h3>
        <p className="text-sm text-muted-foreground">
          Información personal y algunos datos importantes.
        </p>


        {confirmedUser ? null : confirmmationDialog()}
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export default withAuth(SettingsProfilePage, ['User', 'Admin', 'Company']);
