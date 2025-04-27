import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotDialog from './components/ChatbotDialog';

import AuthProvider from "./providers/AuthProvider";
import { LocalAuthProvider } from "./providers/LocalAuthProvider";
import SimpleAuthProvider from "./providers/SimpleAuthProvider";

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
      >        {/* Using SimpleAuthProvider as the main auth system since it's more reliable */}
        <SimpleAuthProvider>
          {/* Keep the other auth providers for compatibility */}
          <LocalAuthProvider>
            <AuthProvider>
              {children}
              <ChatbotDialog />
            </AuthProvider>
          </LocalAuthProvider>
        </SimpleAuthProvider>
      </body>
    </html>
  );
}
