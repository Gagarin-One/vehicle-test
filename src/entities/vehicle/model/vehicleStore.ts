import { create } from 'zustand';
import type { Vehicle } from './types';
import { fetchVehicles } from '../api/vehicleApi';

interface VehicleStore {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: number, data: Partial<Pick<Vehicle, 'name' | 'price'>>) => void;
  deleteVehicle: (id: number) => void;
  sortBy: (key: 'year' | 'price') => void;
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true });
    try {
      const data = await fetchVehicles();
      set({ vehicles: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  addVehicle: (vehicle) => {
    const newId = Math.max(...get().vehicles.map(v => v.id), 0) + 1;
    set({ vehicles: [...get().vehicles, { id: newId, ...vehicle }] });
  },
  updateVehicle: (id, data) => {
    set({
      vehicles: get().vehicles.map(v => v.id === id ? { ...v, ...data } : v)
    });
  },
  deleteVehicle: (id) => {
    set({ vehicles: get().vehicles.filter(v => v.id !== id) });
  },
  sortBy: (key) => {
    const sorted = [...get().vehicles].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    set({ vehicles: sorted });
  },
}));