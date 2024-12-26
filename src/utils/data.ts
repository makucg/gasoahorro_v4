import type { IResultados } from '@/types/gaso-types';

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
