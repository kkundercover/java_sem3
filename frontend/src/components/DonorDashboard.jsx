import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MODULE 3.1, 5.2 & 6.2: Donor Dashboard Component
 * 
 * Demonstrates:
 * 1. Fetching user-specific transaction history from Spring Boot REST API.
 * 2. Semantic HTML5 <table> structure (Module 3.1).
 * 3. Printable Digital Donation Receipt (BOM window.print() + styled receipt modal).
 */
function DonorDashboard({ currentUser }) {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReceipt, setActiveReceipt] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      alert('Please log in as a donor to view your transaction history.');
      navigate('/login');
      return;
    }

    // Module 6.2: GET /api/donations/donor/{id}
    fetch(`http://localhost:8080/api/donations/donor/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load donor donations:', err);
        setLoading(false);
      });
  }, [currentUser]);

  // Handle Receipt Print via Browser Object Model (Module 3.2: BOM window.print)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <section className="page-header">
        <div>
          <h1>Donor Portal & Receipt History</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Welcome back, <strong>{currentUser?.name}</strong>! Thank you for your contributions.
          </p>
        </div>
      </section>

      {/* Donation History Table */}
      <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
        📜 My Past Donations
      </h2>

      {loading ? (
        <p>Loading your contributions...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction Reference</th>
                <th>Campaign ID</th>
                <th>Amount Donated</th>
                <th>Donation Date</th>
                <th>Digital Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1.5rem' }}>
                    You have not made any donations yet. Visit the Campaigns page to contribute!
                  </td>
                </tr>
              ) : (
                donations.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <code>{d.transactionId}</code>
                    </td>
                    <td>Campaign #{d.campaignId}</td>
                    <td>
                      <strong style={{ color: '#16a34a' }}>₹{d.amount.toLocaleString()}</strong>
                    </td>
                    <td>{d.createdAt ? new Date(d.createdAt).toLocaleString() : 'Just now'}</td>
                    <td>
                      <button
                        onClick={() => setActiveReceipt(d)}
                        className="btn btn-primary btn-sm"
                      >
                        📄 View & Print Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Printable Receipt Modal Dialog */}
      {activeReceipt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3>Official Donation Receipt</h3>
              <button onClick={() => setActiveReceipt(null)} className="btn btn-secondary btn-sm">
                ✕
              </button>
            </div>

            <div className="receipt-box" id="printableReceipt">
              <div className="receipt-header">
                <h2>🤝 DONATION MANAGEMENT SYSTEM</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Official 80G Tax-Exempt Contribution Receipt
                </p>
              </div>

              <div className="receipt-row">
                <span><strong>Transaction ID:</strong></span>
                <span><code>{activeReceipt.transactionId}</code></span>
              </div>
              <div className="receipt-row">
                <span><strong>Donor Name:</strong></span>
                <span>{activeReceipt.donorName}</span>
              </div>
              <div className="receipt-row">
                <span><strong>Campaign Reference:</strong></span>
                <span>Campaign #{activeReceipt.campaignId}</span>
              </div>
              <div className="receipt-row">
                <span><strong>Contribution Amount:</strong></span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#16a34a' }}>
                  INR ₹{activeReceipt.amount.toLocaleString()}
                </span>
              </div>
              <div className="receipt-row">
                <span><strong>Payment Timestamp:</strong></span>
                <span>{activeReceipt.createdAt ? new Date(activeReceipt.createdAt).toLocaleString() : 'Confirmed'}</span>
              </div>
              <div className="receipt-row">
                <span><strong>Verification Status:</strong></span>
                <span style={{ color: '#15803d', fontWeight: 'bold' }}>✓ Verified (Background Worker Thread)</span>
              </div>

              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                * This receipt was automatically generated and processed asynchronously by ReceiptWorker.java.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button onClick={() => setActiveReceipt(null)} className="btn btn-secondary">
                Close
              </button>
              <button onClick={handlePrint} className="btn btn-success">
                🖨️ Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorDashboard;
