import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * MODULE 3.1, 3.2 & 5.2: Registration Component
 * 
 * Demonstrates:
 * 1. HTML5 Form controls (name, email, password, select dropdown).
 * 2. Client-side input validations (name length, email regex, password minimum length).
 * 3. React useState for two-way data binding.
 * 4. Communicates with Spring Boot API /api/auth/register.
 */
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DONOR');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Client-Side Input Validation (Module 3.2)
  const validate = () => {
    if (!name.trim() || name.trim().length < 3) {
      setErrorMessage('Full name must be at least 3 characters long.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role })
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Registration failed.');
        }
        return res.json();
      })
      .then(() => {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
          Create an Account
        </h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="regName">Full Name:</label>
            <input
              id="regName"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Ananya Deshmukh"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regEmail">Email Address:</label>
            <input
              id="regEmail"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., ananya@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regPassword">Password:</label>
            <input
              id="regPassword"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 4 characters"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regRole">Role:</label>
            <select
              id="regRole"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="DONOR">DONOR (Standard User)</option>
              <option value="ADMIN">ADMIN (Campaign Creator / Manager)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-success" 
            style={{ width: '100%', padding: '0.9rem', fontSize: '1.2rem', marginTop: '0.5rem' }} 
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1.05rem' }}>
          Already registered? <Link to="/login" style={{ fontWeight: 'bold' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
