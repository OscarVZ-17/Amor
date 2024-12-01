import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { PoemsPage } from './pages/PoemsPage';
import { DiaryPage } from './pages/DiaryPage';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/poems" element={<PoemsPage />} />
          <Route path="/diary" element={<DiaryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;