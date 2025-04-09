import { updateProduct } from '@/api/productCurd';
import FlashMessage from '@/components/common/FlashMessage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './productEdit.module.scss';


interface Product {
  _id: string;
  trackingId: string;
  status: string;
  productName:string,
  currentLocation: string;
  estimatedDelivery: string;
  history: {
    location: string;
    time: string;
    _id: string;
  }[];
}

export default function EditProductPage() {
  const router = useRouter();
  const {
    id,
    trackingId,
    productName,
    status,
    currentLocation,
    estimatedDelivery,
  } = router.query;

  const [form, setForm] = useState<Product | null>(null);
  const [flashMessage, setFlashMessage] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

//   useEffect(() => {
//     if (id && trackingId) {
//       setForm({
//         _id: id as string,
//         trackingId: trackingId as string,
//         productName: productName as string,
//         status: status as string,
//         currentLocation: currentLocation as string,
//         estimatedDelivery: estimatedDelivery as string,
//         history: [],
//       });
//     }
//   }, [id, trackingId]);

useEffect(() => {
    if (!router.isReady) return;
  
    const {
      id,
      trackingId,
      productName,
      status,
      currentLocation,
      estimatedDelivery,
    } = router.query;
  
    console.log('Router ready:', router.isReady);
    console.log('Query params after ready:', router.query);
  
    if (
      typeof id === 'string' &&
      typeof trackingId === 'string' &&
      typeof productName === 'string' &&
      typeof status === 'string' &&
      typeof currentLocation === 'string' &&
      typeof estimatedDelivery === 'string'
    ) {
      setForm({
        _id: id,
        trackingId,
        productName,
        status,
        currentLocation,
        estimatedDelivery,
        history: [],
      });
    }
  }, [router.isReady, router.query]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!id || typeof id !== 'string') {
      setFlashMessage({ type: 'error', message: 'Invalid product ID' });
      return;
    }
    try {
      await updateProduct(id, form);
      setFlashMessage({ type: 'success', message: 'Product updated successfully!' });
    } catch (err) {
      console.error(err);
      setFlashMessage({ type: 'error', message: 'Failed to update product.' });
    }
  };

  const handleContinue = () => {
    router.push('/admin/dashboard');
  };

  if (!form) {debugger;return <div className="p-10">Loading product...</div>};

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
    <h2 className={styles.heading}>Product Detail</h2>
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
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
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
          <label htmlFor="estimatedDelivery">Estimated Delivery</label>
          <input
            type="text"
            id="estimatedDelivery"
            name="estimatedDelivery"
            value={form.estimatedDelivery}
            onChange={handleChange}
          />
        </div>
      </section>

      <div className={styles.sendContainer}>
        <input type="submit" value="Save Changes" 
        onClick={handleSave}
         />
      </div>
    </div>
  </div>
      )}
    </div>
  );
}
