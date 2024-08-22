"use client";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import withAuth from "@/components/AuthProvider";


const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mi perfil</h3>
        <p className="text-sm text-muted-foreground">
          Información personal y algunos datos importantes.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export default withAuth(SettingsProfilePage, ['User', 'Admin', 'Company']);
