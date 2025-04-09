// /hooks/useAdminAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { loginUser } from "@/utils/auth";

export const useAdminAuth = () => {
  const { logout, login } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const handleLogin = async () => {
    try {
      const { token, role } = await loginUser(email, password);

      if (role !== "admin") {
        alert("Access denied: not an admin");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      login(token, role);
      router.push("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return {
    email,
    password,
    isLoading,
    isAuthorized,
    handleLogin,
    handleLogout,
    setEmail,
    setPassword,
  };
};
