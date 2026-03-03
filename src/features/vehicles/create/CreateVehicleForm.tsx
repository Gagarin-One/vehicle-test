import React, { useState } from 'react';
import { useVehicleStore } from '../../../entities/vehicle/model/vehicleStore';
import { Input } from '../../../entities/vehicle/ui/Input/Input';


export const CreateVehicleForm: React.FC = () => {
  const addVehicle = useVehicleStore(state => state.addVehicle);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
    color: '',
    price: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Преобразуем строки в числа при отправке
    const vehicleData = {
      name: formData.name,
      model: formData.model,
      year: formData.year ? Number(formData.year) : new Date().getFullYear(),
      color: formData.color,
      price: formData.price ? Number(formData.price) : 0,
      latitude: formData.latitude ? Number(formData.latitude) : 0,
      longitude: formData.longitude ? Number(formData.longitude) : 0,
    };
    
    addVehicle(vehicleData);
    
    // Сбрасываем форму
    setFormData({
      name: '',
      model: '',
      year: '',
      color: '',
      price: '',
      latitude: '',
      longitude: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Toyota"
          type="text"
        />
        <Input 
          label="Model" 
          name="model" 
          value={formData.model} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Camry"
          type="text"
        />
        <Input 
          label="Year" 
          name="year" 
          value={formData.year} 
          onChange={handleChange} 
          required 
          placeholder="e.g., 2021"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <Input 
          label="Color" 
          name="color" 
          value={formData.color} 
          onChange={handleChange} 
          required 
          placeholder="e.g., red"
          type="text"
        />
        <Input 
          label="Price" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          required 
          placeholder="e.g., 21000"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <Input 
          label="Latitude" 
          name="latitude" 
          value={formData.latitude} 
          onChange={handleChange} 
          required 
          placeholder="e.g., 55.753332"
          type="text"
          inputMode="decimal"
        />
        <Input 
          label="Longitude" 
          name="longitude" 
          value={formData.longitude} 
          onChange={handleChange} 
          required 
          placeholder="e.g., 37.621676"
          type="text"
          inputMode="decimal"
        />
      </div>
      <div className="flex justify-center pt-4">
        <button 
          type="submit" 
          className="px-8 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Add Vehicle
        </button>
      </div>
    </form>
  );
};