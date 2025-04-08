// components/ProtectedRoute.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated() && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
