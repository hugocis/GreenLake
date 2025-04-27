"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Link from 'next/link';
// Nota: xlsx y file-saver se importan dinámicamente cuando se necesitan para mejorar el rendimiento

type DataCategory = 'infrastructure' | 'events' | 'transport' | 'sensors';
type DataFormat = 'json' | 'csv' | 'excel';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  name: string;
  key: string;
  options: FilterOption[];
  isMulti?: boolean;
}

const infrastructureTypes: FilterOption[] = [
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'park', label: 'Parque' },
  { value: 'transportation_hub', label: 'Centro de Transporte' },
  { value: 'venue', label: 'Recinto' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'school', label: 'Escuela' },
];

const eventTypes: FilterOption[] = [
  { value: 'concert', label: 'Concierto' },
  { value: 'festival', label: 'Festival' },
  { value: 'sports', label: 'Deportivo' },
  { value: 'exhibition', label: 'Exposición' },
  { value: 'theater', label: 'Teatro' },
  { value: 'conference', label: 'Conferencia' },
];

const transportTypes: FilterOption[] = [
  { value: 'bus', label: 'Autobús' },
  { value: 'train', label: 'Tren' },
  { value: 'subway', label: 'Metro' },
  { value: 'ferry', label: 'Ferry' },
  { value: 'tram', label: 'Tranvía' },
];

const sensorTypes: FilterOption[] = [
  { value: 'air', label: 'Calidad del Aire' },
  { value: 'traffic', label: 'Tráfico' },
  { value: 'ambient', label: 'Ambiental' },
  { value: 'water_quality', label: 'Calidad del Agua' },
  { value: 'water_usage', label: 'Uso del Agua' },
];

export default function StatisticsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [category, setCategory] = useState<DataCategory>('infrastructure');
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [cityOptions, setCityOptions] = useState<FilterOption[]>([]);

  // Effect to load cities for filter
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        if (!response.ok) throw new Error('Error fetching cities');
        const data = await response.json();
        
        const options = data.data.map((city: any) => ({
          value: city.id,
          label: city.name || 'City without name',
        }));
        
        setCityOptions(options);
      } catch (err: any) {
        console.error('Error loading cities:', err);
        setError(err.message);
      }
    };

    fetchCities();
  }, []);

  // Effect to fetch data based on selected category and filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const queryParams = new URLSearchParams();
        
        // Add filters to query params
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else if (value) {
            queryParams.append(key, value);
          }
        });
        
        // Add pagination
        queryParams.append('limit', pageSize.toString());
        queryParams.append('offset', ((page - 1) * pageSize).toString());
        
        const url = `/api/${category}?${queryParams.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`Error fetching ${category} data`);
        
        const result = await response.json();
        setData(result.data || []);
        setTotalItems(result.total || 0);
        setTotalPages(result.totalPages || 1);
      } catch (err: any) {
        console.error(`Error loading ${category} data:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, filters, page, pageSize]);

  // Filter configurations based on selected category
  const getFilterConfigs = (): FilterConfig[] => {
    const baseFilters = [
      {
        name: 'Ciudad',
        key: 'cityId',
        options: cityOptions,
      }
    ];

    switch (category) {
      case 'infrastructure':
        return [
          ...baseFilters,
          {
            name: 'Tipo',
            key: 'type',
            options: infrastructureTypes,
          },
        ];
      case 'events':
        return [
          ...baseFilters,
          {
            name: 'Tipo',
            key: 'eventType',
            options: eventTypes,
          },
        ];
      case 'transport':
        return [
          ...baseFilters,
          {
            name: 'Tipo',
            key: 'transportType',
            options: transportTypes,
          },
        ];
      case 'sensors':
        return [
          ...baseFilters,
          {
            name: 'Tipo',
            key: 'sensorType',
            options: sensorTypes,
          },
        ];
      default:
        return baseFilters;
    }
  };

  // Handle category change
  const handleCategoryChange = (newCategory: DataCategory) => {
    setCategory(newCategory);
    setFilters({});
    setPage(1);
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };
  // Handle download
  const handleDownload = async (format: DataFormat) => {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else if (value) {
        queryParams.append(key, value);
      }
    });
    
    // Add format parameter
    queryParams.append('format', format);
    // Remove pagination limits for downloads to get all data
    queryParams.append('limit', '1000');
    queryParams.append('offset', '0');
    
    const url = `/api/${category}?${queryParams.toString()}`;
    
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching ${category} data`);

      if (format === 'csv') {
        // For CSV, get the blob and download
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `greenlake-${category}-data.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      } else if (format === 'excel') {
        // For Excel, get JSON data and convert to Excel
        const data = await response.json();
        await downloadAsExcel(data.data || [], `greenlake-${category}-data`);
      } else {
        // For JSON, download as a file
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `greenlake-${category}-data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      }
    } catch (err: any) {
      console.error(`Error downloading ${format} data:`, err);
      setError(err.message || `Error downloading data in ${format} format`);
    } finally {
      setLoading(false);
    }
  };

  // Utility function to download data as Excel
  const downloadAsExcel = async (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      setError('No data available to download');
      return;
    }

    try {
      // Dynamically import Excel libraries only when needed
      const XLSX = await import('xlsx');
      const FileSaver = await import('file-saver');
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      
      // Generate Excel file and trigger download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, `${filename}.xlsx`);
    } catch (err) {
      console.error('Error generating Excel file:', err);
      setError('Error generating Excel file');
    }
  };

  // Get column definitions based on category
  const getColumns = () => {
    switch (category) {
      case 'infrastructure':
        return [
          { key: 'name', label: 'Nombre' },
          { key: 'type', label: 'Tipo' },
          { key: 'subtype', label: 'Subtipo' },
          { key: 'green_score', label: 'Puntuación Ecológica' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
        ];
      case 'events':
        return [
          { key: 'name', label: 'Nombre' },
          { key: 'event_type', label: 'Tipo' },
          { key: 'start_date', label: 'Fecha Inicio', accessor: (item: any) => item.start_date ? new Date(item.start_date).toLocaleDateString() : 'N/A' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
          { key: 'expected_attendance', label: 'Asistencia Esperada' },
        ];
      case 'transport':
        return [
          { key: 'route_name', label: 'Ruta' },
          { key: 'transport_type', label: 'Tipo' },
          { key: 'origin', label: 'Origen', accessor: (item: any) => item.cities_transport_routes_origin_city_idTocities?.name || 'N/A' },
          { key: 'destination', label: 'Destino', accessor: (item: any) => item.cities_transport_routes_destination_city_idTocities?.name || 'N/A' },
          { key: 'distance_km', label: 'Distancia (km)' },
        ];
      case 'sensors':
        return [
          { key: 'id', label: 'ID' },
          { key: 'sensor_type', label: 'Tipo' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
          { key: 'installed_at', label: 'Instalado', accessor: (item: any) => item.installed_at ? new Date(item.installed_at).toLocaleDateString() : 'N/A' },
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();
  const filterConfigs = getFilterConfigs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#065F46] mb-8">Estadísticas de Greenlake City</h1>
        
        {/* Category Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Categoría</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('infrastructure')}
              className={`px-4 py-2 rounded-lg ${
                category === 'infrastructure' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Infraestructura
            </button>
            <button
              onClick={() => handleCategoryChange('events')}
              className={`px-4 py-2 rounded-lg ${
                category === 'events' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Eventos
            </button>
            <button
              onClick={() => handleCategoryChange('transport')}
              className={`px-4 py-2 rounded-lg ${
                category === 'transport' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rutas de Transporte
            </button>
            <button
              onClick={() => handleCategoryChange('sensors')}
              className={`px-4 py-2 rounded-lg ${
                category === 'sensors' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sensores
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterConfigs.map((filter, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.name}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  value={filters[filter.key] as string || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                >
                  <option value="">Todos</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        {/* Download Options */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Descargar Datos</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDownload('json')}
              className="px-4 py-2 bg-[#065F46] text-white rounded-lg hover:bg-[#064F36] transition-colors"
            >
              Descargar JSON
            </button>
            <button
              onClick={() => handleDownload('csv')}
              className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#0EA271] transition-colors"
            >
              Descargar CSV
            </button>
            <button
              onClick={() => handleDownload('excel')}
              className="px-4 py-2 bg-[#34D399] text-white rounded-lg hover:bg-[#2EB980] transition-colors"
            >
              Descargar Excel
            </button>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-[#10B981]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cargando datos...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron datos con los filtros seleccionados
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {columns.map((col, j) => (
                      <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {col.accessor 
                          ? col.accessor(item) 
                          : getNestedProperty(item, col.key) || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{data.length}</span> de <span className="font-medium">{totalItems}</span> resultados
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#10B981] text-white hover:bg-[#0EA271]'
              }`}
            >
              Anterior
            </button>
            <span className="px-3 py-1 bg-gray-200 rounded">
              {page} de {totalPages || 1}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`px-3 py-1 rounded ${
                page >= totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#10B981] text-white hover:bg-[#0EA271]'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#065F46] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 Greenlake City. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper function to access nested properties using dot notation (e.g., "cities.name")
function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}
