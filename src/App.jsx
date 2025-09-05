import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Exams from './pages/Exams';
import Evaluations from './pages/Evaluations';
import Store from './pages/Store';
import Profile from './pages/Profile';
import ExamView from './pages/ExamView';
import ResultsPage from './pages/ResultsPage';

const Layout = () => {
  return (
    <div className="md:flex md:flex-row-reverse min-h-screen">
      <Navbar />
      <main className="flex-grow p-2 md:mb-0 mb-20 md:mr-48">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter basename="/basic/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Exams />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="store" element={<Store />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/exam/:examId" element={<ExamView />} />
        <Route path="/results/:examId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
