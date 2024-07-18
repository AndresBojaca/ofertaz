import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
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
