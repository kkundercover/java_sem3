import React from 'react';
import { CheckCircle2, Printer, X, Download, ShieldCheck, MailCheck } from 'lucide-react';

export default function ReceiptModal({ donation, onClose }) {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = donation.createdAt
    ? new Date(donation.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-printable" onClick={(e) => e.stopPropagation()} style={{
        maxWidth: '560px',
        border: '1.5px solid rgba(216, 183, 117, 0.4)',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(24, 40, 29, 0.2)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print"
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

        {/* Success Icon */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 12px',
            borderRadius: '50%',
            background: '#E8F5E9',
            border: '2px solid #2E7D32',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle2 size={32} color="#2E7D32" />
          </div>
          <span className="badge badge-active" style={{ marginBottom: '8px' }}>
            Payment Verified & Recorded
          </span>
          <h2 style={{ fontSize: '1.5rem', marginTop: '6px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            Official Giving Receipt
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Thank you for making a verifiable, positive difference.
          </p>
        </div>

        {/* Receipt Details Card (Parchment Document Style) */}
        <div style={{
          background: '#FAF8F3',
          border: '1.5px dashed #D6CBB7',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #EBE4D5' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Transaction UUID</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
              {donation.transactionId}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EBE4D5' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date & Timestamp</span>
            <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>{formattedDate}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EBE4D5' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Donor Name</span>
            <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>{donation.donorName || 'Verified Donor'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EBE4D5' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Campaign Cause</span>
            <span style={{ fontWeight: 600, fontSize: '0.88rem', maxWidth: '240px', textAlign: 'right', color: 'var(--text-main)' }}>
              {donation.campaignTitle}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>Amount Contributed</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
              ${Number(donation.amount).toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Multithreaded Receipt Dispatch Notice */}
        <div style={{
          background: '#F5EEDB',
          border: '1px solid #E2D3B3',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <MailCheck size={22} color="#8A5A36" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.8rem', color: '#5C4028', lineHeight: '1.4' }}>
            <strong>Multithreaded Dispatch Confirmed:</strong> An email confirmation and tax-deductible PDF receipt have been queued by the Spring Boot background worker thread.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="no-print" style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            <Printer size={16} /> Print Receipt
          </button>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Close & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
