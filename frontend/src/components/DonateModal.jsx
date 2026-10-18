import React, { useState } from 'react';

/**
 * MODULE 3.2 & 5.2: Donate Modal & Client-Side Validation
 * 
 * Demonstrates:
 * 1. Controlled form inputs with useState.
 * 2. JavaScript Input Validation:
 *    - Validates email regex pattern.
 *    - Validates amount > 0 (prevents negative or zero donations).
 * 3. Calling Spring Boot REST API using fetch().
 */
function DonateModal({ campaign, currentUser, onClose, onDonationSuccess }) {
  // Local state for form fields
  const [donorName, setDonorName] = useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [amount, setAmount] = useState('');
  
  // Validation errors & status state
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-Side Validation Function (Module 3.2)
  const validateForm = () => {
    if (!donorName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }

    // Standard Email Regular Expression Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address (e.g., user@example.com).');
      return false;
    }

    // Non-negative and positive number check
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Donation amount must be a positive number greater than 0.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Execute client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare payload matching com.donation.management.entity.Donation
    const donationPayload = {
      campaignId: campaign.id,
      donorId: currentUser ? currentUser.id : 1, // Fallback donor id for anonymous
      donorName: donorName,
      amount: parseFloat(amount)
    };

    // Module 6.2: Calling Spring Boot REST API
    fetch('http://localhost:8080/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donationPayload)
    })
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to process donation.');
        }
        return response.json();
      })
      .then((data) => {
        alert(
          `Thank you, ${donorName}!\n\n` +
          `Donation of Rs. ${data.amount} successful!\n` +
          `Transaction ID: ${data.transactionId}\n\n` +
          `(ReceiptWorker background thread is now generating your receipt!)`
        );
        onDonationSuccess();
        onClose();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Donate to: {campaign.title}</h3>
          <button onClick={onClose} className="btn btn-secondary btn-sm">✕</button>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Your Full Name:</label>
            <input
              id="donorName"
              type="text"
              className="form-control"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="e.g., Rajesh Kumar"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address (for receipt):</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., rajesh@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Donation Amount (INR ₹):</label>
            <input
              id="amount"
              type="number"
              step="any"
              min="1"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (e.g. 500)"
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm & Donate ₹'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonateModal;
