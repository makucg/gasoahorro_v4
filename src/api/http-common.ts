import axios from 'axios';

export const BASE_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;

const OPEN_ROUTE_SERVICE_URL = 'https://api.openrouteservice.org/v2/matrix/driving-car';

export const openRouteService = axios.create({
  baseURL: OPEN_ROUTE_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY || '',
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
  },
});
