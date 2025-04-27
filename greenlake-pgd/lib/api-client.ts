/**
 * API client for making requests to our backend APIs
 */
import {
  PaginatedResponse,
  SingleResponse,
  ErrorResponse,
  City,
  Infrastructure,
  InfrastructureRestaurant,
  InfrastructureHotel,
  InfrastructurePark,
  InfrastructureTransportationHub,
  TransportRoute,
  ElectricRentalVehicle,
  CreateRestaurantRequest,
  CreateHotelRequest,
  CreateParkRequest,
  CreateTransportationHubRequest,
  CreateTransportRouteRequest,
  CreateElectricVehicleRequest,
  Event,
  Sensor,
} from '@/lib/types';

// Base fetch function with error handling
async function fetchAPI<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    // Asegurar que la URL comience con /api/ para rutas relativas
    const apiUrl = url.startsWith('http') ? url : (url.startsWith('/api/') ? url : `/api${url.startsWith('/') ? url : '/' + url}`);
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });    const data = await response.json().catch(e => {
      console.error('Error parsing JSON response:', e);
      throw new Error('Invalid JSON response from server');
    });

    console.log('API Response:', {
      url: apiUrl,
      status: response.status,
      data: data
    });

    if (!response.ok) {
      const errorMessage = (data as ErrorResponse).error || 'Something went wrong';
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Infrastructure API calls
export const InfrastructureAPI = {
  getAllInfrastructures: async (params?: { limit?: number, type?: string, cityId?: string }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Infrastructure>>(`/infrastructure${queryParams}`);
  },

  getInfrastructureById: async (id: string) => {
    return fetchAPI<SingleResponse<Infrastructure>>(`/infrastructure/${id}`);
  },
  createInfrastructure: async (data: Partial<Infrastructure>) => {
    return fetchAPI<SingleResponse<Infrastructure>>('/infrastructure', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateInfrastructure: async (id: string, data: Partial<Infrastructure>) => {
    return fetchAPI<SingleResponse<Infrastructure>>(`/infrastructure/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteInfrastructure: async (id: string) => {
    return fetchAPI<{ success: boolean }>(`/infrastructure/${id}`, {
      method: 'DELETE',
    });
  },
};

// Restaurant API calls
export const RestaurantAPI = {
  getAllRestaurants: async (params?: {
    localOrganicIngredients?: boolean;
    energyEfficientEquipment?: boolean;
    wasteReduction?: boolean;
    priceCategory?: string;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Infrastructure & { infrastructure_restaurant: InfrastructureRestaurant }>>(`/restaurants${queryParams}`);
  },

  createRestaurant: async (data: CreateRestaurantRequest) => {
    return fetchAPI<SingleResponse<Infrastructure & { infrastructure_restaurant: InfrastructureRestaurant }>>('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Events API calls
export const EventsAPI = {
  getAllEvents: async (params?: {
    cityId?: string;
    venueId?: string;
    eventType?: string;
    name?: string;
    minAttendance?: number;
    maxAttendance?: number;
    startDate?: string;
    endDate?: string;
    isFree?: boolean;
    limit?: number;
    offset?: number;
    format?: 'json' | 'csv' | 'excel';
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Event>>(`/events${queryParams}`);
  },
};

// Sensors API calls
export const SensorsAPI = {
  getAllSensors: async (params?: {
    sensorType?: string;
    cityId?: string;
    stateId?: string;
    roadId?: string;
    limit?: number;
    offset?: number;
    format?: 'json' | 'csv' | 'excel';
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Sensor>>(`/sensors${queryParams}`);
  },
};

// Hotel API calls
export const HotelAPI = {
  getAllHotels: async (params?: {
    minStarRating?: number;
    waterConservation?: boolean;
    organicLinens?: boolean;
    energyEfficient?: boolean;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Infrastructure & { infrastructure_hotel: InfrastructureHotel }>>(`/hotels${queryParams}`);
  },

  createHotel: async (data: CreateHotelRequest) => {
    return fetchAPI<SingleResponse<Infrastructure & { infrastructure_hotel: InfrastructureHotel }>>('/hotels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Park API calls
export const ParkAPI = {
  getAllParks: async (params?: {
    nativePlantings?: boolean;
    wildlifeHabitat?: boolean;
    sustainableIrrigation?: boolean;
    minAreaKm2?: number;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Infrastructure & { infrastructure_park: InfrastructurePark }>>(`/parks${queryParams}`);
  },

  createPark: async (data: CreateParkRequest) => {
    return fetchAPI<SingleResponse<Infrastructure & { infrastructure_park: InfrastructurePark }>>('/parks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Transportation Hub API calls
export const TransportationHubAPI = {
  getAllTransportationHubs: async (params?: {
    hasChargingStation?: boolean;
    hasBikeParking?: boolean;
    isPedestrianFriendly?: boolean;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<Infrastructure & { infrastructure_transportation_hub: InfrastructureTransportationHub }>>(`/transportation-hubs${queryParams}`);
  },

  createTransportationHub: async (data: CreateTransportationHubRequest) => {
    return fetchAPI<SingleResponse<Infrastructure & { infrastructure_transportation_hub: InfrastructureTransportationHub }>>('/transportation-hubs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Transport Route API calls
export const TransportRouteAPI = {
  getAllTransportRoutes: async (params?: {
    transportType?: string;
    originCityId?: string;
    destinationCityId?: string;
    maxDistanceKm?: number;
    maxCarbonFootprint?: number;
    minEfficiencyScore?: number;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<TransportRoute>>(`/transport-routes${queryParams}`);
  },

  getTransportRouteById: async (id: string) => {
    return fetchAPI<SingleResponse<TransportRoute>>(`/transport-routes/${id}`);
  },

  createTransportRoute: async (data: CreateTransportRouteRequest) => {
    return fetchAPI<SingleResponse<TransportRoute>>('/transport-routes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Electric Rental Vehicle API calls
export const ElectricVehicleAPI = {
  getAllVehicles: async (params?: {
    cityId?: string;
    vehicleType?: string;
    make?: string;
    model?: string;
    minElectricRange?: number;
    maxRentalCost?: number;
    minCapacity?: number;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<ElectricRentalVehicle>>(`/vehicles${queryParams}`);
  },

  createVehicle: async (data: CreateElectricVehicleRequest) => {
    return fetchAPI<SingleResponse<ElectricRentalVehicle>>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// City API calls
export const CityAPI = {
  getAllCities: async (params?: {
    hasGreenInitiative?: boolean;
    minGreenSpacePercent?: number;
    limit?: number;
  }) => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return fetchAPI<PaginatedResponse<City>>(`/cities${queryParams}`);
  },

  getCityById: async (id: string) => {
    return fetchAPI<SingleResponse<City>>(`/cities/${id}`);
  },

  createCity: async (data: Partial<City>) => {
    return fetchAPI<SingleResponse<City>>('/cities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
