import React, { useState, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import { AuthProvider } from './context/AuthContext.jsx';
import useAuth from './hooks/useAuth';
import { TopBarProvider } from './context/TopBarContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

// Lazy load page components
const Exams = lazy(() => import('./pages/Exams'));
const Evaluations = lazy(() => import('./pages/Evaluations'));
const Store = lazy(() => import('./pages/Store'));
const Profile = lazy(() => import('./pages/Profile'));
const ExamView = lazy(() => import('./pages/ExamView'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const PurchaseOrders = lazy(() => import('./pages/PurchaseOrders'));


const Layout = () => {
  const location = useLocation();
  const showTopBar = ['/', '/store', '/profile', '/evaluations'].includes(location.pathname);
  const mainContentMargin = 'md:mr-20';
  const isSpecialPage = location.pathname === '/profile';

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

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="spinner"></div>
  </div>
);

const AppContent = () => {
  const { initialAuthChecked } = useAuth();

  if (!initialAuthChecked) {
    return <LoadingFallback />;
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Exams />} />
            <Route path="evaluations" element={<Evaluations />} />
            <Route path="store" element={<Store />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<TopBarOnlyLayout backButtonLink="/profile" />}>
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
          </Route>
          <Route path="exam/:examId" element={<ExamView />} />
          <Route path="results/:examId" element={<ResultsPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

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
