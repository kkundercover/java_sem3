import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MODULE 3.1, 5.2 & 6.2: Admin Dashboard Component
 * 
 * Demonstrates:
 * 1. Admin Authorization check in React (currentUser.role === 'ADMIN').
 * 2. Form submission for creating a new Campaign via POST /api/campaigns.
 * 3. Semantic HTML5 <table> with <thead>, <tbody>, <th>, <tr>, <td> (Module 3.1).
 * 4. Dynamic calculations (Total Campaigns, Total Raised, Progress %).
 */
function AdminDashboard({ currentUser }) {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Campaign Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Fetch all campaigns
  const loadCampaigns = () => {
    fetch('http://localhost:8080/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load campaigns:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // If not logged in as ADMIN, redirect to login
    if (!currentUser || currentUser.role !== 'ADMIN') {
      alert('Access restricted to Administrators only.');
      navigate('/login');
      return;
    }
    loadCampaigns();
  }, [currentUser]);

  // Handle New Campaign Creation (Module 3.2 validation + 6.2 POST)
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!title.trim()) {
      setFormError('Campaign title is required.');
      return;
    }

    const target = parseFloat(targetAmount);
    if (isNaN(target) || target <= 0) {
      setFormError('Target amount must be a positive number greater than 0.');
      return;
    }

    const payload = {
      title,
      description,
      targetAmount: target,
      collectedAmount: 0.0,
      status: 'ACTIVE'
    };

    fetch('http://localhost:8080/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to create campaign.');
        }
        return res.json();
      })
      .then(() => {
        setFormSuccess('New campaign created successfully!');
        setTitle('');
        setDescription('');
        setTargetAmount('');
        loadCampaigns(); // Refresh table
      })
      .catch((err) => {
        setFormError(err.message);
      });
  };

  // Handle Campaign Deletion
  const handleDeleteCampaign = (id) => {
    if (!window.confirm(`Are you sure you want to delete Campaign #${id}?`)) {
      return;
    }

    fetch(`http://localhost:8080/api/campaigns/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          loadCampaigns();
        } else {
          alert('Could not delete campaign.');
        }
      })
      .catch((err) => alert(err.message));
  };

  // Calculate summary metrics
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.collectedAmount || 0), 0);

  return (
    <div>
      <section className="page-header">
        <h1>Administrator Dashboard</h1>
        <span className="user-badge">Logged in: {currentUser?.name}</span>
      </section>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Total Campaigns</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e3a8a' }}>{campaigns.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Total Funds Raised</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#16a34a' }}>₹{totalRaised.toLocaleString()}</p>
        </div>
      </div>

      {/* Create Campaign Form Card */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
          ➕ Launch New Fundraising Campaign
        </h2>

        {formError && <div className="alert alert-danger">{formError}</div>}
        {formSuccess && <div className="alert alert-success">{formSuccess}</div>}

        <form onSubmit={handleCreateCampaign}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="campTitle">Campaign Title:</label>
              <input
                id="campTitle"
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Flood Relief Medical Camps"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="campTarget">Target Goal (INR ₹):</label>
              <input
                id="campTarget"
                type="number"
                min="1"
                className="form-control"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g., 50000"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="campDesc">Cause Description:</label>
            <textarea
              id="campDesc"
              rows="3"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a clear description of where donated funds will be utilized..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Campaign
          </button>
        </form>
      </div>

      {/* HTML5 Semantic Table (Module 3.1) */}
      <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
        📋 All Registered Campaigns
      </h2>

      {loading ? (
        <p>Loading campaign table...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Campaign Title</th>
                <th>Target Goal</th>
                <th>Collected Amount</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '1.5rem' }}>
                    No campaigns found. Use the form above to add one.
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => {
                  const pct = c.targetAmount > 0 
                    ? Math.min(100, Math.round((c.collectedAmount / c.targetAmount) * 100)) 
                    : 0;

                  return (
                    <tr key={c.id}>
                      <td><strong>#{c.id}</strong></td>
                      <td>{c.title}</td>
                      <td>₹{c.targetAmount.toLocaleString()}</td>
                      <td>₹{c.collectedAmount.toLocaleString()}</td>
                      <td>
                        <strong>{pct}%</strong>
                      </td>
                      <td>
                        <span className={`status-badge ${c.status === 'ACTIVE' ? 'status-active' : 'status-completed'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteCampaign(c.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
