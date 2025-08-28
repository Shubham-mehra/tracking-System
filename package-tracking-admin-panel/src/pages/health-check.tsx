// components/HealthCheck.tsx
'use client';

import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  mongo: string;
  time: string;
}

export default function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
console.log("helth", health)
  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch("http://localhost:8000/api/health"); // adjust backend URL if deployed
        const data: HealthResponse = await res.json();
        setHealth(data);
      } catch (err) {
        setHealth({ status: "error", mongo: "unknown", time: new Date().toISOString() });
      } finally {
        setLoading(false);
      }
    }
    fetchHealth();
  }, []);

  if (loading) return <p>Checking health...</p>;

  return (
    <div>
      <h2>System Health</h2>
      <p>Status: {health?.status}</p>
      <p>MongoDB: {health?.mongo}</p>
      <p>Time: {health?.time}</p>
    </div>
  );
}
