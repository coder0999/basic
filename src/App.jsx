import React, { useState } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Exams from './pages/Exams';
import Evaluations from './pages/Evaluations';
import Store from './pages/Store';
import Profile from './pages/Profile';
import ExamView from './pages/ExamView';
import ResultsPage from './pages/ResultsPage';
import LeaderboardPage from './pages/LeaderboardPage';

const Layout = () => {
  const location = useLocation();
  const showTopBar = ['/', '/store', '/profile', '/evaluations', '/leaderboard'].includes(location.pathname);
  const mainContentMargin = 'md:mr-20';
  const isSpecialPage = location.pathname === '/profile' || location.pathname === '/leaderboard';

  const mainClasses = `${mainContentMargin} ${isSpecialPage ? 'mb-0' : 'p-4 mt-16 mb-16 md:mb-0'}`;

  return (
    <div className={`min-h-screen ${isSpecialPage ? 'bg-white' : 'bg-gray-100'}`}>
      {showTopBar && <TopBar />}
      <Navbar isCollapsed={false} />
      <main className={mainClasses}>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Exams />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="store" element={<Store />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>
        <Route path="exam/:examId" element={<ExamView />} />
        <Route path="results/:examId" element={<ResultsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;