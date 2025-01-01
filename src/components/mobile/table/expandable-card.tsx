'use client';

import type { IEstacion } from '@/types/gaso-types';
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, CurrencyEuroIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@nextui-org/react';
import { useState } from 'react';

type ExpandableCardProps = {
  estacion: IEstacion;
};

const ExpandableCard: React.FC<ExpandableCardProps> = ({ estacion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card
      className={`w-full rounded-lg border shadow-md ${
        isExpanded ? 'mb-4' : 'mb-2'
      } transition-all`}
    >
      {/* Card Header - Always Visible */}
      <CardHeader
        onClick={toggleExpand}
        className="flex items-center justify-between p-4"
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{estacion.Rótulo}</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="size-5 text-primary-500" />
              <p className="text-sm text-gray-600">
                {estacion.distance.toFixed(2).replace('.', ',')}
                {' '}
                km
              </p>
            </div>
            {estacion.distance_map !== null && (
              <p className="pl-7 text-sm text-gray-600">
                (aprox.
                {' '}
                {estacion.distance_map.toFixed(2).replace('.', ',')}
                {' '}
                km)
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Chip
            style={{
              backgroundColor: estacion.gradient || 'gray',
              color: 'white',
            }}
            className="text-sm font-semibold"
          >
            {estacion.PrecioProducto}
            {' '}
            €/L
          </Chip>
          <div className="ml-auto flex items-center">
            <Button
              isIconOnly
              variant="light"
              color="primary"
              aria-label="Expandir o colapsar"
              onPress={toggleExpand}
              className="ml-2"
            >
              {isExpanded ? <ChevronUpIcon className="size-6 text-gray-600" /> : <ChevronDownIcon className="size-6 text-gray-600" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Divider />

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          {/* Card Body */}
          <CardBody className="p-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <CurrencyEuroIcon className="size-5 text-primary-500" />
                <p className="text-sm">
                  <strong>Precio:</strong>
                  {' '}
                  {estacion.PrecioProducto}
                  {' '}
                  €/L
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-5 text-primary-500" />
                <p className="text-sm">
                  <strong>Dirección:</strong>
                  {' '}
                  {estacion.Dirección}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-5 text-primary-500" />
                <p className="text-sm">
                  <strong>Localidad:</strong>
                  {' '}
                  {estacion.Localidad}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-5 text-primary-500" />
                <p className="text-sm">
                  <strong>Provincia:</strong>
                  {' '}
                  {estacion.Provincia}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-5 text-primary-500" />
                <p className="text-sm">
                  <strong>Horario:</strong>
                  {' '}
                  {estacion.Horario}
                </p>
              </div>
            </div>
          </CardBody>

          <Divider />

          {/* Card Footer */}
          <CardFooter className="p-4">
            <Button
              className="w-full"
              color="primary"
              variant="ghost"
              aria-label="Abrir mapa"
              onPress={() => {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${estacion.Dirección}, ${estacion.Localidad}, ${estacion.Rótulo}`,
                )}`, '_blank');
              }}
            >
              Abrir mapa
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ExpandableCard;
