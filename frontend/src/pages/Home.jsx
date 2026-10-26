import React, { useState, useEffect } from 'react';
import { api } from '../api';
import CampaignCard from '../components/CampaignCard';
import DonationModal from '../components/DonationModal';
import ReceiptModal from '../components/ReceiptModal';
import { Heart, Search, Sparkles, ShieldCheck, Globe, Users, DollarSign, ArrowRight, UserCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED_DONORS = [
  {
    name: 'John Graham',
    handle: '@john',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    role: 'Top Contributor'
  },
  {
    name: 'Heidi John',
    handle: '@heidi-s',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    role: 'Verified Organizer'
  },
  {
    name: 'John Thornton',
    handle: '@john-33',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    role: 'Sustaining Donor'
  },
  {
    name: 'John Abraham',
    handle: '@john-abraham',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    role: 'Community Lead'
  }
];

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeDonationCampaign, setActiveDonationCampaign] = useState(null);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [followedUsers, setFollowedUsers] = useState({});

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await api.campaigns.getAll(filterStatus === 'ALL' ? null : filterStatus);
      setCampaigns(data);
      setError('');
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Unable to load campaigns from the backend server. Please verify backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [filterStatus]);

  const handleDonationSuccess = (newDonation) => {
    setActiveDonationCampaign(null);
    setLastReceipt(newDonation);
    fetchCampaigns();
  };

  const toggleFollow = (handle) => {
    setFollowedUsers(prev => ({
      ...prev,
      [handle]: !prev[handle]
    }));
  };

  // Filter based on search and optional category tags
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (categoryFilter === 'All') return true;
    const titleAndDesc = (c.title + ' ' + (c.description || '')).toLowerCase();
    if (categoryFilter === 'Environment') return titleAndDesc.includes('tree') || titleAndDesc.includes('earth') || titleAndDesc.includes('environment') || titleAndDesc.includes('green');
    if (categoryFilter === 'Housing') return titleAndDesc.includes('house') || titleAndDesc.includes('blanket') || titleAndDesc.includes('shelter') || titleAndDesc.includes('relief');
    if (categoryFilter === 'Animals') return titleAndDesc.includes('donkey') || titleAndDesc.includes('animal') || titleAndDesc.includes('rescue') || titleAndDesc.includes('wildlife');
    return true;
  });

  return (
    <div style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(20px, 3vw, 44px) 80px' }}>
      {/* Hero Impact Intro */}
      <section style={{
        textAlign: 'center',
        padding: '30px 20px 45px',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: 'var(--radius-full)',
          background: '#EAE5D7',
          border: '1px solid #DBD4C2',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <Sparkles size={16} color="var(--accent-gold-dark)" /> Transparent Grassroots Philanthropy
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          lineHeight: '1.18',
          maxWidth: '850px',
          margin: '0 auto 16px',
          color: 'var(--text-main)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.03em'
        }}>
          Empower Real Change,{' '}
          <span style={{
            color: 'var(--primary)',
            textDecoration: 'underline',
            textDecorationColor: 'var(--accent-gold)',
            textUnderlineOffset: '6px'
          }}>
            One Contribution
          </span>{' '}
          at a Time.
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto 32px',
          lineHeight: '1.6'
        }}>
          Discover verified campaigns, fund life-saving initiatives, and experience 100% transparent tracking backed by enterprise Spring Boot architecture.
        </p>

        {/* Impact Stats Banner */}
        <div className="glass-panel" style={{
          maxWidth: '1020px',
          margin: '0 auto',
          padding: '22px 36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          textAlign: 'center',
          background: '#FFFFFF',
          borderRadius: '24px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <Globe size={20} color="var(--primary)" />
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>4+</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Active Social Causes
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={20} color="var(--accent-gold-dark)" />
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>100%</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Direct Fund Transparency
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <Users size={20} color="var(--primary)" />
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Instant</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Multithreaded E-Receipts
            </p>
          </div>
        </div>
      </section>

      {/* Main Campaign Search & Filter Controls */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Centered Search Pill matching the header in the photo */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)'
            }} />
            <input
              type="text"
              placeholder="Causes, Campaigns... Search initiatives by keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '48px',
                borderRadius: 'var(--radius-full)',
                background: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(24, 40, 29, 0.05)',
                border: '1.5px solid rgba(24, 40, 29, 0.12)'
              }}
            />
          </div>

          {/* Filter Chips Bar (Category + Status) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Category chips matching the photo */}
            {['All', 'Environment', 'Housing', 'Animals'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}

            <span style={{ color: 'rgba(24, 40, 29, 0.25)', margin: '0 4px' }}>|</span>

            {/* Status Tabs (ALL, ACTIVE, COMPLETED) */}
            {['ALL', 'ACTIVE', 'COMPLETED'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`filter-chip ${filterStatus === status ? 'active' : ''}`}
                style={{ fontSize: '0.8rem' }}
              >
                Status: {status}
              </button>
            ))}
          </div>
        </div>

        {/* Section Heading & Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '28px',
          alignItems: 'start'
        }} className="main-content-layout">

          {/* Left Column: Active Fundraising Campaigns */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '1.65rem',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700
              }}>
                Active Fundraising Campaigns
              </h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {filteredCampaigns.length} available
              </span>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(30, 53, 36, 0.15)',
                  borderTopColor: 'var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <p>Loading active campaigns...</p>
              </div>
            ) : error ? (
              <div className="glass-panel" style={{
                textAlign: 'center',
                padding: '40px',
                borderColor: '#FCA5A5',
                background: '#FEF2F2'
              }}>
                <p style={{ color: '#DC2626', marginBottom: '14px', fontWeight: 600 }}>{error}</p>
                <button onClick={fetchCampaigns} className="btn btn-secondary btn-sm">
                  Try Reconnecting
                </button>
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                  No campaigns found matching your criteria.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onDonateClick={(c) => setActiveDonationCampaign(c)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Featured Donors & Organizers Sidebar (from inspiration image) */}
          <aside className="glass-card" style={{
            padding: '24px',
            borderRadius: '24px',
            background: '#FFFFFF',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              lineHeight: '1.3',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              marginBottom: '18px'
            }}>
              Featured Donors <br />& Organizers
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {FEATURED_DONORS.map((donor) => {
                const isFollowing = !!followedUsers[donor.handle];
                return (
                  <div
                    key={donor.handle}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={donor.avatar}
                        alt={donor.name}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #E8EFE8'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                          {donor.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                          {donor.handle}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(donor.handle)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        border: '1px solid rgba(24, 40, 29, 0.2)',
                        background: isFollowing ? 'var(--primary)' : '#FFFFFF',
                        color: isFollowing ? '#FFFFFF' : 'var(--text-main)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Community Stats Badge */}
            <div style={{
              marginTop: '24px',
              padding: '14px',
              borderRadius: '16px',
              background: '#F6F9F5',
              border: '1px solid #E2EDE0',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--primary)', marginBottom: '4px' }}>
                <UserCheck size={16} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Verified Community</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Every donation verified by digital audit logs and printable tax receipts.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Donation Modal */}
      {activeDonationCampaign && (
        <DonationModal
          campaign={activeDonationCampaign}
          onClose={() => setActiveDonationCampaign(null)}
          onDonationSuccess={handleDonationSuccess}
        />
      )}

      {/* Receipt Modal */}
      {lastReceipt && (
        <ReceiptModal
          donation={lastReceipt}
          onClose={() => setLastReceipt(null)}
        />
      )}

      <style>{`
        @media (max-width: 992px) {
          .main-content-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
