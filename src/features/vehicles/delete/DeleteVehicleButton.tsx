import React from 'react';
import { useVehicleStore } from '../../../entities/vehicle/model/vehicleStore';

interface DeleteVehicleButtonProps {
  id: number;
}

export const DeleteVehicleButton: React.FC<DeleteVehicleButtonProps> = ({ id }) => {
  const deleteVehicle = useVehicleStore(state => state.deleteVehicle);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteVehicle(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900 transition-colors"
    >
      Delete
    </button>
  );
};