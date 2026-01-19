import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useLeaderboard = (examId) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!examId) {
      setLeaderboard([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
    }, 500); // Only show loader if loading takes more than 500ms

    const submissionsRef = collection(db, "exam_results", examId, "submissions");
    const q = query(submissionsRef, orderBy("percentage", "desc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      clearTimeout(timer); // Clear timer if data loads quickly
      const submissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const leaderboardData = await Promise.all(
        submissions.map(async (submission) => {
          const userRef = doc(db, "users", submission.userId);
          const userSnap = await getDoc(userRef);
          const userName = userSnap.exists() ? userSnap.data().name : 'مستخدم غير معروف';
          return {
            ...submission,
            name: userName,
          };
        })
      );

      setLeaderboard(leaderboardData);
      setLoading(false);
    }, (error) => {
      clearTimeout(timer); // Also clear on error
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [examId]);

  return { leaderboard, loading };
};

export default useLeaderboard;