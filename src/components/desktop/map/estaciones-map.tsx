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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Icono personalizado para la estación seleccionada
const selectedIcon = new L.Icon({
  iconUrl: '/assets/marker-red.png',
  iconSize: [32, 42],
  iconAnchor: [12, 41],
});

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
                <p><strong>{estacion.Rótulo}</strong></p>
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
                >
                  Navegar en Google Maps
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
