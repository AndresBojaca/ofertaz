import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import Header from "@/components/Header/Header";
import ClientProvider from "@/components/ClientProvider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Ofertaz | Empleo de la A a la Z",
  description: "Plataforma de Empleo",
};

const user = {
  name: JSON.stringify,
  photoUrl: 'string'
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-slate-200 dark:bg-slate-950 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProvider>
          <Header />
          <main className="container">
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}
