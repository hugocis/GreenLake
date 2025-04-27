"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "./components/Footer";
import RestaurantSection from "./components/RestaurantSection";
import HotelSection from "./components/HotelSection";
import TransportSection from "./components/TransportSection";
import ParkSection from "./components/ParkSection";
import LocalNavbar from "./components/LocalNavbar";

export default function Home() {
  const router = useRouter();

  // Efecto para redirigir según el rol del usuario
  useEffect(() => {
    // Verificar el rol guardado en localStorage
    const userRole = localStorage.getItem('user-role');
    
    // Redirigir según el rol
    if (userRole === 'researcher') {
      router.push('/statistics');
    } else if (userRole === 'entrepreneur') {
      router.push('/hydraulic-map');
    } else if (userRole === 'citizen') {
      router.push('/map');
    }
    // Si no hay rol definido, se queda en la página principal
  }, [router]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Using local authentication system */}
      <LocalNavbar />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#10B981] to-[#065F46] text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Bienvenidos a Greenlake City
          </h1>
          <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
            Descubre el destino turístico más sostenible y verde que te enamorará con su naturaleza y cultura
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href="#attractions"
              className="bg-white text-[#065F46] hover:bg-[#D1FAE5] font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Explorar Atracciones
            </Link>
            <Link 
              href="#events"
              className="bg-[#34D399] hover:bg-[#A7F3D0] text-white hover:text-[#065F46] font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Eventos Destacados
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-[#D1FAE5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#065F46] text-center mb-12">
            Ciudad Sostenible y Eco-Amigable
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="bg-[#34D399] p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#10B981] mb-2">Parques Naturales</h3>
              <p className="text-center text-gray-600">
                Disfruta de nuestros extensos parques con flora nativa y hábitats para vida silvestre.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="bg-[#34D399] p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#10B981] mb-2">Energía Renovable</h3>
              <p className="text-center text-gray-600">
                Ciudad impulsada por energías renovables y soluciones sostenibles para un futuro verde.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="bg-[#34D399] p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#10B981] mb-2">Transporte Verde</h3>
              <p className="text-center text-gray-600">
                Red de transporte público eficiente y opciones de alquiler de vehículos eléctricos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Park Section */}
      <ParkSection />

      {/* Transport Section */}
      <TransportSection />

      {/* Restaurant Section */}
      <RestaurantSection />

      {/* Hotel Section */}
      <HotelSection />

      <Footer />
    </div>
  );
}
