'use client';/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */


import { useState, useEffect } from 'react';

interface FilterDebugProps {
  filters: Record<string, any>;
  category: string;
  endpoint: string;
}

export default function FilterDebug({ filters, category, endpoint }: FilterDebugProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función para probar la API con los filtros actuales
  const testApiCall = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construir los parámetros de consulta
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        } else {
          queryParams.append(key, value as string);
        }
      });
      
      // Hacer la llamada a la API
      const url = `/api/${endpoint || category}?${queryParams.toString()}&limit=5`;
      console.log(`Testing API call: ${url}`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      setApiResponse(data);
    } catch (error: any) {
      console.error('Error testing API:', error);
      setError(error.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // No renderizar nada durante SSR
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-md text-xs border border-gray-200">
      <h4 className="font-bold mb-2 text-sm">Debug de Filtros ({category})</h4>
      
      <div className="mb-3">
        <h5 className="font-semibold text-xs mb-1">Filtros actuales:</h5>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-24">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={testApiCall}
          disabled={isLoading}
          className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-xs transition-colors"
        >
          {isLoading ? 'Probando...' : 'Probar API'}
        </button>
        
        <span className="text-xs text-gray-500">
          Endpoint: /api/{endpoint || category}
        </span>
      </div>
      
      {error && (
        <div className="mb-3 text-red-600 bg-red-50 p-2 rounded text-xs">
          Error: {error}
        </div>
      )}
      
      {apiResponse && (
        <div className="mb-2">
          <h5 className="font-semibold text-xs mb-1">Respuesta de la API:</h5>
          <div className="flex justify-between text-gray-600 text-xs mb-1">
            <span>Total: {apiResponse.total || 0}</span>
            <span>Resultados: {apiResponse.data?.length || 0}</span>
          </div>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-48 text-[10px]">
            {JSON.stringify(apiResponse.data?.slice(0, 2), null, 2)}
            {apiResponse.data?.length > 2 ? '\n... (más resultados)' : ''}
          </pre>
        </div>
      )}
      
      <div className="text-right mt-2">
        <button
          onClick={() => {
            // Copiar la información de depuración al portapapeles
            const debugInfo = JSON.stringify({
              category,
              filters,
              endpoint: `/api/${endpoint || category}`,
              response: apiResponse
            }, null, 2);
            
            navigator.clipboard.writeText(debugInfo);
            alert('Debug info copiada al portapapeles');
          }}
          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
        >
          Copiar Debug
        </button>
      </div>
    </div>
  );
}
