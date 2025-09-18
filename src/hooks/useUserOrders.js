import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, loading, error };
};

export default useUserOrders;
