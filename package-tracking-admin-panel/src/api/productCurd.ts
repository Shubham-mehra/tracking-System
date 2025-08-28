import axios from 'axios';

export const updateProduct = async (id: any, productData: any) => {
  
  const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/track/${id}/update`, productData);
  return res.data;
};


export const createNewProduct = async (productData: any) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/track`, productData);
    return res.data;
  };

  export const removeProduct = async (id: string) => {
    const token = localStorage.getItem("token"); // or however you're storing it
  
    if (!token) {
      throw new Error("No token found");
    }
  
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/track/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return res.data;
  };
  