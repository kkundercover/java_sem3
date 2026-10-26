import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import ReceiptModal from '../components/ReceiptModal';
import { Heart, DollarSign, Award, Calendar, FileText, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const fetchDonorHistory = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await api.donations.getByDonor(user.id);
      setDonations(data || []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch donor history:', err);
      setError('Unable to load donation transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonorHistory();
  }, [user]);

  const totalDonated = donations.reduce((acc, d) => acc + (d.amount || 0), 0);
  const uniqueCauses = new Set(donations.map((d) => d.campaignId)).size;

  return (
    <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '0 clamp(16px, 2.5vw, 32px) 80px' }}>
      {/* Profile Header */}
      <div className="glass-card" style={{
        padding: '32px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        borderRadius: '24px',
        background: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D8B775 0%, #C49E54 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(216, 183, 117, 0.4)'
          }}>
            <Heart size={30} color="#1E3524" fill="#1E3524" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '4px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              Welcome back, {user?.name}!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Donor Account: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{user?.email}</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchDonorHistory} className="btn btn-secondary btn-sm" title="Refresh">
            <RefreshCw size={15} /> Refresh
          </button>
          <Link to="/" className="btn btn-primary btn-sm">
            Discover More Causes <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#E8EFE8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <DollarSign size={22} color="var(--primary)" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Impact Given</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            ${totalDonated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#1B5E20', marginTop: '6px', fontWeight: 600 }}>
            ✓ Verified direct charity disbursement
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#F6EEDB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Award size={22} color="var(--accent-gold-dark)" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Contributions Made</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            {donations.length}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold-dark)', marginTop: '6px', fontWeight: 600 }}>
            Completed transactions
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#EAE5D7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Heart size={22} color="var(--primary)" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Causes Supported</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            {uniqueCauses}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 600 }}>
            Distinct campaign initiatives
          </p>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '4px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              Donation Transaction Ledger
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Official records with downloadable certificates & transaction UUIDs
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Loading giving ledger...
          </div>
        ) : error ? (
          <div style={{ color: '#DC2626', padding: '20px', textAlign: 'center', fontWeight: 600 }}>{error}</div>
        ) : donations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '18px' }}>
              You haven't made any contributions yet.
            </p>
            <Link to="/" className="btn btn-primary btn-sm">
              Explore Active Campaigns
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Campaign Cause</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>
                        {d.transactionId}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{d.campaignTitle}</td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {d.createdAt ? new Date(d.createdAt).toLocaleString() : 'Recent'}
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.98rem' }}>
                        ${Number(d.amount).toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedReceipt(d)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '5px 14px', fontSize: '0.8rem' }}
                      >
                        <FileText size={13} /> View Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal
          donation={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
