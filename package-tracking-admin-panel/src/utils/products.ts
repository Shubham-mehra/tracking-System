// /utils/products.ts
import axios from 'axios';

export const fetchProducts = async () => {
  const token = localStorage.getItem('token');

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/track/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // Assumes the API returns an array of products
};
