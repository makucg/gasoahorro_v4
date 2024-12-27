'use client';

import type { IEstacion } from '@/types/gaso-types';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

// Importa el contenedor dinámicamente
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

type EstacionesMapMobileProps = {
  estaciones: IEstacion[];
  estacionSeleccionada?: IEstacion | null;
  defaultCoordinates: [number, number];
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
};

const EstacionesMapMobile: React.FC<EstacionesMapMobileProps> = ({
  estaciones,
  estacionSeleccionada,
  defaultCoordinates,
  onInteractionStart,
  onInteractionEnd,
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
          iconSize: [30, 50], // Tamaño más grande para móvil
          iconAnchor: [15, 50],
        }),
      );

      setSelectedIcon(
        new leaflet.Icon({
          iconUrl: '/assets/marker-red.png',
          iconSize: [40, 60], // Tamaño más grande para móvil
          iconAnchor: [20, 60],
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
    <div
      className="h-[calc(100vh-150px)] w-full"
      onTouchStart={onInteractionStart}
      onTouchEnd={onInteractionEnd}
      onMouseDown={onInteractionStart}
      onMouseUp={onInteractionEnd}
      role="none"
    >
      <MapContainer
        center={initialCoordinates}
        zoom={14}
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
                <div className="text-sm">
                  <p className="font-bold">{estacion.Rótulo}</p>
                  <p>{estacion.Dirección}</p>
                  <p className="mt-1">
                    Precio:
                    {' '}
                    <span className="font-semibold">
                      {estacion.precio}
                      {' '}
                      €/L
                    </span>
                  </p>
                  <Button
                    className="mt-2 w-full text-xs"
                    onPress={() => {
                      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                    }}
                  >
                    Navegar en Google Maps
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EstacionesMapMobile;
