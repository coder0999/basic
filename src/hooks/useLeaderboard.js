import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from './useAuth';

const useLeaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, orderBy("points", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers = snapshot.docs.map(doc => doc.data());
      
      setLeaderboard(allUsers.slice(0, 10));
      setTotalUsers(allUsers.length);

      if (user) {
        const currentUserRank = allUsers.findIndex(u => u.uid === user.uid) + 1;
        setUserRank(currentUserRank);

        if (currentUserRank > 0) {
          if (allUsers.length <= 1) {
            setPercentage(100);
          } else {
            const calculatedPercentage = Math.round(((allUsers.length - currentUserRank) / (allUsers.length - 1)) * 100);
            setPercentage(calculatedPercentage);
          }
        } else {
          setPercentage(0);
        }
      } else {
        setUserRank(null);
        setPercentage(0);
      }

      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { leaderboard, loading, userRank, totalUsers, percentage };
};

export default useLeaderboard;
