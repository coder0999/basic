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
import PurchaseOrders from './pages/PurchaseOrders';
import { AuthProvider } from './context/AuthContext.jsx';
import useAuth from './hooks/useAuth';

const Layout = () => {
  const location = useLocation();
  const showTopBar = ['/', '/store', '/profile', '/evaluations', '/leaderboard'].includes(location.pathname);
  const mainContentMargin = 'md:mr-20';
  const isSpecialPage = location.pathname === '/profile' || location.pathname === '/leaderboard';

  const mainClasses = `${mainContentMargin} ${isSpecialPage ? 'mb-0' : 'p-4 mt-16 mb-16 md:mb-0'}`;

  return (
    <TopBarProvider>
      <div className={`min-h-screen ${isSpecialPage ? 'bg-white' : 'bg-gray-100'}`}>
        {showTopBar && <TopBar />}
        <Navbar isCollapsed={false} />
        <main className={mainClasses}>
          <Outlet />
        </main>
      </div>
    </TopBarProvider>
  );
};

import { TopBarProvider } from './context/TopBarContext';

const TopBarOnlyLayout = ({ backButtonLink }) => {
  return (
    <TopBarProvider>
      <div className="min-h-screen bg-gray-100">
        <TopBar showBackButton={true} backButtonLink={backButtonLink} />
        <main className="p-4 mt-16">
          <Outlet />
        </main>
      </div>
    </TopBarProvider>
  );
};

import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const { initialAuthChecked } = useAuth();

  if (!initialAuthChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Exams />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="store" element={<Store />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>
        <Route element={<TopBarOnlyLayout backButtonLink="/profile" />}>
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
        </Route>
        <Route path="exam/:examId" element={<ExamView />} />
        <Route path="results/:examId" element={<ResultsPage />} />
      </Routes>
    </HashRouter>
  );
}

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
