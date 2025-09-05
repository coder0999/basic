import React from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import Leaderboard from '../components/Leaderboard';

const Profile = () => {
  const { user, loading } = useAuth();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, { 
            name: user.displayName,
            uid: user.uid
        }, { merge: true });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        // You might want to show an alert to the user here
      });
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign-Out Error:", error);
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex-grow text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 my-8">الملف الشخصي</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex-grow text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 my-8">الملف الشخصي</h1>
      {user ? (
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg md:text-xl"><strong>الاسم:</strong> <span>{user.displayName}</span></p>
            <p className="text-lg md:text-xl mt-2"><strong>الرمز التعريفي:</strong> <span>{user.uid}</span></p>
            <button onClick={handleSignOut} className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded-lg">تسجيل الخروج</button>
          </div>
          <Leaderboard />
        </div>
      ) : (
        <button onClick={handleSignIn} className="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md">
          <i className="fab fa-google mr-2"></i> تسجيل الدخول باستخدام جوجل
        </button>
      )}
    </div>
  );
};

export default Profile;