// utils/api.js
import axios from 'axios';

const BASE_URL = 'https://sow-terms-backend.onrender.com';

export const getTermById = async (id) => {
  const response = await axios.get(`${BASE_URL}/terms/${id}`);
  return response.data;
};
