import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from './useAuth';

const useUserPoints = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setPoints(doc.data().points || 0);
        } else {
          setPoints(0);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching user points:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setPoints(0);
      setLoading(false);
    }
  }, [user]);

  return { points, loading };
};

export default useUserPoints;
