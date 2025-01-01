import type { IComunidad, IMunicipio, IProducto, IProvincia, IResultados } from '@/types/gaso-types';
import { assignDistances, calculateDistance, convertPrice, getMaxMinPrice, sortData } from '@/utils/data';
import { calculateGradient } from '@/utils/gradient';
import { Endpoints } from '../config';
import http from '../http-common';
import { getUserLocation } from './locationService';

export const getProductos = async (): Promise<IProducto[]> => {
  const response = await http.get<IProducto[]>(Endpoints.productos);
  return response.data;
};

export const getComunidades = async (): Promise<IComunidad[]> => {
  const response = await http.get<IComunidad[]>(Endpoints.comunidades);
  return response.data;
};

export const getProvincias = async (idCCAA: string): Promise<IProvincia[]> => {
  const response = await http.get<IProvincia[]>(`${Endpoints.provincias}/${idCCAA}`);
  return response.data;
};

export const getMunicipios = async (idProvincia: string): Promise<IMunicipio[]> => {
  const response = await http.get<IMunicipio[]>(`${Endpoints.municipios}/${idProvincia}`);
  return response.data;
};

export const getEstaciones = async (
  filtro: { id?: string; producto: number; distancia?: number },
  tipo?: 'CCAA' | 'Provincia' | 'Municipio',
): Promise<IResultados> => {
  let data: IResultados = { ListaEESSPrecio: [] };
  if (!tipo) {
    // Verificamos que distancia esté presente en búsquedas por distancia
    if (!filtro.distancia) {
      throw new Error('El parámetro "distancia" es obligatorio para la búsqueda por distancia.');
    }
    // Caso de búsqueda por distancia
    const response = await http.get<IResultados>(`${Endpoints.filtroProducto}/${filtro.producto}`);
    data = response.data;

    // Get user location
    const userLocation = await getUserLocation();
    const { latitude: lat, longitude: lon } = userLocation.coords;

    // Calculate distance for each station
    data.ListaEESSPrecio = data.ListaEESSPrecio.map(estacion => ({
      ...estacion,
      distance: calculateDistance(lat, lon, Number(estacion.Latitud.replace(',', '.')), Number(estacion['Longitud (WGS84)'].replace(',', '.'))),
    }));

    // Filter by distance
    data.ListaEESSPrecio = data.ListaEESSPrecio.filter(estacion => filtro.distancia !== undefined && estacion.distance <= filtro.distancia);

    data = await assignDistances([lon, lat], data);
  } else {
  // Caso de búsqueda por CCAA, Provincia, o Municipio
    const endpointMap = {
      CCAA: Endpoints.filtroCCAA,
      Provincia: Endpoints.filtroProvincia,
      Municipio: Endpoints.filtroMunicipio,
    };

    const response = await http.get<IResultados>(`${endpointMap[tipo]}/${filtro.id}/${filtro.producto}`);
    data = response.data;
  }

  // Operations... (transform, sort, filter, etc.)
  // Convert price with comma to price with dot calling convertPrice from data.ts
  data.ListaEESSPrecio = data.ListaEESSPrecio.map(estacion => ({
    ...estacion,
    precio: convertPrice(estacion.PrecioProducto),
  }));

  // Sort by price calling the sortData function in data.ts
  data.ListaEESSPrecio = sortData(data, 'price');

  // Obtain max and min price
  const { maxPrice, minPrice } = getMaxMinPrice(data.ListaEESSPrecio);

  // Calculate gradient for each station
  data.ListaEESSPrecio = data.ListaEESSPrecio.map(estacion => ({
    ...estacion,
    gradient: calculateGradient(estacion.precio, minPrice, maxPrice),
  }));

  // Return the data
  return data;
};
