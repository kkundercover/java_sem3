import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import BotanicalDecorations from './components/BotanicalDecorations';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Top Security Banner Ribbon from Inspiration Photo */}
          <div className="security-banner">
            <ShieldCheck size={16} />
            <span>Donation Management System • Verified Security Layer</span>
          </div>

          {/* Hand-drawn Botanical Illustrations framing the layout */}
          <BotanicalDecorations />

          <Navbar />

          <main style={{ flex: 1, zIndex: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donor" element={<DonorDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer style={{
            borderTop: '1px solid rgba(24, 40, 29, 0.1)',
            background: '#F7F5EE',
            padding: '24px 20px',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            zIndex: 10
          }}>
            <div style={{
              maxWidth: '1540px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={16} color="var(--primary)" fill="var(--primary)" />
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>KindFund</span>
                <span>— Full Stack Java Mini Project (25SE3VSEC01)</span>
              </div>
              <p>
                Spring Boot 3.5.16 • Java 25 • React 18 • MySQL / JPA • Multithreaded Receipt Worker
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
