'use client';

import type { IEstacion } from '@/types/gaso-types';
import ExpandableCard from '@/components/mobile/table/expandable-card';

type CardListProps = {
  estaciones: IEstacion[]; // Lista de estaciones
  userLocation: [number, number] | null; // Coordenadas del usuario
};

const CardList: React.FC<CardListProps> = ({ estaciones, userLocation }) => {
  if (estaciones.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-center text-gray-500">
        <p>No hay resultados disponibles. Intenta ajustar los filtros.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {estaciones.map((estacion, _index) => (
        <ExpandableCard key={estacion.IDEESS} estacion={estacion} userLocation={userLocation} />
      ))}
    </div>
  );
};

export default CardList;
