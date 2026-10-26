import React, { useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { X, Heart, ShieldCheck, DollarSign, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export default function DonationModal({ campaign, onClose, onDonationSuccess }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedPreset, setSelectedPreset] = useState(50);
  const [customAmount, setCustomAmount] = useState('50');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePresetSelect = (amount) => {
    setSelectedPreset(amount);
    setCustomAmount(amount.toString());
    setErrorMessage('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedPreset(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side JavaScript Validation (Lab 9 alignment)
    if (!isAuthenticated) {
      setErrorMessage('Please sign in to complete your verified donation record.');
      return;
    }

    const numericAmount = parseFloat(customAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please enter a valid donation amount strictly greater than $0.');
      return;
    }

    try {
      setIsSubmitting(true);
      const donationPayload = {
        donorId: user.id,
        campaignId: campaign.id,
        amount: numericAmount,
      };

      const result = await api.donations.create(donationPayload);
      onDonationSuccess(result);
    } catch (err) {
      setErrorMessage(err.message || 'Donation processing failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '520px',
        background: '#FFFFFF',
        boxShadow: '0 20px 45px rgba(24, 40, 29, 0.2)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--pill-bg)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
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
            <Heart size={26} color="#1E3524" fill="#1E3524" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '6px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            Make a Difference
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Supporting: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{campaign.title}</span>
          </p>
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
            marginBottom: '18px'
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Preset Amounts */}
        <div style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
            Select Donation Amount
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetSelect(amt)}
                className="btn btn-secondary"
                style={{
                  padding: '10px 0',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  borderColor: selectedPreset === amt ? 'var(--primary)' : 'var(--pill-border)',
                  background: selectedPreset === amt ? 'var(--primary)' : 'var(--pill-bg)',
                  color: selectedPreset === amt ? '#FFFFFF' : 'var(--text-main)',
                }}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Field */}
        <div className="form-group">
          <label className="form-label">Or Custom Amount ($ USD)</label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
              fontWeight: 700
            }}>
              $
            </span>
            <input
              type="number"
              min="1"
              step="any"
              value={customAmount}
              onChange={handleCustomChange}
              placeholder="Enter amount"
              className="form-input"
              style={{ paddingLeft: '32px' }}
            />
          </div>
        </div>

        {/* Authenticated Donor Details */}
        {isAuthenticated ? (
          <div style={{
            background: '#F5F9F4',
            border: '1px solid #DEEADE',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contributing as</p>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name} ({user.email})</p>
            </div>
            <ShieldCheck size={20} color="var(--primary)" />
          </div>
        ) : (
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ fontSize: '0.85rem', color: '#B45309' }}>
              You must sign in before donating.
            </p>
            <button
              onClick={() => { onClose(); navigate('/login'); }}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#F59E0B' }}
            >
              Sign In Now
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !isAuthenticated}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing Secure Payment...
            </>
          ) : (
            <>
              <DollarSign size={18} />
              Confirm Donation of ${customAmount || 0}
            </>
          )}
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <ShieldCheck size={14} color="var(--primary)" />
          256-bit Encrypted Transaction & Automated Tax-Receipt Worker
        </p>
      </div>
    </div>
  );
}
