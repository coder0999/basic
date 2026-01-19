import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500); // Only show loader if loading takes more than 500ms

    const subjectsCollectionRef = collection(db, 'subjects');
    const unsubscribe = onSnapshot(subjectsCollectionRef, (snapshot) => {
      clearTimeout(timer); // Clear timer if data loads quickly
      const subjectsData = snapshot.docs.map(doc => doc.data());
      setSubjects(subjectsData);
      setLoading(false);
    }, (error) => {
      clearTimeout(timer); // Also clear on error
      console.error("Error fetching subjects:", error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return { subjects, loading };
};

export default useSubjects;
