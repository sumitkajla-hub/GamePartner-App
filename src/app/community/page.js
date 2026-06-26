'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getCommunities, joinCommunity, leaveCommunity, createCommunity, getGameById, GAMES } from '@/lib/data';
import Footer from '@/components/Footer';

export default function CommunityPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Create community form state
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newGames, setNewGames] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }
      loadCommunities();
    }
  }, [loading, isAuthenticated, router]);

  function loadCommunities() {
    const data = getCommunities();
    setCommunities(data);
    setPageLoading(false);
  }

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleJoin(communityId) {
    if (!user) return;
    joinCommunity(communityId, user.id);
    loadCommunities();
    showToast('You have joined the community! 🎉');
  }

  function handleLeave(communityId) {
    if (!user) return;
    leaveCommunity(communityId, user.id);
    loadCommunities();
    showToast('You have left the community.', 'info');
  }

  function toggleGameSelection(gameId) {
    setNewGames(prev =>
      prev.includes(gameId)
        ? prev.filter(g => g !== gameId)
        : [...prev, gameId]
    );
  }

  function handleCreateCommunity(e) {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim() || !newLocation.trim() || newGames.length === 0) {
      showToast('Please fill all fields and select at least one game.', 'error');
      return;
    }

    setCreating(true);
    try {
      createCommunity({
        name: newName.trim(),
        description: newDescription.trim(),
        location: newLocation.trim(),
        games: newGames,
        createdBy: user.id,
      });

      loadCommunities();
      setShowModal(false);
      setNewName('');
      setNewDescription('');
      setNewLocation('');
      setNewGames([]);
      showToast('Community created successfully! 🚀');
    } catch {
      showToast('Failed to create community. Please try again.', 'error');
    } finally {
      setCreating(false);
    }
  }

  function isMember(community) {
    return user && community.members && community.members.includes(user.id);
  }

  if (loading || pageLoading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading communities...</p>
      </div>
    );
  }

  return (
    <div className="community-layout">
      <div className="container" style={{ paddingTop: '92px', paddingBottom: '60px', minHeight: '100vh' }}>
        {/* Header */}
        <div className="community-page-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
          animation: 'fadeInDown 0.6s ease-out'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              <span className="text-gradient">Communities</span> 🏘️
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Join local sports communities or create your own
            </p>
          </div>
          <button
            id="create-community-btn"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            ✨ Create Community
          </button>
        </div>

        {/* Community Cards Grid */}
        {communities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏘️</div>
            <h3 className="empty-state-title">No Communities Yet</h3>
            <p className="empty-state-description">
              Be the first to create a community and bring players together!
            </p>
            <button
              id="empty-create-community-btn"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Create First Community
            </button>
          </div>
        ) : (
          <div className="community-grid" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            {communities.map((community, index) => {
              const memberStatus = isMember(community);
              return (
                <div
                  key={community.id}
                  className="community-card card-glow"
                  id={`community-card-${community.id}`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Gradient accent bar at top */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: memberStatus ? 'var(--gradient-accent)' : 'var(--gradient-primary)'
                  }}></div>

                  {/* Card Header */}
                  <div className="community-card-header">
                    <div>
                      <h3 className="community-name" id={`community-name-${community.id}`}>
                        {community.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        marginTop: '4px'
                      }}>
                        📍 {community.location}
                      </div>
                    </div>
                    {memberStatus && (
                      <span className="badge badge-success" id={`member-badge-${community.id}`}>
                        ✓ Member
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="community-description">
                    {community.description}
                  </p>

                  {/* Game Tags */}
                  <div className="community-games">
                    {community.games && community.games.map(gameId => {
                      const game = getGameById(gameId);
                      return game ? (
                        <span
                          key={gameId}
                          className="player-game-tag"
                          id={`community-${community.id}-game-${gameId}`}
                        >
                          {game.icon} {game.name}
                        </span>
                      ) : null;
                    })}
                  </div>

                  {/* Stats */}
                  <div className="community-stats">
                    <div className="community-stat">
                      <div className="community-stat-value">
                        {community.members ? community.members.length : 0}
                      </div>
                      <div className="community-stat-label">Members</div>
                    </div>
                    <div className="community-stat">
                      <div className="community-stat-value" style={{ color: 'var(--accent-light)' }}>
                        {community.upcomingEvents || 0}
                      </div>
                      <div className="community-stat-label">Upcoming Events</div>
                    </div>
                  </div>

                  {/* Join / Leave Button */}
                  {memberStatus ? (
                    <button
                      id={`leave-community-${community.id}`}
                      className="btn btn-secondary w-full"
                      onClick={() => handleLeave(community.id)}
                      style={{ marginTop: '4px' }}
                    >
                      🚪 Leave Community
                    </button>
                  ) : (
                    <button
                      id={`join-community-${community.id}`}
                      className="btn btn-accent w-full"
                      onClick={() => handleJoin(community.id)}
                      style={{ marginTop: '4px' }}
                    >
                      🤝 Join Community
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Community Modal */}
      {showModal && (
        <div className="modal-overlay" id="create-community-modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowModal(false);
        }}>
          <div className="modal" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2 className="modal-title">✨ Create New Community</h2>
              <button
                id="close-modal-btn"
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCommunity}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="community-name-input">Community Name</label>
                <input
                  id="community-name-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Weekend Warriors Club"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="community-description-input">Description</label>
                <textarea
                  id="community-description-input"
                  className="form-textarea"
                  placeholder="Tell us about your community..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                  rows={3}
                ></textarea>
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label" htmlFor="community-location-input">Location</label>
                <input
                  id="community-location-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Koramangala, Bangalore"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  required
                />
              </div>

              {/* Select Games */}
              <div className="form-group">
                <label className="form-label">Select Games</label>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>
                  Click to select games for your community
                </p>
                <div className="auth-games-select">
                  {GAMES.map(game => (
                    <div
                      key={game.id}
                      id={`modal-game-${game.id}`}
                      className={`auth-game-option ${newGames.includes(game.id) ? 'selected' : ''}`}
                      onClick={() => toggleGameSelection(game.id)}
                    >
                      <span className="auth-game-option-icon">{game.icon}</span>
                      {game.name}
                    </div>
                  ))}
                </div>
                {newGames.length > 0 && (
                  <p style={{ color: 'var(--accent-light)', fontSize: '0.8rem', marginTop: '8px' }}>
                    {newGames.length} game{newGames.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  id="cancel-create-btn"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-create-btn"
                  className="btn btn-primary"
                  disabled={creating}
                >
                  {creating ? '⏳ Creating...' : '🚀 Create Community'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`} id="community-toast">
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            id="close-toast-btn"
            onClick={() => setToast(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
