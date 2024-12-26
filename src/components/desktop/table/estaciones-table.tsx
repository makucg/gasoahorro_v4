'use client';

import type { IEstacion } from '@/types/gaso-types';
import {
  Chip,
  Image,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import React, { useCallback, useMemo, useState } from 'react';
import DetalleEstacionModal from './estacion-modal';

type Props = {
  estaciones: IEstacion[]; // Lista de estaciones
  rowsPerPage?: number; // Filas por página (configurable)
};

const EstacionesTable: React.FC<Props> = ({ estaciones, rowsPerPage = 20 }) => {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof IEstacion | null>(null);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstacion, setSelectedEstacion] = useState<IEstacion | null>(null);

  const pages = Math.ceil(estaciones.length / rowsPerPage);

  const handleOpenModal = (estacion: IEstacion) => {
    setSelectedEstacion(estacion);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEstacion(null);
    setModalOpen(false);
  };

  const sortedEstaciones = useMemo(() => {
    if (!sortColumn) {
      return estaciones;
    }

    const sorted = [...estaciones].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA < valB) {
        return sortDirection === 'ascending' ? -1 : 1;
      }
      if (valA > valB) {
        return sortDirection === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [estaciones, sortColumn, sortDirection]);

  const paginatedEstaciones = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedEstaciones.slice(start, start + rowsPerPage);
  }, [sortedEstaciones, page, rowsPerPage]);

  const handleSortChange = useCallback(
    (column: keyof IEstacion) => {
      if (sortColumn === column) {
        setSortDirection(prev => (prev === 'ascending' ? 'descending' : 'ascending'));
      } else {
        setSortColumn(column);
        setSortDirection('ascending');
      }
    },
    [sortColumn],
  );

  const renderCell = useCallback(
    (estacion: IEstacion, columnKey: keyof IEstacion | 'actions') => {
      if (columnKey === 'actions') {
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Ver Detalles">
              <span
                role="button"
                tabIndex={0}
                className="cursor-pointer text-lg text-default-400 active:opacity-50"
                onClick={() => handleOpenModal(estacion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenModal(estacion);
                  }
                }}
              >
                🛈
              </span>
            </Tooltip>
          </div>
        );
      }

      const cellValue = estacion[columnKey as keyof IEstacion];

      if (columnKey === 'logoUrl') {
        return <Image src={cellValue as string} alt="Logo" className="size-10 object-contain" />;
      }

      if (columnKey === 'PrecioProducto') {
        const color = estacion.gradient || 'gray';
        return (
          <Chip
            style={{
              backgroundColor: color,
            }}
          >
            {cellValue}
          </Chip>
        );
      }

      return cellValue;
    },
    [],
  );

  return (
    <>
      <Table
        aria-label="Tabla de estaciones de servicio"
        bottomContent={(
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={newPage => setPage(newPage)}
            />
          </div>
        )}
        classNames={{ wrapper: 'min-h-[222px]' }}
      >
        <TableHeader>
          <TableColumn key="logoUrl">Logo</TableColumn>
          <TableColumn key="Rótulo" allowsSorting onClick={() => handleSortChange('Rótulo')}>
            Rótulo
          </TableColumn>
          <TableColumn key="PrecioProducto" allowsSorting onClick={() => handleSortChange('PrecioProducto')}>
            Precio
          </TableColumn>
          <TableColumn key="actions">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={false}
          items={paginatedEstaciones}
          loadingContent={<Spinner label="Cargando estaciones..." />}
        >
          {estacion => (
            <TableRow key={estacion.IDEESS.toString()}>
              {columnKey => (
                <TableCell>{renderCell(estacion, columnKey as keyof IEstacion | 'actions')}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal */}
      <DetalleEstacionModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        estacion={selectedEstacion}
      />
    </>
  );
};

export default EstacionesTable;
