'use client';

import { getUserLocation } from '@/api/services/locationService';
import { useEstaciones } from '@/hooks/useGasolineras';
import { logger } from '@/utils/logger';
import { Button, Card, Spinner, Tab, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import FilterForm from './form/fiter-form';
import CardList from './table/card-list';

const EstacionesMapMobile = dynamic(() => import('./map/estaciones-map'), {
  loading: () => (
    <>
      <p>Cargando el mapa...</p>
      <Spinner />
    </>
  ),
  ssr: false,
});

const MobileHome: React.FC = () => {
  const { mutate: fetchEstaciones, data, status, error } = useEstaciones();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [canUseLocation, setCanUseLocation] = useState(false);
  const [activeTab, setActiveTab] = useState<'lista' | 'mapa'>('lista');
  const [isInteractingWithMap, setIsInteractingWithMap] = useState(false);

  const estaciones = data?.ListaEESSPrecio || [];

  useEffect(() => {
    getUserLocation()
      .then((position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
        setCanUseLocation(true);
      })
      .catch((err) => {
        logger.log('No se pudo obtener la ubicación del usuario:', err.message);
        setCanUseLocation(false);
      });
  }, []);

  const requestLocation = () => {
    getUserLocation()
      .then((position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
        setCanUseLocation(true);
      })
      .catch((err) => {
        logger.log('No se pudo obtener la ubicación del usuario:', err.message);
        setCanUseLocation(false);
      });
  };

  const handleFiltroSubmit = (filtro: any) => {
    fetchEstaciones(filtro);
  };

  // Configuración de gestos
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isInteractingWithMap && activeTab === 'lista') {
        setActiveTab('mapa');
      }
    },
    onSwipedRight: () => {
      if (!isInteractingWithMap && activeTab === 'mapa') {
        setActiveTab('lista');
      }
    },
    preventScrollOnSwipe: true,
  });

  return (
    <div className="flex min-h-screen flex-col" {...swipeHandlers}>
      {canUseLocation
        ? (
            <>
              {/* Filtro */}
              <div className="mx-auto w-full">
                <h1 className="mb-4 text-center text-2xl font-bold">Encuentra Gasolineras</h1>
                <FilterForm onSubmit={handleFiltroSubmit} canUseLocation={canUseLocation} />
              </div>

              {/* Tabs para Lista y Mapa */}
              <Tabs
                aria-label="Vista de Estaciones"
                className="mt-6"
                selectedKey={activeTab}
                onSelectionChange={key => setActiveTab(key as 'lista' | 'mapa')}
                classNames={{
                  tabList: 'mx-auto',
                }}
              >
                <Tab key="lista" title="Lista">
                  <div className="">
                    {status === 'pending' && (
                      <Card className="bg-warning/10 p-4 text-warning">
                        <p>Cargando estaciones...</p>
                      </Card>
                    )}
                    {status === 'error' && (
                      <Card className="bg-danger/10 p-4 text-danger">
                        <p>
                          Error:
                          {error.message}
                        </p>
                      </Card>
                    )}
                    {status === 'success' && estaciones.length === 0 && (
                      <Card className="bg-warning/10 p-4 text-warning">
                        <p>No se encontraron estaciones.</p>
                      </Card>
                    )}
                    {status === 'success' && estaciones.length > 0 && (
                      <CardList estaciones={estaciones} />
                    )}
                  </div>
                </Tab>
                <Tab key="mapa" title="Mapa">
                  <div className="flex h-full items-center justify-center">
                    {estaciones.length > 0 && userLocation && (
                      <EstacionesMapMobile
                        estaciones={estaciones}
                        estacionSeleccionada={null}
                        defaultCoordinates={userLocation || [42.8782, -8.5448]}
                        onInteractionStart={() => setIsInteractingWithMap(true)}
                        onInteractionEnd={() => setIsInteractingWithMap(false)}
                      />
                    )}
                  </div>
                </Tab>
              </Tabs>
            </>
          )
        : (
            <Card className="mx-auto w-full max-w-sm bg-white p-6 shadow-md">
              <h2 className="mb-4 text-center text-lg font-semibold text-red-600">
                Activar Localización
              </h2>
              <p className="mb-6 text-center text-gray-700">
                Es necesario activar la localización en tu dispositivo para continuar.
              </p>
              <Button onPress={requestLocation} className="w-full" color="primary" variant="solid">
                Activar Localización
              </Button>
            </Card>
          )}
    </div>
  );
};

export default MobileHome;
