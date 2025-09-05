import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const appId = 'tanya-thanawey'; // This should probably be an environment variable

  useEffect(() => {
    const subjectsCollectionRef = collection(db, `artifacts/${appId}/public/data/subjects`);
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
