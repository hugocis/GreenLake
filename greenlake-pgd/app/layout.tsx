import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { LocalAuthProvider } from "./providers/LocalAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greenlake City Tourism",
  description: "Discover the sustainable beauty of Greenlake City - Your eco-friendly tourist destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}
      >
        {/* Usando el proveedor de autenticación local como opción alternativa */}
        <LocalAuthProvider>
          {/* Mantenemos el proveedor original para compatibilidad con el código existente */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </LocalAuthProvider>
      </body>
    </html>
  );
}
