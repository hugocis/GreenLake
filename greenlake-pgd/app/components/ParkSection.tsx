"use client";

import { useState } from 'react';

// Datos de ejemplo basados en infrastructure_park del schema
const parkData = [
  {
    id: "1",
    name: "Parque Central Verde",
    size: "Grande",
    areaKm2: 2.75,
    nativePlantings: true,
    wildlifeHabitat: true,
    sustainableIrrigation: true,
    description: "Un amplio parque urbano con abundante vegetación nativa y hábitat para diversas especies silvestres locales.",
    mainAttractions: ["Jardín botánico", "Lago artificial", "Senderos ecológicos"],
    rating: 4.8,
    reviewCount: 120,
  },
  {
    id: "2",
    name: "Reserva Natural Águila Verde",
    size: "Extra grande",
    areaKm2: 5.20,
    nativePlantings: true,
    wildlifeHabitat: true,
    sustainableIrrigation: true,
    description: "Reserva natural con ecosistemas protegidos donde se pueden observar aves migratorias y flora endémica.",
    mainAttractions: ["Torres de observación", "Centro de interpretación", "Rutas guiadas"],
    rating: 4.9,
    reviewCount: 85,
  },
  {
    id: "3",
    name: "Jardines Sostenibles",
    size: "Pequeño",
    areaKm2: 0.65,
    nativePlantings: true,
    wildlifeHabitat: false,
    sustainableIrrigation: true,
    description: "Jardines urbanos que muestran técnicas de jardinería sostenible y cultivos locales.",
    mainAttractions: ["Huerto comunitario", "Jardines temáticos", "Área de picnic"],
    rating: 4.6,
    reviewCount: 62,
  },
  {
    id: "4",
    name: "Parque Acuático Natural",
    size: "Mediano",
    areaKm2: 1.35,
    nativePlantings: true,
    wildlifeHabitat: true,
    sustainableIrrigation: true,
    description: "Parque construido alrededor de un río natural con áreas para baño y recreación acuática sostenible.",
    mainAttractions: ["Piscinas naturales", "Cascadas", "Áreas para nadar"],
    rating: 4.7,
    reviewCount: 94,
  },
];

export default function ParkSection() {
  return (
    <section id="parks" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Parques y Áreas Naturales
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Descubre los espacios verdes de Greenlake City donde la naturaleza y sostenibilidad son prioridad
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {parkData.map((park) => (
            <div key={park.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-[#34D399] flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                    PARQUE
                  </span>
                  <span className="text-gray-500 text-sm">{park.size} • {park.areaKm2} km²</span>
                </div>
                <h3 className="text-xl font-semibold text-[#065F46] mb-2">{park.name}</h3>
                <p className="text-gray-600 mb-4">
                  {park.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#10B981] mb-2">Atracciones Principales:</h4>
                  <ul className="space-y-1">
                    {park.mainAttractions.map((attraction, index) => (
                      <li key={index} className="flex items-center text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#10B981] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-[#10B981]">{park.rating}</span> ({park.reviewCount} reseñas)
                  </div>
                  <div className="flex gap-2">
                    {park.nativePlantings && (
                      <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                        Plantas nativas
                      </span>
                    )}
                    {park.wildlifeHabitat && (
                      <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                        Hábitat silvestre
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-[#D1FAE5] rounded-xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-3/4 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-2xl font-bold text-[#065F46] mb-2">Explora nuestros parques sostenibles</h3>
              <p className="text-gray-700">
                Greenlake City cuenta con más de 20 parques y áreas naturales donde podrás conectar con la naturaleza, observar vida silvestre y disfrutar de actividades al aire libre. Todos nuestros espacios verdes están diseñados bajo estrictos criterios de sostenibilidad.
              </p>
            </div>
            <div className="md:w-1/4 flex justify-center md:justify-end">
              <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Ver Mapa Verde
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
