import type { IComunidad, IMunicipio, IProducto, IProvincia, IResultados } from '@/types/gaso-types';
import { getComunidades, getEstaciones, getMunicipios, getProductos, getProvincias } from '@/api/services/estacionesService';
import { logger } from '@/utils/logger';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProductos = () =>
  useQuery<IProducto[], Error>({
    queryKey: ['productos'],
    queryFn: getProductos,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

export const useComunidades = () =>
  useQuery<IComunidad[], Error>({
    queryKey: ['comunidades'],
    queryFn: getComunidades,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

export const useProvincias = (idCCAA: string | null) =>
  useQuery<IProvincia[], Error>({
    queryKey: ['provincias', idCCAA],
    queryFn: () => (idCCAA ? getProvincias(idCCAA) : Promise.resolve([])),
    enabled: !!idCCAA, // Solo se ejecuta si hay una comunidad seleccionada
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

export const useMunicipios = (idProvincia: string | null) =>
  useQuery<IMunicipio[], Error>({
    queryKey: ['municipios', idProvincia],
    queryFn: () => (idProvincia ? getMunicipios(idProvincia) : Promise.resolve([])),
    enabled: !!idProvincia, // Solo se ejecuta si hay una provincia seleccionada
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

export type FetchEstacionesParams = {
  id?: string; // ID opcional (CCAA, Provincia o Municipio)
  producto: number; // ID del producto requerido
  tipo?: 'CCAA' | 'Provincia' | 'Municipio'; // Tipo opcional
  distancia?: number; // Obligatorio solo si `tipo` es undefined
};

export const useEstaciones = () =>
  useMutation<IResultados, Error, FetchEstacionesParams>({
    mutationFn: ({ id, producto, tipo, distancia }: FetchEstacionesParams) =>
      getEstaciones({ id, producto, distancia }, tipo),
    onError: (error) => {
      logger.error('Error al buscar estaciones:', error);
    },
  });
