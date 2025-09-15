import React, { useState, useEffect } from 'react';
import Leaderboard from '../components/Leaderboard';
import useLeaderboard from '../hooks/useLeaderboard';
import useExams from '../hooks/useExams';

const LeaderboardPage = () => {
  const { exams, loading: examsLoading } = useExams();
  const [selectedExamId, setSelectedExamId] = useState(null);

  useEffect(() => {
    if (exams.length > 0) {
      setSelectedExamId(exams[0].id); // Default to the latest exam
    }
  }, [exams]);

  const { leaderboard, loading: leaderboardLoading } = useLeaderboard(selectedExamId);

  const topThree = leaderboard.slice(0, 3);

  const handleExamChange = (e) => {
    setSelectedExamId(e.target.value);
  };

  const loading = examsLoading || leaderboardLoading;

  return (
    <div className="flex-grow bg-white">
      <div style={{backgroundImage: "url('/basic/blu545.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}} className="pt-24 pb-16">
        <div className="px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 text-right">قائمة المتصدرين</h1>
            <select onChange={handleExamChange} value={selectedExamId || ''} className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-around items-end">
            {/* Second Place */}
            {topThree.length > 1 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-silver">
                  <h2 className="text-xl font-bold">2</h2>
                </div>
                <h3 className="text-lg font-semibold mt-2">{topThree[1].name}</h3>
                <p className="text-gray-600">{topThree[1].percentage}%</p>
              </div>
            )}
            {/* First Place */}
            {topThree.length > 0 && (
              <div className="text-center mx-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-gold">
                  <h2 className="text-2xl font-bold">1</h2>
                </div>
                <h3 className="text-xl font-bold mt-2">{topThree[0].name}</h3>
                <p className="text-gray-700">{topThree[0].percentage}%</p>
              </div>
            )}
            {/* Third Place */}
            {topThree.length > 2 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-bronze">
                  <h2 className="text-xl font-bold">3</h2>
                </div>
                <h3 className="text-lg font-semibold mt-2">{topThree[2].name}</h3>
                <p className="text-gray-600">{topThree[2].percentage}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative -mt-8">
        {loading ? <div className="spinner"></div> : <Leaderboard leaderboard={leaderboard} />}
      </div>
    </div>
  );
};

export default LeaderboardPage;