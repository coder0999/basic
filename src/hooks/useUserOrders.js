import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
    }, 500); // Only show loader if loading takes more than 500ms

    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      clearTimeout(timer); // Clear timer if data loads quickly
      const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);
      setLoading(false);
    }, (err) => {
      clearTimeout(timer); // Also clear on error
      setError(err);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [userId]);

  return { orders, loading, error };
};

export default useUserOrders;
