'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getPlayRequests, getCommunities, getGameById, getUserById } from '@/lib/data';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ matches: 0, requests: 0, games: 0, communities: 0 });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      // Calculate stats
      const requests = getPlayRequests(user.id);
      const pendingReqs = requests.filter(r => r.status === 'pending' && r.toUserId === user.id).length;
      
      const comms = getCommunities();
      const myComms = comms.filter(c => c.members.includes(user.id)).length;

      setStats({
        matches: user.matchesPlayed || 0,
        requests: pendingReqs,
        games: user.games.length,
        communities: myComms
      });

      // Get recent requests (last 3)
      const recent = [...requests]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentRequests(recent);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="loading-page">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-layout container">
        <div className="dashboard-header animate-fade-in-up">
          <p className="dashboard-welcome">Welcome back,</p>
          <h1 className="dashboard-username">{user.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            📍 {user.location} &nbsp;•&nbsp; 🌟 {user.skillLevel}
          </p>
        </div>

        <div className="dashboard-stats animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card">
            <div className="stat-icon stat-icon-primary">🏆</div>
            <div>
              <div className="stat-value">{stats.matches}</div>
              <div className="stat-label">Matches Played</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-warning">📩</div>
            <div>
              <div className="stat-value">{stats.requests}</div>
              <div className="stat-label">Pending Requests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-accent">🎮</div>
            <div>
              <div className="stat-value">{stats.games}</div>
              <div className="stat-label">Games Registered</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-info">👥</div>
            <div>
              <div className="stat-value">{stats.communities}</div>
              <div className="stat-label">Communities Joined</div>
            </div>
          </div>
        </div>

        <div className="flex gap-md mb-lg flex-wrap animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/search" className="btn btn-primary">🔍 Find Players</Link>
          <Link href="/requests" className="btn btn-secondary">
            📩 View Requests
            {stats.requests > 0 && (
              <span style={{ 
                background: 'var(--danger)', color: 'white', padding: '2px 8px', 
                borderRadius: 'var(--radius-full)', fontSize: '0.75rem', marginLeft: '6px' 
              }}>
                {stats.requests}
              </span>
            )}
          </Link>
          <Link href="/community" className="btn btn-secondary">👥 Browse Communities</Link>
        </div>

        <div className="dashboard-grid animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div>
            <h2 className="dashboard-section-title">Recent Requests</h2>
            {recentRequests.length > 0 ? (
              recentRequests.map(req => {
                const isReceived = req.toUserId === user.id;
                const otherUser = getUserById(isReceived ? req.fromUserId : req.toUserId);
                const game = getGameById(req.gameType);
                let badgeClass = 'badge-warning';
                if (req.status === 'accepted') badgeClass = 'badge-success';
                if (req.status === 'declined') badgeClass = 'badge-danger';

                return (
                  <div key={req.id} className="request-card" style={{ marginBottom: '16px', padding: '16px' }}>
                    <div className="flex-between mb-sm">
                      <div className="flex gap-sm">
                        <span style={{ fontSize: '1.2rem' }}>{game?.icon}</span>
                        <span style={{ fontWeight: '600' }}>{isReceived ? 'From' : 'To'} {otherUser?.name || 'Unknown User'}</span>
                      </div>
                      <span className={`badge ${badgeClass}`}>{req.status}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      {new Date(req.createdAt).toLocaleDateString()} • {game?.name}
                    </div>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{req.message}"</p>
                  </div>
                );
              })
            ) : (
              <div className="card text-center" style={{ padding: '40px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
                <h3 style={{ marginBottom: '8px' }}>No requests yet</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
                  Start looking for partners and send them a request!
                </p>
                <Link href="/search" className="btn btn-primary btn-sm">Find Players</Link>
              </div>
            )}
            <Link href="/requests" style={{ display: 'block', textAlign: 'center', marginTop: '16px', color: 'var(--primary-light)', fontSize: '0.9rem' }}>
              View all requests →
            </Link>
          </div>

          <div>
            <h2 className="dashboard-section-title">Your Games</h2>
            {user.games.length > 0 ? (
              <div className="flex flex-col gap-sm">
                {user.games.map(gameId => {
                  const game = getGameById(gameId);
                  if (!game) return null;
                  return (
                    <div key={gameId} className="card flex-between" style={{ padding: '16px' }}>
                      <div className="flex gap-md">
                        <div style={{ fontSize: '2rem', background: 'var(--glass)', width: '48px', height: '48px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {game.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{game.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{game.type} • {game.players}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="card text-center" style={{ padding: '40px 20px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>You haven't selected any games yet.</p>
                <Link href="/profile" className="btn btn-outline btn-sm mt-md">Edit Profile</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
