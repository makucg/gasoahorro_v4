// open route service
import { openRouteService } from '@/api/http-common';

export const getDistance = async (locations: [number, number][]) => {
  const body = {
    locations,
    metrics: ['distance'],
    units: 'km',
  };

  const response = await openRouteService.post('', body);
  return response.data;
};
