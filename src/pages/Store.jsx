import React from 'react';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import useUserPoints from '../hooks/useUserPoints';

const Store = () => {
  const { user } = useAuth();
  const { points, loading } = useUserPoints();

  const handleAddPoints = () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, { points: increment(10) }, { merge: true })
        .catch(e => {
          console.error("Error adding points: ", e);
          // You might want to show an alert to the user here
        });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex-grow">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex-grow">
      <div className="fixed top-4 right-4 md:right-52 bg-blue-500 text-white p-6 rounded-full shadow-lg flex items-center">
        <span className="text-4xl font-bold">{points}</span>
        <span className="mr-2">نقاط</span>
      </div>
      <div className="mt-40 text-center">
        {user && (
          <button onClick={handleAddPoints} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg">إضافة 10 نقاط (تجريبي)</button>
        )}
      </div>
    </div>
  );
};

export default Store;