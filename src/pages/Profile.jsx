import React from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import ProfileButton from '../components/ProfileButton';

const Profile = () => {
  const { user } = useAuth();

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
    setTimeout(() => {
      signOut(auth).catch((error) => {
        console.error("Sign-Out Error:", error);
      });
    }, 100);
  };

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
      {user && (
        <div className="p-4">
          <ProfileButton 
            path="/purchase-orders"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>}
            text="طلبات الشراء"
          />
          <ProfileButton 
            path="/about-us"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>}
            text="من نحن"
          />
          <ProfileButton 
            path="/contact-us"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-1.136.085-2.246-.584-2.756-1.653l-.986-1.972c-.273-.546-.886-.92-1.53-.92s-1.257.374-1.53.92l-.986 1.972c-.51 1.07-.1.72-1.653 2.756l.28 3.722c.093 1.133-.957 1.98-2.193 1.98h-4.286c-.97 0-1.813-.616-2.097-1.5l-1.972-.986c-1.07-.51-1.653-1.62-1.653-2.756v-3.722c0-1.136.584-2.246 1.653-2.756l1.972-.986c.546-.273.92-.886.92-1.53s-.374-1.257-.92-1.53l-1.972-.986c-1.07-.51-1.653-1.62-1.653-2.756V8.683c0-1.136.847-2.1 1.98-2.193l3.722-.28c1.136-.085 2.246.584 2.756 1.653l.986 1.972c.273.546.886.92 1.53.92s1.257-.374 1.53-.92l.986-1.972c.51-1.07 1.62-1.653 2.756-1.653h3.722c1.136 0 2.1.847 2.193 1.98l.28 3.722c.093 1.133.616 1.813 1.5 2.097Z" />
                  </svg>}
            text="اتصل بنا"
          />
          <ProfileButton 
            path="/privacy-policy"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                  </svg>}
            text="سياسة الخصوصية"
          />
          <ProfileButton
            onClick={handleSignOut}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>}
            text="تسجيل الخروج"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
