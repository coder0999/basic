import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useLeaderboard = (examId) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) {
      setLeaderboard([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const submissionsRef = collection(db, "exam_results", examId, "submissions");
    const q = query(submissionsRef, orderBy("percentage", "desc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
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
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [examId]);

  return { leaderboard, loading };
};

export default useLeaderboard;