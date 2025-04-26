// Types for API responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: any;
}

// Types for Infrastructure models
export interface Infrastructure {
  id: string;
  type: string;
  subtype: string | null;
  name: string | null;
  opening_date: Date | null;
  green_score: number | null;
  carbon_footprint_kg_per_year: number | null;
  energy_efficiency_score: number | null;
  water_efficiency_score: number | null;
  waste_management_score: number | null;
  renewable_energy_percentage: number | null;
  green_certification: boolean | null;
  city_id: string | null;
  location?: any;
  cities?: City;
}

// Restaurant specific data
export interface InfrastructureRestaurant {
  infra_id: string;
  price_category: string | null;
  seating_capacity: number | null;
  local_organic_ingredients: boolean | null;
  energy_efficient_kitchen_equipment: boolean | null;
  waste_reduction_program: boolean | null;
  infrastructure?: Infrastructure;
}

// Hotel specific data
export interface InfrastructureHotel {
  infra_id: string;
  star_rating: number | null;
  room_count: number | null;
  energy_efficient_lighting: boolean | null;
  water_conservation_systems: boolean | null;
  organic_linens: boolean | null;
  infrastructure?: Infrastructure;
}

// Park specific data
export interface InfrastructurePark {
  infra_id: string;
  size: string | null;
  area_km2: number | null;
  native_plantings: boolean | null;
  wildlife_habitat: boolean | null;
  sustainable_irrigation: boolean | null;
  infrastructure?: Infrastructure;
}

// Transportation Hub specific data
export interface InfrastructureTransportationHub {
  infra_id: string;
  hub_type: string | null;
  passenger_capacity_per_day: number | null;
  electric_vehicle_charging_stations: boolean | null;
  bike_parking_spaces: number | null;
  pedestrian_friendly_design: boolean | null;
  infrastructure?: Infrastructure;
}

// Transport Route
export interface TransportRoute {
  route_id: string;
  route_name: string;
  transport_type: string;
  origin_city_id: string;
  destination_city_id: string;
  distance_km: number;
  travel_minutes: number;
  frequency: string;
  departure_times: string;
  capacity: number;
  price: number;
  utilization_percent: number;
  efficiency_score: number;
  carbon_footprint_kg: number;
  cities_transport_routes_origin_city_idTocities?: City;
  cities_transport_routes_destination_city_idTocities?: City;
}

// City
export interface City {
  city_id: string;
  name: string;
  state_province: string | null;
  country: string;
  population: number | null;
  area_km2: number | null;
  green_space_percent: number | null;
  renewable_energy_percent: number | null;
  public_transport_coverage_percent: number | null;
  green_building_percent: number | null;
  has_green_initiatives: boolean | null;
  walking_score: number | null;
  cycling_score: number | null;
  carbon_footprint_per_capita: number | null;
  sustainability_score: number | null;
  infrastructure?: Infrastructure[];
}

// Electric Rental Vehicle
export interface ElectricRentalVehicle {
  vehicle_id?: string;
  id?: string;
  vehicle_type?: string;
  type?: string;
  brand?: string;
  make?: string;
  model: string;
  infra_id?: string;
  city_id?: string | null;
  battery_range_km?: number;
  electric_range?: number | null;
  price_per_hour?: number;
  rental_cost_per_hour?: number | null;
  price_per_day?: number;
  available_vehicles?: number;
  capacity?: number | null;
  vin?: string | null;
  model_year?: number | null;
  dol_vehicle_id?: number | null;
  census_tract?: number | null;
  infrastructure?: Infrastructure;
  cities?: City;
}

// Request types for creation
export interface CreateRestaurantRequest {
  name: string;
  cityId?: string;
  subtype?: string;
  greenScore?: number;
  priceCategory?: string;
  seatingCapacity?: number;
  localOrganicIngredients?: boolean;
  energyEfficientKitchenEquipment?: boolean;
  wasteReductionProgram?: boolean;
}

export interface CreateHotelRequest {
  name: string;
  cityId?: string;
  greenScore?: number;
  starRating?: number;
  roomCount?: number;
  energyEfficientLighting?: boolean;
  waterConservationSystems?: boolean;
  organicLinens?: boolean;
}

export interface CreateParkRequest {
  name: string;
  cityId?: string;
  greenScore?: number;
  size?: string;
  areaKm2?: number;
  nativePlantings?: boolean;
  wildlifeHabitat?: boolean;
  sustainableIrrigation?: boolean;
}

export interface CreateTransportationHubRequest {
  name: string;
  cityId?: string;
  greenScore?: number;
  hubType?: string;
  passengerCapacityPerDay?: number;
  electricVehicleChargingStations?: boolean;
  bikeParkingSpaces?: number;
  pedestrianFriendlyDesign?: boolean;
}

export interface CreateTransportRouteRequest {
  routeName: string;
  transportType: string;
  originCityId: string;
  destinationCityId: string;
}
// Request for creating an Electric Rental Vehicle
export interface CreateElectricVehicleRequest {
  id?: string;
  cityId: string;
  vin?: string;
  modelYear?: number;
  make?: string;
  model?: string;
  electricRange?: number;
  rentalCostPerHour?: number;
  capacity?: number;
  type?: string;
  dol_vehicle_id?: number;
  census_tract?: number;
}
