
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertaz | Confirma tu cuenta",
  description: "",
};

interface ConfirmAccountLayoutProps {
  children: React.ReactNode;
}

export default function ConfirmAccountLayout({ children }: ConfirmAccountLayoutProps) {
  return (
    <>
      <div className="">
        {children}
      </div>
    </>
  );
}
