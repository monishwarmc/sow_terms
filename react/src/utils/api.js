// utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getTermById = async (id) => {
  const response = await axios.get(`${BASE_URL}/terms/${id}`);
  return response.data;
};
