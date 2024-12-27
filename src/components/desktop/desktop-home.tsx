'use client';

import { getUserLocation } from '@/api/services/locationService';
import { useEstaciones } from '@/hooks/useGasolineras';
import { logger } from '@/utils/logger';
import { Spinner, Tab, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import FilterForm from './form/fiter-form';
import EstacionesTable from './table/estaciones-table';

const EstacionesMap = dynamic(() => import('./map/estaciones-map'), {
  loading: () => (
    <>
      <p>Cargando el mapa...</p>
      <Spinner />
    </>
  ),
  ssr: false,
});

const DesktopHome: React.FC = () => {
  const { mutate: fetchEstaciones, data, status, error } = useEstaciones();
  const [_filtro, setFiltro] = useState(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [canUseLocation, setCanUseLocation] = useState(false);

  useEffect(() => {
    getUserLocation()
      .then((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setCanUseLocation(true);
      })
      .catch((err) => {
        logger.log('No se pudo obtener la ubicación del usuario:', err.message);
        setCanUseLocation(false);
      });
  }, []);

  const handleFiltroSubmit = (nuevoFiltro: any) => {
    setFiltro(nuevoFiltro);

    fetchEstaciones(nuevoFiltro, {
      // onSuccess: data => logger.log('Estaciones cargadas exitosamente:', data),
      onError: err => logger.error('Error al cargar estaciones:', err),
    });
  };

  const estaciones = data?.ListaEESSPrecio || [];

  return (
    <section className="flex h-full flex-col pt-16">
      <div>
        <FilterForm onSubmit={handleFiltroSubmit} canUseLocation={canUseLocation} />
      </div>
      <div className="grow">
        <Tabs aria-label="Vista de Estaciones" color="primary" variant="bordered">
          <Tab
            key="list"
            title={(
              <div className="flex items-center space-x-2">
                <span>Lista</span>
              </div>
            )}
          >
            {status === 'pending' && (
              <div>
                Cargando estaciones...
                <Spinner />
              </div>
            )}
            {status === 'error' && (
              <div>
                Error:
                {error.message}
              </div>
            )}
            {status === 'success' && estaciones.length === 0 && (
              <div>No se encontraron estaciones.</div>
            )}
            {status === 'success' && estaciones.length > 0 && (
              <div>
                Se encontraron
                {' '}
                {estaciones.length}
                {' '}
                estaciones.
                <EstacionesTable estaciones={estaciones} rowsPerPage={20} />
              </div>
            )}
          </Tab>
          <Tab
            key="map"
            title={(
              <div className="flex items-center space-x-2">
                <span>Mapa</span>
              </div>
            )}
            isDisabled={!canUseLocation}
          >
            <div className="grow">
              {canUseLocation
                ? (
                    <EstacionesMap
                      estaciones={estaciones}
                      estacionSeleccionada={null}
                      defaultCoordinates={userLocation || [42.8782, -8.5448]}
                    />
                  )
                : (
                    <div>No se pudo acceder a la ubicación del usuario.</div>
                  )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default DesktopHome;
