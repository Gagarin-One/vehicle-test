import React, { useState } from 'react';
import { useVehicleStore } from '../../entities/vehicle/model/vehicleStore';
import { EditVehicleModal } from '../../features/vehicles/edit/EditVehicleModal';
import { DeleteVehicleButton } from '../../features/vehicles/delete/DeleteVehicleButton';
import type { Vehicle } from '../../entities/vehicle/model/types';

export const VehicleTable: React.FC = () => {
  const vehicles = useVehicleStore(state => state.vehicles);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No vehicles found. Add your first vehicle!
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.model}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.year}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  ${vehicle.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                  >
                    Edit
                  </button>
                  <DeleteVehicleButton id={vehicle.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditVehicleModal
        vehicle={editingVehicle}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};