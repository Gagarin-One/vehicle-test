import React, { useState, useEffect } from 'react';
import { useVehicleStore } from '../../../entities/vehicle/model/vehicleStore';

import type { Vehicle } from '../../../entities/vehicle/model/types';
import { Modal } from '../../../entities/vehicle/ui/Modal/Modal';
import { Input } from '../../../entities/vehicle/ui/Input/Input';
import { Button } from '../../../entities/vehicle/ui/Button/Button';

interface EditVehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditVehicleModal: React.FC<EditVehicleModalProps> = ({ vehicle, isOpen, onClose }) => {
  const updateVehicle = useVehicleStore(state => state.updateVehicle);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name);
      setPrice(vehicle.price);
    }
  }, [vehicle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicle) {
      updateVehicle(vehicle.id, { name, price });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Vehicle">
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};