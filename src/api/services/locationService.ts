// locationService.ts
export const getUserLocation = (): Promise<GeolocationPosition> => {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('Geolocalización no es soportada por el navegador.'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
