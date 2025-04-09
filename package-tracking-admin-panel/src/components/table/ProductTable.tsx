// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useState } from "react";

// interface Header {
//   key: string;
//   label: string;
// }

// interface Product {
//   [key: string]: any;
//   _id: string;
// }

// interface ProductsTableProps {
//   headers: Header[];
//   data: Product[];
// }

// export default function ProductsTable({ headers, data }: ProductsTableProps) {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter products by product name (case-insensitive)
//   const filteredData = data.filter((product) =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-4 flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search by product name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border border-gray-300 px-3 py-1 rounded w-64"
//         />
//         <button
//           onClick={() => setSearchTerm("")}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//         >
//           Clear
//         </button>
//       </div>

//       <table className="min-w-full border border-gray-300 text-[14px]">
//         <thead className="bg-white">
//           <tr>
//             {headers.map((header, i) => (
//               <th key={i} className="border px-4 py-2 text-center">
//                 {header.label}
//               </th>
//             ))}
//             <th className="border px-4 py-2 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length === 0 ? (
//             <tr>
//               <td colSpan={headers.length + 1} className="text-center py-4">
//                 No products found.
//               </td>
//             </tr>
//           ) : (
//             filteredData.map((product) => (
//               <tr key={product._id} className="text-center">
//                 {headers.map((header) => (
//                   <td key={header.key} className="border px-4 py-2">
//                     {header.key === "lastUpdated"
//                       ? new Date(product.history?.at(-1)?.time).toLocaleString()
//                       : product[header.key]}
//                   </td>
//                 ))}
//                 <td className="border px-4 py-2">
//                   <Link
//                     href={{
//                       pathname: `/admin/edit-product/${product.trackingId}`,
//                       query: {
//                         trackingId: product.trackingId,
//                         status: product.status,
//                         productName: product.productName,
//                         currentLocation: product.currentLocation,
//                         estimatedDelivery: product.estimatedDelivery,
//                       },
//                     }}
//                   >
//                     <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                       Edit
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { createNewProduct } from "@/api/productCurd";

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
}

export default function ProductsTable({ headers, data }: ProductsTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    trackingId: "",
    status: "",
    currentLocation: "",
    estimatedDelivery: "",
  });

  const filteredData = data.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can send `newProduct` to your backend here
    console.log("New Product Submitted:", newProduct);
    createNewProduct(newProduct);
    setShowForm(false);
    setNewProduct({
      productName: "",
      trackingId: "",
      status: "",
      currentLocation: "",
      estimatedDelivery: "",
    });
    alert("Product created! (Simulated)");
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
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "New Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 border p-4 rounded bg-gray-50"
        >
          <h2 className="text-lg font-semibold mb-3">Add New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
              required
            />

            <select
              name="status"
              value={newProduct.status}
              onChange={handleStatusChange}
              className="border px-3 py-2 rounded"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>

            <input
              type="text"
              name="currentLocation"
              placeholder="Current Location"
              value={newProduct.currentLocation}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="date"
              name="estimatedDelivery"
              placeholder="Estimated Delivery"
              value={newProduct.estimatedDelivery}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}

      <table className="min-w-full border border-gray-300 text-[14px]">
        <thead className="bg-white">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="border px-4 py-2 text-center">
                {header.label}
              </th>
            ))}
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} className="text-center py-4">
                No products found.
              </td>
            </tr>
          ) : (
            filteredData.map((product) => (
              <tr key={product._id} className="text-center">
                {headers.map((header) => (
                  <td key={header.key} className="border px-4 py-2">
                    {header.key === "lastUpdated"
                      ? new Date(product.history?.at(-1)?.time).toLocaleString()
                      : product[header.key]}
                  </td>
                ))}
                <td className="border px-4 py-2">
                  <Link
                    href={{
                      pathname: `/admin/edit-product/${product.trackingId}`,
                      query: {
                        trackingId: product.trackingId,
                        status: product.status,
                        productName: product.productName,
                        currentLocation: product.currentLocation,
                        estimatedDelivery: product.estimatedDelivery,
                      },
                    }}
                  >
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
