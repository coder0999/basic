import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const subjectsCollectionRef = collection(db, 'subjects');
    const unsubscribe = onSnapshot(subjectsCollectionRef, (snapshot) => {
      const subjectsData = snapshot.docs.map(doc => doc.data());
      setSubjects(subjectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching subjects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { subjects, loading };
};

export default useSubjects;
