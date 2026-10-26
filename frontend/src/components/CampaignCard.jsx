import React from 'react';
import { Target, TrendingUp, CheckCircle2, Clock, Heart, Shield, Trees, Users, Sparkles, PawPrint } from 'lucide-react';

export default function CampaignCard({ campaign, onDonateClick }) {
  const target = campaign.targetAmount || 1;
  const collected = campaign.collectedAmount || 0;
  const percentage = Math.min(100, Math.round((collected / target) * 100));
  const isCompleted = campaign.status === 'COMPLETED' || collected >= target;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Select an appropriate emblem icon based on campaign characteristics
  const getEmblemIcon = (title = '', id = 1) => {
    const lower = title.toLowerCase();
    if (lower.includes('animal') || lower.includes('rescue') || lower.includes('dog') || lower.includes('donkey')) {
      return <PawPrint size={24} color="#8A5A36" />;
    }
    if (lower.includes('tree') || lower.includes('green') || lower.includes('forest') || lower.includes('earth') || lower.includes('clean')) {
      return <Trees size={24} color="#1E3524" />;
    }
    if (lower.includes('water') || lower.includes('relief') || lower.includes('medical') || lower.includes('health')) {
      return <Shield size={24} color="#B85D36" />;
    }
    if (lower.includes('food') || lower.includes('diaper') || lower.includes('child') || lower.includes('community')) {
      return <Users size={24} color="#3B5A45" />;
    }
    const icons = [
      <Heart size={24} color="#A7412A" fill="#F4D9D0" />,
      <Trees size={24} color="#1E3524" />,
      <Sparkles size={24} color="#B07D2B" />,
      <Users size={24} color="#2D4D36" />
    ];
    return icons[id % icons.length];
  };

  const getCategory = (title = '', id = 1) => {
    const lower = title.toLowerCase();
    if (lower.includes('animal') || lower.includes('rescue')) return 'Animals & Rescue';
    if (lower.includes('tree') || lower.includes('environment') || lower.includes('forest') || lower.includes('green')) return 'Environment';
    if (lower.includes('housing') || lower.includes('shelter')) return 'Housing & Relief';
    if (lower.includes('medical') || lower.includes('health')) return 'Healthcare';
    const categories = ['Community Action', 'Social Compassion', 'Grassroots Relief', 'Sustainable Future'];
    return categories[id % categories.length];
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
      background: '#FFFFFF',
      border: '1px solid rgba(24, 40, 29, 0.08)',
      boxShadow: '0 8px 24px -4px rgba(24, 40, 29, 0.08)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease'
    }}>
      {/* Top Golden Canopy / Arch from the Inspiration Design */}
      <div style={{
        position: 'relative',
        height: '110px',
        background: 'linear-gradient(180deg, #DDBF7D 0%, #D4B36B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}>
        {/* Curved bottom cutout using SVG for that signature scalloped arch look */}
        <svg
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: '24px',
            fill: '#FFFFFF',
          }}
        >
          <path d="M0,0 Q200,45 400,0 L400,60 L0,60 Z" />
        </svg>

        {/* Circular Emblem Cutout Badge in the Center */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          zIndex: 2,
          transform: 'translateY(-4px)'
        }}>
          {getEmblemIcon(campaign.title, campaign.id)}
        </div>

        {/* Top Right Status Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          zIndex: 3
        }}>
          <span className={`badge ${
            isCompleted ? 'badge-completed' : (campaign.status === 'PAUSED' ? 'badge-paused' : 'badge-active')
          }`} style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}>
            {isCompleted ? <CheckCircle2 size={11} /> : <Clock size={11} />}
            {isCompleted ? 'Goal Achieved' : campaign.status}
          </span>
        </div>

        {/* Top Left Initiative Tag */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'rgba(28, 42, 30, 0.8)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Initiative #{campaign.id}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          {/* Campaign Title */}
          <h3 style={{
            fontSize: '1.25rem',
            lineHeight: '1.3',
            color: 'var(--text-main)',
            fontWeight: 700,
            marginBottom: '4px',
            fontFamily: 'var(--font-heading)'
          }}>
            {campaign.title}
          </h3>

          {/* Category Subtitle */}
          <p style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '12px'
          }}>
            {getCategory(campaign.title, campaign.id)}
          </p>

          {/* Campaign Description */}
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textAlign: 'left'
          }}>
            {campaign.description || 'Supporting verified grassroots impact initiatives with direct transparency.'}
          </p>
        </div>

        {/* Progress Metrics & Action */}
        <div>
          {/* Progress Metrics Row */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              fontWeight: 600
            }}>
              <span>
                {percentage}% Collected - {formatCurrency(collected)} of {formatCurrency(target)}
              </span>
              <span style={{ color: isCompleted ? '#6B21A8' : 'var(--primary)', fontWeight: 700 }}>
                {percentage}%
              </span>
            </div>

            <div className="progress-track" style={{ height: '8px' }}>
              <div
                className={`progress-fill ${isCompleted ? 'completed' : ''}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Action Button: Styled as deep forest green pill */}
          {isCompleted ? (
            <button
              disabled
              className="btn btn-secondary"
              style={{ width: '100%', opacity: 0.75, cursor: 'not-allowed' }}
            >
              <CheckCircle2 size={16} /> Fully Funded
            </button>
          ) : (
            <button
              onClick={() => onDonateClick(campaign)}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '11px 20px',
                fontSize: '0.95rem'
              }}
            >
              <TrendingUp size={16} /> Donate Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
