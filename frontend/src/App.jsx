import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CampaignList from './components/CampaignList.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';

/**
 * MODULE 5.2: React SPA Root Component
 * 
 * Demonstrates:
 * 1. Root state management: 'currentUser' stored in useState and synchronized with sessionStorage.
 * 2. React Router v6: Declarative client-side routing with <Routes> and <Route>.
 * 3. Props Passing: Distributing state and handler functions downwards to children components.
 */
function App() {
  // Initialize currentUser from sessionStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('donation_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Synchronize state with sessionStorage
  const handleLogin = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem('donation_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('donation_user');
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      {/* Main Content Area (Semantic HTML5 <main>) */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<CampaignList currentUser={currentUser} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor" element={<DonorDashboard currentUser={currentUser} />} />
          <Route path="/admin" element={<AdminDashboard currentUser={currentUser} />} />
        </Routes>
      </main>

      {/* Semantic HTML5 <footer> */}
      <footer>
        <p>
          &copy; 2026 Donation Management System | Built strictly for <strong>25SE3VSEC01 Full Stack Java Programming</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
