'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getPlayRequests, updatePlayRequest, getUserById, getGameById } from '@/lib/data';
import Footer from '@/components/Footer';

export default function RequestsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  const [activeTab, setActiveTab] = useState('received');
  const [requests, setRequests] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Load requests
  useEffect(() => {
    if (user) {
      loadRequests();
    }
  }, [user]);

  function loadRequests() {
    setDataLoading(true);
    try {
      const allRequests = getPlayRequests(user.id);
      setRequests(allRequests);
    } catch (e) {
      console.error('Error loading requests:', e);
    }
    setDataLoading(false);
  }

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleAccept(requestId) {
    const result = updatePlayRequest(requestId, 'accepted');
    if (result) {
      loadRequests();
      showToast('Request accepted! Get ready to play! 🎉', 'success');
    } else {
      showToast('Failed to accept request. Please try again.', 'error');
    }
  }

  function handleDecline(requestId) {
    const result = updatePlayRequest(requestId, 'declined');
    if (result) {
      loadRequests();
      showToast('Request declined.', 'info');
    } else {
      showToast('Failed to decline request. Please try again.', 'error');
    }
  }

  function getStatusBadgeClass(status) {
    switch (status) {
      case 'pending': return 'badge badge-warning';
      case 'accepted': return 'badge badge-success';
      case 'declined': return 'badge badge-danger';
      default: return 'badge badge-info';
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'pending': return '⏳ Pending';
      case 'accepted': return '✅ Accepted';
      case 'declined': return '❌ Declined';
      default: return status;
    }
  }

  function getAvatarGradient(index) {
    const gradients = ['player-avatar', 'player-avatar player-avatar-green', 'player-avatar player-avatar-warm', 'player-avatar player-avatar-cool'];
    return gradients[index % gradients.length];
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  function getTimeAgo(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return formatDate(dateStr);
    } catch {
      return '';
    }
  }

  // Filter requests by tab
  const receivedRequests = requests.filter(r => r.toUserId === user?.id);
  const sentRequests = requests.filter(r => r.fromUserId === user?.id);
  const activeRequests = activeTab === 'received' ? receivedRequests : sentRequests;

  const pendingReceivedCount = receivedRequests.filter(r => r.status === 'pending').length;

  // Loading state
  if (loading || !user) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading requests...</p>
      </div>
    );
  }

  return (
    <>
      <div className="requests-layout">
        <div className="container" style={{ paddingBottom: '80px' }}>
          {/* Header */}
          <div className="dashboard-header" style={{ animation: 'fadeInDown 0.6s ease-out' }}>
            <p className="dashboard-welcome">Manage Your</p>
            <h1 className="dashboard-username" id="requests-page-title">Play Requests</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
              View and manage all your game invitations in one place
            </p>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-stats" style={{ animation: 'fadeIn 0.6s ease-out 0.1s both' }}>
            <div className="stat-card">
              <div className="stat-icon stat-icon-primary">📥</div>
              <div>
                <div className="stat-value">{receivedRequests.length}</div>
                <div className="stat-label">Received</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-accent">📤</div>
              <div>
                <div className="stat-value">{sentRequests.length}</div>
                <div className="stat-label">Sent</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-warning">⏳</div>
              <div>
                <div className="stat-value">{pendingReceivedCount}</div>
                <div className="stat-label">Awaiting Response</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-info">✅</div>
              <div>
                <div className="stat-value">{requests.filter(r => r.status === 'accepted').length}</div>
                <div className="stat-label">Accepted</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs" id="requests-tabs" style={{ animation: 'fadeIn 0.6s ease-out 0.2s both' }}>
            <button
              id="tab-received"
              className={`tab ${activeTab === 'received' ? 'active' : ''}`}
              onClick={() => setActiveTab('received')}
            >
              📥 Received {pendingReceivedCount > 0 && (
                <span style={{
                  marginLeft: '6px',
                  background: 'var(--danger)',
                  color: 'white',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {pendingReceivedCount}
                </span>
              )}
            </button>
            <button
              id="tab-sent"
              className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
              onClick={() => setActiveTab('sent')}
            >
              📤 Sent
            </button>
          </div>

          {/* Content */}
          {dataLoading ? (
            <div className="loading-page">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading requests...</p>
            </div>
          ) : activeRequests.length === 0 ? (
            <div className="empty-state" style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <div className="empty-state-icon">
                {activeTab === 'received' ? '📭' : '📬'}
              </div>
              <h3 className="empty-state-title">
                {activeTab === 'received'
                  ? 'No Received Requests'
                  : 'No Sent Requests'}
              </h3>
              <p className="empty-state-description">
                {activeTab === 'received'
                  ? "You haven't received any play requests yet. Make your profile stand out and players will start inviting you!"
                  : "You haven't sent any play requests yet. Find players and challenge them to a game!"}
              </p>
              <Link
                href="/search"
                className="btn btn-primary"
                id="requests-empty-find-players"
              >
                🔍 Find Players
              </Link>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              {activeRequests
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((request, index) => {
                  const otherUserId = activeTab === 'received' ? request.fromUserId : request.toUserId;
                  const otherUser = getUserById(otherUserId);
                  const game = getGameById(request.gameType);

                  return (
                    <div
                      key={request.id}
                      className="request-card"
                      id={`request-card-${request.id}`}
                      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
                    >
                      {/* Card Header */}
                      <div className="request-card-header">
                        <div className="request-card-info">
                          <div className={getAvatarGradient(index)}>
                            {getInitials(otherUser?.name)}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span className="player-name" style={{ fontSize: '1.05rem' }}>
                                {otherUser?.name || 'Unknown Player'}
                              </span>
                              {otherUser?.isOnline ? (
                                <span className="online-dot" title="Online"></span>
                              ) : (
                                <span className="offline-dot" title="Offline"></span>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {activeTab === 'received' ? 'wants to play with you' : 'invited to play'}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                • {getTimeAgo(request.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {game && (
                            <span className="player-game-tag" style={{ fontSize: '0.85rem' }}>
                              {game.icon} {game.name}
                            </span>
                          )}
                          <span className={getStatusBadgeClass(request.status)} id={`status-${request.id}`}>
                            {getStatusLabel(request.status)}
                          </span>
                        </div>
                      </div>

                      {/* Message */}
                      {request.message && (
                        <div className="request-message" id={`message-${request.id}`}>
                          &ldquo;{request.message}&rdquo;
                        </div>
                      )}

                      {/* Details */}
                      <div className="request-card-details">
                        <div className="request-detail">
                          <span>📅</span>
                          <span><strong>Date:</strong> {formatDate(request.preferredDate)}</span>
                        </div>
                        <div className="request-detail">
                          <span>⏰</span>
                          <span><strong>Time:</strong> {request.preferredTime || 'Flexible'}</span>
                        </div>
                        <div className="request-detail">
                          <span>📍</span>
                          <span><strong>Location:</strong> {request.location || 'To be decided'}</span>
                        </div>
                        {otherUser?.location && (
                          <div className="request-detail">
                            <span>🏠</span>
                            <span><strong>Area:</strong> {otherUser.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions - only for pending received requests */}
                      {activeTab === 'received' && request.status === 'pending' && (
                        <div className="request-actions">
                          <button
                            className="btn btn-accent btn-sm"
                            id={`accept-${request.id}`}
                            onClick={() => handleAccept(request.id)}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            id={`decline-${request.id}`}
                            onClick={() => handleDecline(request.id)}
                          >
                            ❌ Decline
                          </button>
                          {otherUser && (
                            <Link
                              href={`/player/${otherUser.id}`}
                              className="btn btn-secondary btn-sm"
                              id={`view-profile-${request.id}`}
                            >
                              👤 View Profile
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Sent tab - view profile of recipient */}
                      {activeTab === 'sent' && otherUser && (
                        <div className="request-actions">
                          <Link
                            href={`/player/${otherUser.id}`}
                            className="btn btn-secondary btn-sm"
                            id={`view-sent-profile-${request.id}`}
                          >
                            👤 View Profile
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`} id="toast-notification">
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            id="toast-close-btn"
            onClick={() => setToast(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
