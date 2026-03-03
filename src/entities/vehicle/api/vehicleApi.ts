import axios from 'axios';

const API_URL = 'https://task.tspb.su/test-task/vehicles';

export const fetchVehicles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};