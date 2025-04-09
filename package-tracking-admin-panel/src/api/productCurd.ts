import axios from 'axios';

export const updateProduct = async (id: any, productData: any) => {
  const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/track/${id}/update`, productData);
  return res.data;
};


export const createNewProduct = async (productData: any) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/track`, productData);
    return res.data;
  };