import React, { useEffect } from 'react';
import { useVehicleStore } from '../../entities/vehicle/model/vehicleStore';
import { CreateVehicleForm } from '../../features/vehicles/create/CreateVehicleForm';
import { SortControls } from '../../features/vehicles/sort/SortControls';
import { VehicleTable } from '../../widgets/VehicleTable/VehicleTable';
import { VehicleMap } from '../../widgets/VehicleMap/VehicleMap';

export const VehiclesPage: React.FC = () => {
  const fetchVehicles = useVehicleStore(state => state.fetchVehicles);
  const loading = useVehicleStore(state => state.loading);
  const error = useVehicleStore(state => state.error);
  const vehicles = useVehicleStore(state => state.vehicles);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Vehicle Manager
      </h1>
      
      {/* Кнопки сортировки по центру */}
      <div className="flex justify-center">
        <SortControls />
      </div>
      
      {/* Две колонки: таблица и карта */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - таблица */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              Vehicles List ({vehicles.length})
            </h2>
          </div>
          <div className="p-4">
            <VehicleTable />
          </div>
        </div>
        
        {/* Правая колонка - карта */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              Vehicles Map
            </h2>
          </div>
          <div className="p-4">
            <VehicleMap />
          </div>
        </div>
      </div>
      
      {/* Форма добавления по центру */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
              Add New Vehicle
            </h2>
            <CreateVehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
};