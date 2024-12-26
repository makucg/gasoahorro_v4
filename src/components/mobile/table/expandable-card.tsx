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
        className="flex cursor-pointer items-center justify-between p-4"
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{estacion.Rótulo}</h3>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="size-5 text-primary-500" />
            <p className="text-sm text-gray-600">
              {estacion.distance.toFixed(2).replace('.', ',')}
              {' '}
              km
            </p>
          </div>
        </div>
        <div>
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
          <Button
            isIconOnly
            variant="light"
            color="primary"
            aria-label="Expandir o colapsar"
            onPress={toggleExpand}
          >
            {isExpanded
              ? (
                  <ChevronUpIcon className="size-6 text-gray-600" />
                )
              : (
                  <ChevronDownIcon className="size-6 text-gray-600" />
                )}
          </Button>
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
          <CardFooter className="bg-gray-50 p-4">
            <p className="text-center text-sm text-gray-500">
              Pulsa en la distancia para más información.
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ExpandableCard;
