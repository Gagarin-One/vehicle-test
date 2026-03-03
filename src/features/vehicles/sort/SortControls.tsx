import React from 'react';
import { useVehicleStore } from '../../../entities/vehicle/model/vehicleStore';

export const SortControls: React.FC = () => {
  const sortBy = useVehicleStore(state => state.sortBy);

  return (
    <div className="flex gap-4">
      <button
        onClick={() => sortBy('year')}
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
      >
        Sort by Year
      </button>
      <button
        onClick={() => sortBy('price')}
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
      >
        Sort by Price
      </button>
    </div>
  );
};