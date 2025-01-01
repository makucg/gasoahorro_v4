import type { DistanceResponse } from '@/types/gaso-types';
import { getDistance } from '@/api/services/openrouteService';
import { useMutation } from '@tanstack/react-query';

export const useDistanceCalculator = () =>
  useMutation<DistanceResponse, Error, [number, number][]>({
    mutationFn: (locations: [number, number][]) => getDistance(locations),
    onError: (error) => {
      console.error('Error al calcular la distancia:', error);
    },
  });
