import React from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

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
      <div className="container mx-auto p-4 flex-grow mt-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-right">الملف الشخصي</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-white">
      <div style={{backgroundColor: 'rgb(46, 144, 244)', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}} className="pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
        <div className="px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 text-right">بروفايل</h1>
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center ml-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-right">{user.displayName}</h2>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 break-all text-right">{user.uid} :ID</p>
                </div>
              </div>
              <button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-lg transition-colors duration-300 text-sm sm:text-base">تسجيل الخروج</button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">انضم إلينا</h2>
                  <p className="text-gray-600 mb-6">سجل دخولك للمشاركة في الامتحانات وتتبع تقدمك.</p>
                  <button onClick={handleSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
                      <i className="fab fa-google mr-3"></i> تسجيل الدخول باستخدام جوجل
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
