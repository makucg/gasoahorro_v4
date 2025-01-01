import type { IResultados } from '@/types/gaso-types';
import { openRouteService } from '@/api/http-common';
import { logger } from './logger';

// Function to conver price with comma to price with dot from PrecioProducto to precio

export const convertPrice = (precio: string): number => {
  return Number(precio.replace(',', '.'));
};

export const sortData = (data: IResultados, sortType: 'distance' | 'price') => {
  return data.ListaEESSPrecio.sort((a, b) => {
    if (sortType === 'distance') {
      return a.distance - b.distance;
    } else {
      return a.precio - b.precio;
    }
  });
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180)
    * Math.cos((lat2 * Math.PI) / 180)
    * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  } else {
    return `${distance.toFixed(2)} km`;
  }
};

// Funcion that returns max and min price from a list of estaciones
export const getMaxMinPrice = (estaciones: IResultados['ListaEESSPrecio']) => {
  const precios = estaciones.map(estacion => convertPrice(estacion.PrecioProducto));
  const maxPrice = Math.max(...precios);
  const minPrice = Math.min(...precios);
  return { maxPrice, minPrice };
};

// Función para obtener distancias
export const assignDistances = async (
  userLocation: [number, number], // Coordenadas del usuario
  data: { ListaEESSPrecio: any[] }, // Datos de estaciones
) => {
  // Limitar el cálculo a 49 estaciones + 1 usuario
  const limitedStations = data.ListaEESSPrecio.slice(0, 49); // Primeras 49 estaciones
  const remainingStations = data.ListaEESSPrecio.slice(49); // Estaciones restantes

  const locations: [number, number][] = [
    userLocation,
    ...limitedStations.map((estacion) => {
      const lon = Number(estacion['Longitud (WGS84)'].replace(',', '.'));
      const lat = Number(estacion.Latitud.replace(',', '.'));
      return [lon, lat] as [number, number];
    }),
  ];

  logger.log('Locations:', locations);

  try {
    // Llamada única a la API para calcular distancias
    const body = {
      locations,
      metrics: ['distance'],
      units: 'km',
    };
    const response = await openRouteService.post('', body);
    logger.log('Distancias:', response.data);
    const distances = response.data.distances[0]; // Distancias desde userLocation a todas las estaciones

    // Asignar distancias desde la API
    const updatedStations = limitedStations.map((estacion, index) => ({
      ...estacion,
      distance_map: distances[index + 1], // Saltamos la primera distancia, que es userLocation -> userLocation (0)
    }));

    // Combinar las estaciones procesadas con las no procesadas
    data.ListaEESSPrecio = [
      ...updatedStations,
      ...remainingStations.map(estacion => ({
        ...estacion,
        distance_map: null, // Estaciones sin distancia calculada
      })),
    ];
  } catch (error) {
    console.error('Error al calcular distancias con la API, se usará el cálculo manual para las primeras 49 estaciones.', error);

    // Cálculo manual para las primeras 49 estaciones si falla la API
    const updatedStations = limitedStations.map(estacion => ({
      ...estacion,
      distance_map: calculateDistance(
        userLocation[1], // Latitud usuario
        userLocation[0], // Longitud usuario
        Number(estacion.Latitud.replace(',', '.')),
        Number(estacion['Longitud (WGS84)'].replace(',', '.')),
      ),
    }));

    // Combinar las estaciones procesadas con las no procesadas
    data.ListaEESSPrecio = [
      ...updatedStations,
      ...remainingStations.map(estacion => ({
        ...estacion,
        distance_map: null, // Estaciones sin distancia calculada
      })),
    ];
  }

  return data;
};
