'use client';

import type { IEstacion } from '@/types/gaso-types';
import { Button } from '@nextui-org/react';
import L from 'leaflet';
import React, { useMemo } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// Icono personalizado para los marcadores
const customIcon = new L.Icon({
  iconUrl: '/assets/marker-blue.png',
  iconSize: [30, 50], // Tamaño más grande para móvil
  iconAnchor: [15, 50],
});

// Icono personalizado para la estación seleccionada
const selectedIcon = new L.Icon({
  iconUrl: '/assets/marker-red.png',
  iconSize: [40, 60], // Tamaño más grande para móvil
  iconAnchor: [20, 60],
});

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
  // Coordenadas iniciales basadas en la estación seleccionada o por defecto
  const initialCoordinates: [number, number] = useMemo(() => {
    if (estacionSeleccionada) {
      return [
        Number(estacionSeleccionada.Latitud.replace(',', '.')),
        Number(estacionSeleccionada['Longitud (WGS84)'].replace(',', '.')),
      ];
    }
    return defaultCoordinates;
  }, [estacionSeleccionada, defaultCoordinates]);

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
