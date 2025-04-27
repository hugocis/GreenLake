import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RestaurantSection from "./components/RestaurantSection";
import HotelSection from "./components/HotelSection";
import TransportSection from "./components/TransportSection";
import ParkSection from "./components/ParkSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
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

      {/* Events Section */}
      <section id="events" className="py-16 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
            Eventos Destacados
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Descubre los mejores eventos culturales, deportivos y de entretenimiento en Greenlake City
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex">
              <div className="w-1/3 bg-[#10B981] flex items-center justify-center p-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white">15</span>
                  <span className="block text-lg text-white">Mayo</span>
                </div>
              </div>
              <div className="w-2/3 p-6">
                <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded">
                  FESTIVAL
                </span>
                <h3 className="text-xl font-semibold text-[#065F46] mt-2 mb-2">Festival Eco Verde</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Celebración de la sostenibilidad con música en vivo, comida local y talleres ecológicos.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#10B981] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Parque Central Verde</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex">
              <div className="w-1/3 bg-[#10B981] flex items-center justify-center p-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white">22</span>
                  <span className="block text-lg text-white">Mayo</span>
                </div>
              </div>
              <div className="w-2/3 p-6">
                <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded">
                  CONFERENCIA
                </span>
                <h3 className="text-xl font-semibold text-[#065F46] mt-2 mb-2">Futuro Sostenible</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Conferencia sobre innovaciones en tecnología verde y desarrollo sostenible.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#10B981] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Centro de Convenciones</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex">
              <div className="w-1/3 bg-[#10B981] flex items-center justify-center p-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white">29</span>
                  <span className="block text-lg text-white">Mayo</span>
                </div>
              </div>
              <div className="w-2/3 p-6">
                <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded">
                  DEPORTIVO
                </span>
                <h3 className="text-xl font-semibold text-[#065F46] mt-2 mb-2">Maratón Verde</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Carrera familiar para promover el ejercicio y la conciencia ambiental en la ciudad.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#10B981] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Avenida Principal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex">
              <div className="w-1/3 bg-[#10B981] flex items-center justify-center p-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-white">5</span>
                  <span className="block text-lg text-white">Junio</span>
                </div>
              </div>
              <div className="w-2/3 p-6">
                <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded">
                  CULTURAL
                </span>
                <h3 className="text-xl font-semibold text-[#065F46] mt-2 mb-2">Feria Artesanal</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exposición y venta de productos artesanales locales fabricados con materiales sostenibles.
                </p>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#10B981] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Plaza Central</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Ver Todos los Eventos
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#065F46] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Mantente Informado
            </h2>
            <p className="mb-8">
              Suscríbete para recibir las últimas noticias sobre eventos, atracciones y ofertas especiales en Greenlake City
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="px-4 py-3 rounded-lg w-full md:w-auto md:flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              />
              <button className="bg-[#34D399] hover:bg-[#10B981] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>      {/* Footer Component */}
      <Footer />
    </div>
  );
}
