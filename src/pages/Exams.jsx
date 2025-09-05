import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const appId = 'tanya-thanawey'; // This should probably be an environment variable

  useEffect(() => {
    const examsCollection = collection(db, `artifacts/${appId}/public/data/exams`);
    const unsubscribe = onSnapshot(examsCollection, (snapshot) => {
      const examsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExams(examsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching exams:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="space-y-3">
        <div className="skeleton-line w-3/4 mx-auto"></div>
        <div className="skeleton-line w-1/2 mx-auto"></div>
      </div>
    </div>
  );

  const ExamCard = ({ exam }) => {
    const totalPoints = exam.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    return (
      <Link to={`/exam/${exam.id}`} className="bg-white p-6 md:p-8 rounded-xl shadow-lg cursor-pointer flex flex-col justify-between no-underline">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{exam.name || `امتحان ${exam.id}`}</h3>
          <p className="text-center text-gray-500 mt-4 text-base md:text-lg">{exam.questions.length} أسئلة</p>
          <p className="text-center text-blue-600 font-bold mt-2 text-base md:text-lg">إجمالي النقاط: {totalPoints}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 my-8">الامتحانات المتاحة</h1>
      <div id="exams-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : exams.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">لا توجد امتحانات متاحة حالياً.</p>
        ) : (
          exams.map(exam => <ExamCard key={exam.id} exam={exam} />)
        )}
      </div>
    </div>
  );
};

export default Exams;
