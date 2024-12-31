'use client';

import type { IEstacion } from '@/types/gaso-types';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

const MapContainer = dynamic(
  () => import('react-leaflet').then(module => module.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(module => module.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import('react-leaflet').then(module => module.Marker),
  { ssr: false },
);
const Popup = dynamic(
  () => import('react-leaflet').then(module => module.Popup),
  { ssr: false },
);

type EstacionesMapProps = {
  estaciones: IEstacion[];
  estacionSeleccionada?: IEstacion | null;
  defaultCoordinates: [number, number];
};

const EstacionesMap: React.FC<EstacionesMapProps> = ({
  estaciones,
  estacionSeleccionada,
  defaultCoordinates,
}) => {
  const [L, setLeaflet] = useState<typeof import('leaflet') | null>(null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Importar Leaflet dinámicamente
    import('leaflet').then((leaflet) => {
      setLeaflet(leaflet);

      setCustomIcon(
        new leaflet.Icon({
          iconUrl: '/assets/marker-blue.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      );

      setSelectedIcon(
        new leaflet.Icon({
          iconUrl: '/assets/marker-red.png',
          iconSize: [32, 42],
          iconAnchor: [12, 41],
        }),
      );
    });
  }, []);

  const initialCoordinates: [number, number] = useMemo(() => {
    if (estacionSeleccionada) {
      return [
        Number(estacionSeleccionada.Latitud.replace(',', '.')),
        Number(estacionSeleccionada['Longitud (WGS84)'].replace(',', '.')),
      ];
    }
    return defaultCoordinates;
  }, [estacionSeleccionada, defaultCoordinates]);

  if (!L || !customIcon || !selectedIcon) {
    return null; // Espera a que Leaflet se cargue
  }

  return (
    <div className="h-96 w-full grow">
      <MapContainer
        center={initialCoordinates}
        zoom={14}
        className="size-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {estaciones.map((estacion) => {
          const lat = Number(estacion.Latitud.replace(',', '.'));
          const lng = Number(estacion['Longitud (WGS84)'].replace(',', '.'));
          const isSelected = estacionSeleccionada?.IDEESS === estacion.IDEESS;

          return (
            <Marker
              key={estacion.IDEESS}
              position={[lat, lng]}
              icon={isSelected ? selectedIcon : customIcon}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup>
                <p>
                  <strong>{estacion.Rótulo}</strong>
                </p>
                <p>{estacion.Dirección}</p>
                <p>
                  Precio:
                  {estacion.precio}
                  {' '}
                  €/L
                </p>
                <Button
                  className="mt-2 rounded-lg px-3 py-1 text-sm text-white"
                  onPress={() => {
                    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                  }}
                  aria-label="Navegar en Maps"
                >
                  Navegar en Maps
                </Button>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EstacionesMap;
