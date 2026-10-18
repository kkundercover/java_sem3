import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * MODULE 3.1 & 5.2: Semantic Navbar Component
 * 
 * Demonstrates:
 * 1. Semantic HTML5 tags (<header>, <nav>, <ul>, <li>).
 * 2. Props: Receives 'currentUser' and 'onLogout' from parent App.jsx.
 * 3. Conditional Rendering: Renders admin/donor links and login/logout dynamically.
 */
function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar">
        {/* Brand Link */}
        <Link to="/" className="navbar-brand">
          <span>🤝</span> Donation Management
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/">Campaigns</Link>
          </li>

          {/* Conditional links based on whether user is logged in */}
          {currentUser ? (
            <>
              {currentUser.role === 'ADMIN' && (
                <li>
                  <Link to="/admin">Admin Dashboard</Link>
                </li>
              )}

              {currentUser.role === 'DONOR' && (
                <li>
                  <Link to="/donor">My Donations</Link>
                </li>
              )}

              <li>
                <span className="user-badge">
                  {currentUser.name} ({currentUser.role})
                </span>
              </li>

              <li>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
