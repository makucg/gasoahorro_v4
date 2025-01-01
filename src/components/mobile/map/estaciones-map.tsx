'use client';

import type { IEstacion } from '@/types/gaso-types';
import type { Marker as LeafletMarker } from 'leaflet';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// Carga dinámica de los componentes de react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });

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
  const [isClient, setIsClient] = useState(false); // Detecta si estamos en el cliente
  const [L, setLeaflet] = useState<typeof import('leaflet') | null>(null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<L.Icon | null>(null);
  const markerRefs = useRef<{ [key: string]: LeafletMarker | null }>({});

  useEffect(() => {
    // Marcar que el cliente está listo
    setIsClient(true);

    // Cargar dinámicamente Leaflet
    import('leaflet').then((leaflet) => {
      setLeaflet(leaflet);
      setCustomIcon(
        new leaflet.Icon({
          iconUrl: '/assets/marker-blue.png',
          iconSize: [30, 50],
          iconAnchor: [15, 50],
        }),
      );
      setSelectedIcon(
        new leaflet.Icon({
          iconUrl: '/assets/marker-red.png',
          iconSize: [40, 60],
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

  // Solo renderiza si estamos en el cliente y todo está cargado
  if (!isClient || !L || !customIcon || !selectedIcon) {
    return null;
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
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomleft" />
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
              ref={(marker) => {
                markerRefs.current[estacion.IDEESS] = marker;
              }}
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
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${estacion.Dirección}, ${estacion.Localidad}, ${estacion.Rótulo}`,
                      )}`, '_blank');
                    }}
                    aria-label="Abrir mapa"
                  >
                    Abrir mapa
                  </Button>
                  <Button
                    className="mt-2 w-full text-xs"
                    color="danger"
                    onPress={() => {
                      const marker = markerRefs.current[estacion.IDEESS];
                      if (marker) {
                        marker.closePopup();
                      }
                    }}
                  >
                    Cerrar
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
