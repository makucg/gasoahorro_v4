'use client';

import type { IEstacion } from '@/types/gaso-types';
import { ClockIcon, CurrencyEuroIcon, MapIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';
import { useState } from 'react';
import EstacionesMap from '../map/estaciones-map';

type DetalleEstacionCardProps = {
  estacion: IEstacion;
};

const DetalleEstacionCard: React.FC<DetalleEstacionCardProps> = ({ estacion }) => {
  const [imageError, setImageError] = useState(false);

  const coordinates = [
    Number(estacion.Latitud.replace(',', '.')),
    Number(estacion['Longitud (WGS84)'].replace(',', '.')),
  ] as [number, number];

  return (
    <Card
      className="w-full rounded-xl border border-gray-200 shadow-lg"
      style={{
        background: 'linear-gradient(to bottom right, var(--nextui-background-gradientStart), var(--nextui-background-gradientEnd))',
      }}
    >
      {/* Header */}
      <CardHeader className="flex items-center gap-6 rounded-t-xl p-6">
        {imageError || !estacion.logoUrl
          ? (
              <div className="flex size-20 items-center justify-center rounded-lg bg-gray-200">
                <p className="text-sm text-gray-500">No Image</p>
              </div>
            )
          : (
              <Image
                src={estacion.logoUrl}
                alt={`${estacion.Rótulo} Logo`}
                className="size-20 rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{estacion.Rótulo}</h3>
          <p className="text-sm">{estacion.Dirección}</p>
        </div>
      </CardHeader>

      {/* Divider */}
      <Divider />

      {/* Body */}
      <CardBody className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <CurrencyEuroIcon className="size-6 text-primary-500" />
            <p className="text-medium">
              <strong>Precio:</strong>
              {' '}
              {estacion.PrecioProducto}
              {' '}
              €/L
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon className="size-6 text-primary-500" />
            <p className="text-medium">
              <strong>Localidad:</strong>
              {' '}
              {estacion.Localidad}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="size-6 text-primary-500" />
            <p className="text-medium">
              <strong>Horario:</strong>
              {' '}
              {estacion.Horario}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MapIcon className="size-6 text-primary-500" />
            <p className="text-medium">
              <strong>Provincia:</strong>
              {' '}
              {estacion.Provincia}
            </p>
          </div>
        </div>
      </CardBody>

      {/* Divider */}
      <Divider />

      {/* Footer with Map */}
      <CardFooter className="rounded-b-xl bg-gray-50 p-6">
        <div className="w-full">
          <h4 className="mb-4 text-center text-lg font-semibold text-gray-800">Ubicación en el mapa</h4>
          <div className="overflow-hidden rounded-xl shadow-md">
            <EstacionesMap
              estaciones={[estacion]}
              estacionSeleccionada={estacion}
              defaultCoordinates={coordinates}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetalleEstacionCard;
