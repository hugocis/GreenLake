"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SimpleFooter from '../components/SimpleFooter';
import Link from 'next/link';
import LocalNavbar from '../components/LocalNavbar';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

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
        
        // Add filters to query params with special handling for transport routes
        Object.entries(filters).forEach(([key, value]) => {
          // Skip empty values
          if (!value) return;
          
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            // Special case for cityId in transport category
            if (category === 'transport' && key === 'cityId') {
              // For transport routes, apply city filter to both origin and destination
              queryParams.append('originCityId', value);
              queryParams.append('destinationCityId', value);
            } 
            // Ensure 'type' filter is correctly appended for infrastructure
            else if (category === 'infrastructure' && key === 'type') {
              queryParams.append('type', value);
            } else {
              queryParams.append(key, value);
            }
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
            name: 'Tipo de Infraestructura',
            key: 'type',
            options: infrastructureTypes,
          },
          {
            name: 'Puntuación Ecológica Mínima',
            key: 'minGreenScore',
            options: [
              { value: '1', label: '1+ (Cualquiera)' },
              { value: '3', label: '3+ (Moderada)' },
              { value: '5', label: '5+ (Buena)' },
              { value: '7', label: '7+ (Muy buena)' },
              { value: '9', label: '9+ (Excelente)' }
            ],
          },
        ];
      case 'events':
        return [
          ...baseFilters,
          {
            name: 'Tipo de Evento',
            key: 'eventType',
            options: eventTypes,
          },
          {
            name: 'Estado',
            key: 'status',
            options: [
              { value: 'scheduled', label: 'Programado' },
              { value: 'ongoing', label: 'En curso' },
              { value: 'completed', label: 'Completado' },
              { value: 'cancelled', label: 'Cancelado' }
            ],
          },
          {
            name: 'Eventos Gratuitos',
            key: 'isFree',
            options: [
              { value: '', label: 'Todos' },
              { value: 'true', label: 'Solo gratuitos' },
              { value: 'false', label: 'Solo de pago' },
            ],
          },
        ];
      case 'transport':
        return [
          ...baseFilters,
          {
            name: 'Tipo de Transporte',
            key: 'transportType',
            options: transportTypes,
          },
          {
            name: 'Eficiencia Mínima',
            key: 'minEfficiencyScore',
            options: [
              { value: '', label: 'Cualquiera' },
              { value: '1', label: '1+ (Cualquiera)' },
              { value: '2', label: '2+ (Moderada)' },
              { value: '3', label: '3+ (Buena)' },
              { value: '4', label: '4+ (Muy buena)' },
              { value: '5', label: '5+ (Excelente)' }
            ],
          },
          {
            name: 'Huella de Carbono Máxima',
            key: 'maxCarbonFootprint',
            options: [
              { value: '', label: 'Cualquiera' },
              { value: '50', label: 'Hasta 50 kg' },
              { value: '20', label: 'Hasta 20 kg' },
              { value: '10', label: 'Hasta 10 kg' },
              { value: '5', label: 'Hasta 5 kg' }
            ],
          },
        ];
      case 'sensors':
        return [
          ...baseFilters,
          {
            name: 'Tipo de Sensor',
            key: 'sensorType',
            options: sensorTypes,
          },
          {
            name: 'Zona Industrial',
            key: 'industrialZone',
            options: [
              { value: '', label: 'Todos' },
              { value: 'true', label: 'Solo en zonas industriales' },
              { value: 'false', label: 'Solo fuera de zonas industriales' },
            ],
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
          { key: 'green_score', label: 'Puntuación Ecológica', accessor: (item: any) => item.green_score !== null ? item.green_score : 'N/A' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
          { key: 'opening_date', label: 'Fecha Apertura', accessor: (item: any) => item.opening_date ? new Date(item.opening_date).toLocaleDateString() : 'N/A' },
          { key: 'renewable_energy_percentage', label: '% Energía Renovable', accessor: (item: any) => item.renewable_energy_percentage !== null ? `${item.renewable_energy_percentage}%` : 'N/A' },
        ];
      case 'events':
        return [
          { key: 'name', label: 'Nombre' },
          { key: 'event_type', label: 'Tipo de Evento' },
          { key: 'status', label: 'Estado', accessor: (item: any) => {
            const statusMap: {[key: string]: string} = {
              'scheduled': 'Programado',
              'ongoing': 'En Curso',
              'completed': 'Completado',
              'cancelled': 'Cancelado'
            };
            return statusMap[item.status as string] || item.status || 'N/A';
          }},
          { key: 'start_date', label: 'Fecha Inicio', accessor: (item: any) => item.start_date ? new Date(item.start_date).toLocaleDateString() : 'N/A' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
          { key: 'expected_attendance', label: 'Asistencia Esperada', accessor: (item: any) => item.expected_attendance?.toLocaleString() || 'N/A' },
          { key: 'is_free', label: 'Gratuito', accessor: (item: any) => item.is_free ? 'Sí' : 'No' },
        ];
      case 'transport':
        return [
          { key: 'route_name', label: 'Ruta' },
          { key: 'transport_type', label: 'Tipo de Transporte' },
          { key: 'origin', label: 'Ciudad Origen', accessor: (item: any) => item.cities_transport_routes_origin_city_idTocities?.name || 'N/A' },
          { key: 'destination', label: 'Ciudad Destino', accessor: (item: any) => item.cities_transport_routes_destination_city_idTocities?.name || 'N/A' },
          { key: 'distance_km', label: 'Distancia (km)' },
          { key: 'efficiency_score', label: 'Puntuación Eficiencia', accessor: (item: any) => item.efficiency_score?.toFixed(1) || 'N/A' },
          { key: 'carbon_footprint_kg', label: 'Huella Carbono (kg)', accessor: (item: any) => item.carbon_footprint_kg?.toFixed(1) || 'N/A' },
        ];
      case 'sensors':
        return [
          { key: 'id', label: 'ID Sensor', accessor: (item: any) => item.id.substring(0, 8) + '...' },
          { key: 'sensor_type', label: 'Tipo de Sensor' },
          { key: 'cities.name', label: 'Ciudad', accessor: (item: any) => item.cities?.name || 'N/A' },
          { key: 'installed_at', label: 'Fecha Instalación', accessor: (item: any) => item.installed_at ? new Date(item.installed_at).toLocaleDateString() : 'N/A' },
          { key: 'industrial_zone', label: 'Zona Industrial', accessor: (item: any) => item.industrial_zone ? 'Sí' : 'No' },
        ];
      default:
        return [];
    }
  };

  // Get human-readable category label
  const getCategoryLabel = (categoryKey: DataCategory): string => {
    switch(categoryKey) {
      case 'infrastructure':
        return 'Infraestructura';
      case 'events':
        return 'Eventos';
      case 'transport':
        return 'Rutas de Transporte';
      case 'sensors':
        return 'Sensores';
      default:
        return 'Datos';
    }
  };

  const columns = getColumns();
  const filterConfigs = getFilterConfigs();

  const getChartData = () => {
    if (category === 'infrastructure') {
      const labels = data.map(item => item.name || 'N/A');
      const greenScores = data.map(item => item.green_score || 0);

      return {
        labels,
        datasets: [
          {
            label: 'Puntuación Ecológica',
            data: greenScores,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    }

    if (category === 'events') {
      const labels = data.map(item => item.name || 'N/A');
      const attendance = data.map(item => item.expected_attendance || 0);

      return {
        labels,
        datasets: [
          {
            label: 'Asistencia Esperada',
            data: attendance,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      };
    }

    return { labels: [], datasets: [] };
  };

  const getDoughnutChartData = () => {
    if (category === 'sensors') {
      const labels = data.map(item => item.sensor_type || 'N/A');
      const counts = data.reduce((acc, item) => {
        const type = item.sensor_type || 'N/A';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(counts),
        datasets: [
          {
            label: 'Sensores por Tipo',
            data: Object.values(counts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
          },
        ],
      };
    }

    return { labels: [], datasets: [] };
  };

  const getLineChartData = () => {
    if (category === 'infrastructure') {
      const labels = data.map(item => item.name || 'N/A');
      const greenScores = data.map(item => item.green_score || 0);

      return {
        labels,
        datasets: [
          {
            label: 'Puntuación Ecológica',
            data: greenScores,
            borderColor: 'rgba(53, 162, 235, 1)',
            backgroundColor: 'rgba(53, 162, 235, 0.2)',
          },
        ],
      };
    }

    if (category === 'events') {
      const labels = data.map(item => item.name || 'N/A');
      const attendance = data.map(item => item.expected_attendance || 0);

      return {
        labels,
        datasets: [
          {
            label: 'Asistencia Esperada',
            data: attendance,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
    }

    return { labels: [], datasets: [] };
  };
  return (
    <div className="min-h-screen flex flex-col">
      <LocalNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#065F46] mb-2">Estadísticas de Greenlake City</h1>
        <p className="text-gray-600 mb-8">Explore y descargue datos detallados sobre la ciudad sostenible</p>
          {/* Category Selector */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#065F46] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Seleccionar Categoría de Datos
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('infrastructure')}
              className={`px-4 py-3 rounded-lg flex items-center transition-all ${
                category === 'infrastructure' 
                  ? 'bg-[#10B981] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              Infraestructura
            </button>
            <button
              onClick={() => handleCategoryChange('events')}
              className={`px-4 py-3 rounded-lg flex items-center transition-all ${
                category === 'events' 
                  ? 'bg-[#10B981] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Eventos
            </button>
            <button
              onClick={() => handleCategoryChange('transport')}
              className={`px-4 py-3 rounded-lg flex items-center transition-all ${
                category === 'transport' 
                  ? 'bg-[#10B981] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Rutas de Transporte
            </button>
            <button
              onClick={() => handleCategoryChange('sensors')}
              className={`px-4 py-3 rounded-lg flex items-center transition-all ${
                category === 'sensors' 
                  ? 'bg-[#10B981] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
              </svg>
              Sensores
            </button>
          </div>
        </div>
          {/* Filters */}
        <div className="mb-8 bg-[#F0FDF9] p-6 rounded-lg shadow-sm border border-[#D1FAE5]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold text-[#065F46] mb-2 md:mb-0">Filtros para {getCategoryLabel(category)}</h2>
            <button 
              onClick={() => setFilters({})}
              className="text-sm text-[#10B981] hover:text-[#065F46] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar filtros
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filterConfigs.map((filter, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-[#065F46] mb-1">
                  {filter.name}
                </label>
                <select
                  className="w-full p-2.5 border border-[#D1FAE5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white"
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
            {category === 'transport' && (
              <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-3 py-3 px-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Al filtrar por ciudad, se muestran todas las rutas donde la ciudad seleccionada es origen o destino.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Download Options */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#065F46] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar Datos
          </h2>
          <p className="text-gray-600 mb-4 text-sm">Descarga los datos filtrados actualmente en el formato que prefieras:</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleDownload('json')}
              className="px-4 py-2.5 bg-[#065F46] text-white rounded-lg hover:bg-[#064F36] transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              JSON
            </button>
            <button
              onClick={() => handleDownload('csv')}
              className="px-4 py-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#0EA271] transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
            <button
              onClick={() => handleDownload('excel')}
              className="px-4 py-2.5 bg-[#34D399] text-white rounded-lg hover:bg-[#2EB980] transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Excel
            </button>
          </div>
        </div>
          {/* Data Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#ECFDF5]">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-[#065F46] uppercase tracking-wider"
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
                  <tr key={index} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#D1FAE5] transition-colors duration-150`}>
                    {columns.map((col, j) => (
                      <td key={j} className="px-6 py-4 text-sm text-gray-900">
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

        {/* Chart Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#065F46] mb-4">Gráficos de {getCategoryLabel(category)}</h2>
          <Bar data={getChartData()} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Gráficos de ${getCategoryLabel(category)}`,
              },
            },
          }} />
        </div>

        {/* Line Chart Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#065F46] mb-4">Gráfico de Línea para {getCategoryLabel(category)}</h2>
          <Line data={getLineChartData()} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Gráfico de Línea para ${getCategoryLabel(category)}`,
              },
            },
          }} />
        </div>
          {/* Pagination */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">
            Mostrando <span className="font-medium">{data.length}</span> de <span className="font-medium">{totalItems}</span> resultados
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${
                page === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#065F46] text-white hover:bg-opacity-90'
              }`}
              title="Primera página"
            >
              «
            </button>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${
                page === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#10B981] text-white hover:bg-[#0EA271]'
              }`}
            >
              Anterior
            </button>
            <div className="flex items-center px-4">
              <span className="px-3 py-1 bg-[#ECFDF5] border border-[#10B981] text-[#065F46] rounded-md font-medium">
                {page} de {totalPages || 1}
              </span>
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`px-3 py-1 rounded-md ${
                page >= totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#10B981] text-white hover:bg-[#0EA271]'
              }`}
            >
              Siguiente
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
              className={`px-3 py-1 rounded-md ${
                page >= totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#065F46] text-white hover:bg-opacity-90'
              }`}
              title="Última página"
            >
              »
            </button>
          </div>
        </div>
      </main>
      
      <SimpleFooter />
    </div>
  );
}

// Helper function to access nested properties using dot notation (e.g., "cities.name")
function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}
