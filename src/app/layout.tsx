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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
