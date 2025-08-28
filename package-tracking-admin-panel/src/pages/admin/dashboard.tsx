import Sidebar from "@/components/sidebar/SidebarSection";
import ProductsTable from "@/components/table/ProductTable";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { fetchProducts } from "@/utils/products";
import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  trackingId: string;
  productName: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
  orderDate: any,
  history: {
    location: string;
    time: string;
    _id: string;
  }[];
}

export default function DashboardPage() {
  const { isLoading, isAuthorized, handleLogout } = useAdminAuth();
  const [products, setProducts] = useState<any>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (isAuthorized) loadProducts();
  }, [isAuthorized]);

  const headers = [
    { key: "index", label: "#" },
    { key: "trackingId", label: "Tracking ID" },
    { key: "productName", label: "Product Name" },
    { key: "status", label: "Status" },
    { key: "currentLocation", label: "Current Location" },
    { key: "estimatedDelivery", label: "Estimated Delivery" },
    { key: "orderDate", label: "Order Date" },
    { key: "lastUpdated", label: "Last Updated" },
  ];

  if (isLoading || loadingProducts) return <p>Loading...</p>;
  if (!isAuthorized) return null;

  return (
    <div className="antialiased bg-gray-200 h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">📦 Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Logout
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Product Tracking List</h2>

          <ProductsTable
            headers={headers}
            data={products}
            setProducts={setProducts}
            onProductAdded={(newProd) =>
              setProducts((prev: any) => [...prev, newProd])
            }
          />
        </div>
      </main>
    </div>
  );
}
