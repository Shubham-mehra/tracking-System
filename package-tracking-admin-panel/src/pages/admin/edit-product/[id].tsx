import { updateProduct } from "@/api/productCurd";
import FlashMessage from "@/components/common/FlashMessage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./productEdit.module.scss";
import formatReadableDate from "@/utils/dateTimeFormatter";
import HistoryTimeline from "@/components/myhistory/HistoryTimeline";

interface Product {
  _id: string;
  trackingId: string;
  status: string;
  productName: string;
  currentLocation: string;
  estimatedDelivery: string;
  orderDate: any;
  history: {
    location: string;
    time: string;
    status: string;
    _id: string;
  }[];
}

export default function EditProductPage() {
  const router = useRouter();
  const { trackingId } = router.query;

  const [form, setForm] = useState<Product | null>(null);
  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const localData = localStorage.getItem("editProductData");
    if (localData) {
      const parsed: Product = JSON.parse(localData);
      setForm(parsed);
    } else {
      setFlashMessage({
        type: "error",
        message: "No product data found. Please go back and try again.",
      });
    }
  }, [router.isReady]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    debugger;
    if (!form || !form._id) {
      setFlashMessage({ type: "error", message: "Invalid product data" });
      return;
    }

    try {
      await updateProduct(form.trackingId, form);
      localStorage.removeItem("editProductData");
      setFlashMessage({
        type: "success",
        message: "Product updated successfully!",
      });
    } catch (err) {
      console.error(err);
      setFlashMessage({ type: "error", message: "Failed to update product." });
    }
  };

  const handleContinue = () => {
    localStorage.removeItem("editProductData");
    router.push("/admin/dashboard");
  };

  if (!form) {
    return <div className="p-10">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {flashMessage ? (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onClose={() => setFlashMessage(null)}
          onContinue={handleContinue}
        />
      ) : (
        <div className={styles.wrapper}>
          <h4 className={styles.heading}>Edit Product: {form.productName}</h4>
          <div className={styles.form}>
            <section className={`${styles.section} ${styles.left}`}>
              <div className={styles.inputContainer}>
                <label htmlFor="trackingId">Tracking ID</label>
                <input
                  type="text"
                  id="trackingId"
                  name="trackingId"
                  value={form.trackingId}
                  disabled
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="productName">Product</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
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
            </section>

            <section className={`${styles.section} ${styles.right}`}>
              <div className={styles.inputContainer}>
                <label htmlFor="currentLocation">Current Location</label>
                <input
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  value={form.currentLocation}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="orderDate">Order Date</label>
                <input
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  value={form.orderDate}
                  disabled
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="estimatedDelivery">Estimated Delivery</label>
                <input
                  type="date"
                  id="estimatedDelivery"
                  name="estimatedDelivery"
                  min={form.orderDate}
                  value={form.estimatedDelivery}
                  onChange={handleChange}
                />
              </div>
            </section>
            <div className={styles.sendContainer}>

            <input type="submit" value="Cancel"  className="px-1" onClick={() => router.push("/admin/dashboard")} />
  <input type="submit" value="Save Changes" onClick={handleSave} />

  
</div>


           
          </div>

          {/* ✅ History Table */}
          {form.history && form.history.length > 0 && (
            <div className="container mx-auto px-4 sm:px-8 mt-10">
              <div className="py-4">
                <div>
                  <h3 className="text-2xl font-semibold leading-tight mb-4">
                    Tracking History
                  </h3>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.history.map((item, index) => (
                          <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {formatReadableDate(item.time)}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item.location}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">{item.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <HistoryTimeline/>
        </div>
      )}
    </div>
  );
}
