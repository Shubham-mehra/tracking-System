import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createNewProduct, removeProduct } from "@/api/productCurd";
import formatReadableDate from "@/utils/dateTimeFormatter";

interface Header {
  key: string;
  label: string;
}

interface Product {
  [key: string]: any;
  _id: string;
}

interface ProductsTableProps {
  headers: Header[];
  data: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onProductAdded: (newProd: Product) => void;
}

export default function ProductsTable({
  headers,
  data,
  onProductAdded,
  setProducts,
}: ProductsTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    trackingId: "",
    status: "",
    currentLocation: "",
    estimatedDelivery: "",
    orderDate: "",
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((product) =>
    (product.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1); // reset to first page on new search
  }, [searchTerm]);

  const getStatusData = (status: any) => {
    switch (status) {
      case "Ordered":
        return { percent: 20, color: "bg-gray-400" };
      case "Packed":
        return { percent: 40, color: "bg-blue-400" };
      case "Shipped":
        return { percent: 60, color: "bg-blue-600" };
      case "Out for Delivery":
        return { percent: 80, color: "bg-yellow-500" };
      case "Delivered":
        return { percent: 100, color: "bg-green-500" };
      case "Delayed":
        return { percent: 50, color: "bg-red-500" };
      default:
        return { percent: 0, color: "bg-gray-300" };
    }
  };

  const OrderStatusBar = ({ status }: any) => {
    const { percent, color } = getStatusData(status);

    return (
      <div className="w-full max-w-[120px] mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="text-[12px] text-gray-700">{status}</div>
      </div>
    );
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProduct({
      ...newProduct,
      status: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createNewProduct(newProduct);
      onProductAdded(created);
      setShowForm(false);
      setNewProduct({
        productName: "",
        trackingId: "",
        status: "",
        currentLocation: "",
        estimatedDelivery: "",
        orderDate: "",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded w-64"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        <button
          className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? (
            "Cancel"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 border p-4 rounded bg-gray-50 text-[10px]"
        >
          <h2 className="text-lg font-semibold mb-3">Add New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={newProduct.status}
                onChange={handleStatusChange}
                className="border px-3 py-2 rounded w-full"
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Ordered">Ordered</option>
                <option value="Packed">Packed</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Current Location
              </label>
              <input
                type="text"
                name="currentLocation"
                placeholder="Current Location"
                value={newProduct.currentLocation}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Order Date
              </label>
              <input
                type="date"
                name="orderDate"
                value={newProduct.orderDate}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Estimated Delivery
              </label>
              <input
                type="date"
                name="estimatedDelivery"
                min={newProduct.orderDate}
                value={newProduct.estimatedDelivery}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}
      <table className="min-w-full border  text-[10px]">
        <thead className="bg-gray-50">
          <tr className="text-gray-700">
            {headers.map((header, i) => (
              <th
                key={i}
                className="border border-gray-200 px-4 py-3 text-center font-medium"
              >
                {header.label}
              </th>
            ))}
            <th
              colSpan={2}
              className="border border-gray-200 px-4 py-3 text-center font-medium"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length + 2}
                className="text-center py-6 text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            paginatedData.map((product, idx) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 transition duration-150"
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="border border-gray-200 px-4 py-3 text-center"
                  >
                    {header.key === "index" ? (
                      (currentPage - 1) * itemsPerPage + idx + 1
                    ) : header.key === "lastUpdated" ? (
                      formatReadableDate(product.history?.at(-1)?.time)
                    ) : header.key === "status" ? (
                      <OrderStatusBar status={product.status} />
                    ) : (
                      product[header.key]
                    )}
                  </td>
                ))}
                <td className="border border-gray-200 px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "editProductData",
                        JSON.stringify(product)
                      );
                      router.push(`/admin/edit-product/${product.trackingId}`);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-150"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-200 px-4 py-3 text-center">
                  <button
                    onClick={async () => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this product?"
                      );
                      if (!confirmDelete) return;

                      try {
                        await removeProduct(product.trackingId);
                        setProducts((prev) =>
                          prev.filter(
                            (p) => p.trackingId !== product.trackingId
                          )
                        );
                        alert("Product deleted successfully");
                      } catch (error) {
                        console.error("Error deleting product:", error);
                        alert("Failed to delete product");
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 rounded-full">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full border border-transparent ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
