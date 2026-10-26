import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, LayoutDashboard, History, LogIn, LogOut, UserPlus, ShieldAlert, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: '16px',
      margin: '0 auto 28px',
      maxWidth: '1540px',
      width: 'calc(100% - 32px)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      zIndex: 50,
      background: '#FCFAF6',
      borderRadius: 'var(--radius-full)',
      border: '1px solid rgba(24, 40, 29, 0.1)',
      boxShadow: '0 4px 20px rgba(24, 40, 29, 0.06)'
    }}>
      {/* Brand Logo - Distinctive Mark Inspired by Image */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(30, 53, 36, 0.25)'
        }}>
          <Heart size={18} color="#D8B775" fill="#D8B775" />
        </div>
        <div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--primary)',
            letterSpacing: '-0.03em',
            display: 'block',
            lineHeight: '1.1'
          }}>
            KindFund
          </span>
          <span style={{
            display: 'block',
            fontSize: '0.62rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Donation Platform
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Link to="/" className="filter-chip" style={{ textDecoration: 'none' }}>
          Explore Causes
        </Link>

        {isAuthenticated && !isAdmin && (
          <Link to="/donor" className="filter-chip" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <History size={14} />
            My Giving Portal
          </Link>
        )}

        {isAuthenticated && isAdmin && (
          <Link to="/admin" className="filter-chip" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <LayoutDashboard size={14} />
            Admin Console
          </Link>
        )}
      </div>

      {/* User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--pill-bg)',
              border: '1px solid var(--pill-border)'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</span>
              <span className={`badge ${isAdmin ? 'badge-completed' : 'badge-active'}`}>
                {user.role}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-danger btn-sm" title="Log out">
              <LogOut size={14} />
              Exit
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">
              <LogIn size={15} />
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              <UserPlus size={15} />
              Join
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
