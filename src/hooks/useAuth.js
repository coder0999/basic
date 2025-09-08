import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const SUPER_ADMIN_UID = 'dKDZuuhTk0MccXsgAUK42i5XPJJ2';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, check for their document in Firestore
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // New user, create their document
          const isSuperAdmin = user.uid === SUPER_ADMIN_UID;
          const defaultPermissions = {
            canAccessSite: true,
            canViewDashboard: isSuperAdmin,
            canEditProducts: isSuperAdmin,
            canManageUsers: isSuperAdmin,
            canViewOrders: isSuperAdmin,
          };

          try {
            await setDoc(userRef, {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              permissions: defaultPermissions,
              points: 0, // Also initialize points for the basic app
              createdAt: new Date()
            });
          } catch (error) {
            console.error("Error creating user document:", error);
          }
        }
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;