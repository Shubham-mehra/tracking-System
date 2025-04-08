// /utils/auth.ts
import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
    email,
    password,
  });
  return res.data;
};

// utils/auth.ts
export const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
  
    const token = localStorage.getItem("token");
    return !!token;
  };
  
