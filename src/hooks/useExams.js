import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const useExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const examsCollection = collection(db, 'exams');
    const q = query(examsCollection, orderBy('createdAt', 'desc')); // Assuming exams have a createdAt field

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const examsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExams(examsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching exams:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { exams, loading };
};

export default useExams;
