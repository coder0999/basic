import React from 'react';
import { motion } from 'framer-motion';
import useLeaderboard from '../hooks/useLeaderboard';
import useAuth from '../hooks/useAuth';

const Leaderboard = () => {
  const { leaderboard, loading: leaderboardLoading, percentage } = useLeaderboard();
  const { user, loading: authLoading } = useAuth();

  if (leaderboardLoading || authLoading) {
    return (
      <div className="bg-white p-8 rounded-t-2xl">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">قائمة المتصدرين</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-t-2xl pb-24">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">قائمة المتصدرين</h2>
        
        {user && (
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">نسبة التصدر</p>
            <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        )}

        <motion.div id="leaderboard-list" className="space-y-4">
          {leaderboard.map((userEntry, index) => (
            <motion.div key={userEntry.uid} className={`flex items-center justify-between p-3 rounded-lg transition-all ${user && user.uid === userEntry.uid ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50'}`}>
              <div className="flex items-center">
                <div className="leaderboard-rank-box">{index + 1}</div>
                <span className="font-semibold text-gray-800 mr-3">{userEntry.name || 'مستخدم غير معروف'}</span>
              </div>
              <span className="font-bold text-blue-600">{userEntry.points || 0} نقطة</span>
            </motion.div>
          ))}
        </motion.div>
    </div>
  );
};

export default Leaderboard;
