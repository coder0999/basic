import React from 'react';
import ScoreCounter from './ScoreCounter';
import { NavLink, useLocation } from 'react-router-dom';

const TopBar = () => {
  const location = useLocation();
  const isExamsPage = location.pathname === '/';

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4 flex justify-between items-center md:mr-20">
      <ScoreCounter />
      {isExamsPage && (
        <NavLink to="/leaderboard" className="flex flex-col items-center text-gray-500 hover:text-blue-600 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
          <span className="text-xs">المتصدرين</span>
        </NavLink>
      )}
    </div>
  );
};

export default TopBar;
