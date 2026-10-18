import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * MODULE 3.1, 3.2 & 5.2: Login Component
 * 
 * Demonstrates:
 * 1. HTML5 Form controls (<input>, <label>, <button>).
 * 2. Client-side JS validation (valid email format, non-empty password).
 * 3. React useState for controlled inputs.
 * 4. React Router navigation (useNavigate).
 */
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Client-Side Validation (Module 3.2)
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password || password.trim().length === 0) {
      setErrorMessage('Password cannot be empty.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    // Call Spring Boot Auth REST API
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Invalid credentials');
        }
        return res.json();
      })
      .then((user) => {
        onLoginSuccess(user);
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/donor');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Quick helper to fill test credentials for viva demo
  const fillCredentials = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
          Account Login
        </h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email Address:</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Password:</label>
            <input
              id="loginPassword"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.9rem', fontSize: '1.2rem', marginTop: '0.5rem' }} 
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1.05rem' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: 'bold' }}>Register here</Link>
        </p>

        {/* Demo Credentials Quick-Fill helper box for examination/viva */}
        <div style={{ marginTop: '2rem', padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.95rem', border: '1px solid #cbd5e1' }}>
          <strong>💡 Viva Demo Quick Login:</strong>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, padding: '0.6rem 0.8rem' }}
              onClick={() => fillCredentials('admin@charity.org', 'admin123')}
            >
              Fill Admin Credentials
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, padding: '0.6rem 0.8rem' }}
              onClick={() => fillCredentials('rahul@gmail.com', 'donor123')}
            >
              Fill Donor Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
