'use client';

import type { IEstacion } from '@/types/gaso-types';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import DetalleEstacionCard from './estacion-card';

type DetalleEstacionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  estacion: IEstacion | null;
};

const DetalleEstacionModal: React.FC<DetalleEstacionModalProps> = ({
  isOpen,
  onClose,
  estacion,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    closeButton
    aria-labelledby="detalle-estacion-modal"
    className="w-full max-w-4xl p-4"
    style={{
      background: 'linear-gradient(to bottom right, var(--nextui-background-gradientStart), var(--nextui-background-gradientEnd))',
    }}
  >
    <ModalContent>
      <ModalHeader>
        Detalle de la estación
      </ModalHeader>
      <ModalBody>
        {estacion && <DetalleEstacionCard estacion={estacion} />}
      </ModalBody>
      <ModalFooter>
        <Button variant="flat" onPress={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DetalleEstacionModal;
