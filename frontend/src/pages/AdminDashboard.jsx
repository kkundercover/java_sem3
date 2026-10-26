import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  DollarSign,
  Users,
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  X,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTargetAmount, setFormTargetAmount] = useState('');
  const [formStatus, setFormStatus] = useState('ACTIVE');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [analyticsData, campaignsData] = await Promise.all([
        api.admin.getAnalytics(),
        api.campaigns.getAll(),
      ]);
      setAnalytics(analyticsData);
      setCampaigns(campaignsData || []);
      setError('');
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setError('Error loading administrative data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    loadData();
  }, [isAdmin]);

  const handleOpenCreateModal = () => {
    setFormTitle('');
    setFormDescription('');
    setFormTargetAmount('');
    setFormStatus('ACTIVE');
    setFormError('');
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (camp) => {
    setEditingCampaign(camp);
    setFormTitle(camp.title);
    setFormDescription(camp.description || '');
    setFormTargetAmount(camp.targetAmount.toString());
    setFormStatus(camp.status);
    setFormError('');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle.trim()) {
      setFormError('Campaign title is required.');
      return;
    }

    const targetVal = parseFloat(formTargetAmount);
    if (isNaN(targetVal) || targetVal <= 0) {
      setFormError('Target funding goal must be strictly greater than $0.');
      return;
    }

    try {
      setFormSubmitting(true);
      await api.campaigns.create({
        title: formTitle.trim(),
        description: formDescription.trim(),
        targetAmount: targetVal,
        status: formStatus,
        createdById: user?.id,
      });

      setIsCreateModalOpen(false);
      loadData();
    } catch (err) {
      setFormError(err.message || 'Failed to create campaign.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const targetVal = parseFloat(formTargetAmount);
    if (isNaN(targetVal) || targetVal <= 0) {
      setFormError('Target funding goal must be strictly greater than $0.');
      return;
    }

    try {
      setFormSubmitting(true);
      await api.campaigns.update(editingCampaign.id, {
        title: formTitle.trim(),
        description: formDescription.trim(),
        targetAmount: targetVal,
        status: formStatus,
      });

      setEditingCampaign(null);
      loadData();
    } catch (err) {
      setFormError(err.message || 'Failed to update campaign.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteCampaign = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete campaign "${title}"?`)) {
      try {
        await api.campaigns.delete(id);
        loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete campaign.');
      }
    }
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '0 clamp(16px, 2.5vw, 32px) 80px' }}>
      {/* Header */}
      <div className="glass-card" style={{
        padding: '30px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        borderRadius: '24px',
        background: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D8B775 0%, #C49E54 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(216, 183, 117, 0.4)'
          }}>
            <ShieldCheck size={30} color="#1E3524" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '4px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              Administrative Management Console
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Real-time platform metrics, campaign management, and financial audit logs
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={loadData} className="btn btn-secondary btn-sm">
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={handleOpenCreateModal} className="btn btn-primary btn-sm">
            <Plus size={16} /> New Campaign
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div className="glass-card" style={{ padding: '22px', borderRadius: '24px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E8EFE8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={18} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Raised</span>
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
              {formatCurrency(analytics.totalFundsRaised)}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#1B5E20', marginTop: '4px', fontWeight: 600 }}>Across all verified campaigns</p>
          </div>

          <div className="glass-card" style={{ padding: '22px', borderRadius: '24px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F6EEDB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} color="var(--accent-gold-dark)" />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Transactions</span>
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {analytics.totalDonationsCount}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-dark)', marginTop: '4px', fontWeight: 600 }}>Avg gift: ${analytics.averageDonationAmount}</p>
          </div>

          <div className="glass-card" style={{ padding: '22px', borderRadius: '24px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EAE5D7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Users</span>
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {analytics.totalDonorsCount}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Registered stakeholders</p>
          </div>

          <div className="glass-card" style={{ padding: '22px', borderRadius: '24px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5EEDB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} color="var(--accent-gold-dark)" />
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Campaigns</span>
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {analytics.activeCampaignsCount} / {analytics.totalCampaignsCount}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-dark)', marginTop: '4px', fontWeight: 600 }}>Live funding targets</p>
          </div>
        </div>
      )}

      {/* Campaigns CRUD Table */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '36px', borderRadius: '24px', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '4px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              Campaign Inventory
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Manage active initiatives, update target thresholds, or alter lifecycle status
            </p>
          </div>
          <button onClick={handleOpenCreateModal} className="btn btn-primary btn-sm">
            <Plus size={15} /> Add Cause
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Campaign Title</th>
                <th>Goal</th>
                <th>Collected</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const pct = Math.min(100, Math.round(((c.collectedAmount || 0) / (c.targetAmount || 1)) * 100));
                return (
                  <tr key={c.id}>
                    <td>#{c.id}</td>
                    <td style={{ fontWeight: 600, maxWidth: '280px' }}>{c.title}</td>
                    <td>{formatCurrency(c.targetAmount)}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatCurrency(c.collectedAmount)}</td>
                    <td style={{ width: '120px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="progress-track" style={{ height: '6px' }}>
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        c.status === 'COMPLETED' ? 'badge-completed' : (c.status === 'PAUSED' ? 'badge-paused' : 'badge-active')
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px 12px' }}
                          title="Edit Campaign"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(c.id, c.title)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '6px 12px' }}
                          title="Delete Campaign"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Campaign Modal */}
      {(isCreateModalOpen || editingCampaign) && (
        <div className="modal-overlay" onClick={() => { setIsCreateModalOpen(false); setEditingCampaign(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            borderRadius: '24px',
            background: '#FFFFFF',
            boxShadow: '0 20px 45px rgba(24, 40, 29, 0.2)'
          }}>
            <button
              onClick={() => { setIsCreateModalOpen(false); setEditingCampaign(null); }}
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

            <h2 style={{ fontSize: '1.4rem', marginBottom: '18px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {editingCampaign ? 'Edit Campaign Initiative' : 'Create New Social Initiative'}
            </h2>

            {formError && (
              <div style={{
                background: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingCampaign ? handleEditSubmit : handleCreateSubmit}>
              <div className="form-group">
                <label className="form-label">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. Solar Power for Rural Clinics"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description & Mission</label>
                <textarea
                  rows="3"
                  placeholder="Describe the initiative's direct community impact..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Funding Target Goal ($ USD)</label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="e.g. 15000"
                  value={formTargetAmount}
                  onChange={(e) => setFormTargetAmount(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Lifecycle Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="ACTIVE">ACTIVE (Accepting Donations)</option>
                  <option value="PAUSED">PAUSED (Temporarily on hold)</option>
                  <option value="COMPLETED">COMPLETED (Goal fulfilled)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px' }}
              >
                {formSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving Campaign...
                  </>
                ) : (
                  editingCampaign ? 'Save Changes' : 'Publish Campaign'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
