import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, Loader2, Sparkles, User, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side JavaScript validation (Lab 9)
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.auth.login({ email, password });
      login(res);

      if (res.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/donor');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify your email & password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDonorCredentials = () => {
    setEmail('john@example.com');
    setPassword('donor123');
    setErrorMessage('');
  };

  const fillAdminCredentials = () => {
    setEmail('admin@donation.org');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto 80px', padding: '0 20px' }}>
      <div className="glass-card" style={{
        padding: '36px 32px',
        borderRadius: '24px',
        background: '#FFFFFF',
        boxShadow: '0 10px 30px rgba(24, 40, 29, 0.08)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D8B775 0%, #C49E54 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(216, 183, 117, 0.4)'
          }}>
            <LogIn size={24} color="#1E3524" />
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            Sign In to KindFund
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Access your giving history or manage global campaigns
          </p>
        </div>

        {/* Demo Fast-Fill Bar */}
        <div style={{
          background: '#F9F7F1',
          border: '1px solid #EAE3D2',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          marginBottom: '22px'
        }}>
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            ⚡ 1-Click Demo Logins
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={fillDonorCredentials}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', background: '#FFFFFF' }}
            >
              <User size={13} color="var(--primary)" /> Donor Account
            </button>
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', background: '#FFFFFF' }}
            >
              <Shield size={13} color="var(--accent-gold-dark)" /> Admin Account
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)'
              }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)'
              }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '13px', fontSize: '1rem', marginBottom: '20px' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Verifying Credentials...
              </>
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Register as a Donor
          </Link>
        </p>
      </div>
    </div>
  );
}
