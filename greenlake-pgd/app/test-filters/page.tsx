'use client';

import { useEffect } from 'react';

export default function TestInfrastructureFilters() {
  useEffect(() => {
    const testFilter = async (type: string) => {
      try {
        console.log(`Testing filter for type: ${type}`);
        
        // Probar API normal
        const normalResponse = await fetch(`/api/infrastructure?type=${type}`);
        const normalData = await normalResponse.json();
        
        console.log(`Regular API (infrastructure) results for ${type}:`, {
          total: normalData.total,
          count: normalData.data?.length || 0,
          firstItem: normalData.data?.[0] || null
        });
        
        // Probar API alternativa
        const allResponse = await fetch(`/api/infrastructure-all?type=${type}`);
        const allData = await allResponse.json();
        
        console.log(`Alternative API (infrastructure-all) results for ${type}:`, {
          total: allData.total,
          count: allData.data?.length || 0,
          firstItem: allData.data?.[0] || null
        });
        
      } catch (error) {
        console.error(`Error testing filter for ${type}:`, error);
      }
    };
    
    // Test para cada tipo de infraestructura
    const typesToTest = [
      'restaurant', 
      'hotel', 
      'park', 
      'transportation_hub', 
      'venue', 
      'hospital', 
      'school'
    ];
    
    // Ejecutar los tests uno tras otro
    typesToTest.reduce((promise, type) => {
      return promise.then(() => testFilter(type));
    }, Promise.resolve());
    
  }, []);
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Test de Filtros de Infraestructura</h1>
      <p className="mb-4">Esta página está ejecutando pruebas de los filtros de tipo. Por favor, abre la consola del navegador para ver los resultados.</p>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <p className="text-sm">Los resultados se mostrarán en la consola del navegador (F12 &rarr; Console)</p>
      </div>
    </div>
  );
}
