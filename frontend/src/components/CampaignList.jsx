import React, { useState, useEffect } from 'react';
import DonateModal from './DonateModal.jsx';

/**
 * MODULE 5.2: Campaign List Component
 * 
 * Demonstrates:
 * 1. useState: Managing component state (campaigns list, loading state, modal state).
 * 2. useEffect: Side-effect hook that fetches campaign data when the component mounts.
 * 3. Conditional Rendering: Displays loading message, error message, or campaign cards.
 * 4. Lists & Keys: Maps over array rendering each campaign card with a unique 'key={campaign.id}'.
 * 5. HTML5 & CSS Progress Bar: Computes progress percentage dynamically.
 */
function CampaignList({ currentUser }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Function to fetch all campaigns from Spring Boot REST API
  const fetchCampaigns = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/campaigns')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not connect to Spring Boot server on port 8080.');
        }
        return res.json();
      })
      .then((data) => {
        setCampaigns(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect executes fetchCampaigns once on component mount (empty dependency array [])
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <section className="page-header">
        <div>
          <h1>Active Fundraising Campaigns</h1>
          <p>
            Select a verified cause and contribute directly to create an impact.
          </p>
        </div>
        <button onClick={fetchCampaigns} className="btn btn-secondary btn-sm">
          🔄 Refresh
        </button>
      </section>

      {/* Conditional Rendering: Loading State */}
      {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading campaigns from backend...</p>}

      {/* Conditional Rendering: Error State */}
      {error && (
        <div className="alert alert-danger">
          <strong>Backend Connection Error:</strong> {error}
          <br />
          <small>Make sure the Spring Boot application is running on http://localhost:8080.</small>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && campaigns.length === 0 && (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No campaigns available currently.</p>
      )}

      {/* Lists & Keys (Module 5.2): Campaign Cards Grid */}
      <div className="card-grid">
        {campaigns.map((camp) => {
          // Calculate progress percentage
          const percent = camp.targetAmount > 0 
            ? Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100)) 
            : 0;

          return (
            <article key={camp.id} className="card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 className="card-title">{camp.title}</h3>
                  <span className={`status-badge ${camp.status === 'ACTIVE' ? 'status-active' : 'status-completed'}`}>
                    {camp.status}
                  </span>
                </div>
                <p className="card-desc">{camp.description}</p>
              </div>

              <div>
                {/* HTML5 & CSS Progress Bar */}
                <div className="progress-container">
                  <div className="progress-labels">
                    <span>Raised: ₹{camp.collectedAmount.toLocaleString()}</span>
                    <span>Goal: ₹{camp.targetAmount.toLocaleString()} ({percent}%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCampaign(camp)}
                  disabled={camp.status === 'COMPLETED'}
                  className={`btn ${camp.status === 'COMPLETED' ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {camp.status === 'COMPLETED' ? 'Goal Achieved 🎉' : 'Donate Now 💖'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Dialog for Making a Donation */}
      {selectedCampaign && (
        <DonateModal
          campaign={selectedCampaign}
          currentUser={currentUser}
          onClose={() => setSelectedCampaign(null)}
          onDonationSuccess={fetchCampaigns}
        />
      )}
    </div>
  );
}

export default CampaignList;
