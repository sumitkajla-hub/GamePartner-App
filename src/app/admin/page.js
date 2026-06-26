'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getAdminStats, getUsers, deleteUser, getAllPlayRequests, getUserById, getGameById, resetData, GAMES } from '@/lib/data';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'admin') {
        router.push('/dashboard');
      } else {
        loadData();
      }
    }
  }, [loading, isAuthenticated, user, router]);

  const loadData = () => {
    setStats(getAdminStats());
    setUsersList(getUsers().filter(u => u.role !== 'admin'));
    setRequestsList(getAllPlayRequests().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      loadData();
    }
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: This will reset ALL data to defaults. Are you sure?')) {
      resetData();
      loadData();
      alert('Data reset successfully.');
    }
  };

  if (loading || !user || user.role !== 'admin' || !stats) {
    return <div className="loading-page"><div className="loading-spinner"></div></div>;
  }

  return (
    <>
      <div className="admin-layout container animate-fade-in-up">
        <div className="admin-header">
          <div>
            <h1 className="search-title">Admin Dashboard</h1>
            <p className="search-subtitle">Platform overview and management.</p>
          </div>
          <button onClick={handleResetData} className="btn btn-danger">⚠️ Reset System Data</button>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users ({usersList.length})</button>
          <button className={`tab ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>Requests ({requestsList.length})</button>
        </div>

        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="admin-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.totalUsers}</div>
                <div className="admin-stat-label">Total Users</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.activeUsers}</div>
                <div className="admin-stat-label">Active Users</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.totalRequests}</div>
                <div className="admin-stat-label">Total Requests</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.matchRate}%</div>
                <div className="admin-stat-label">Match Rate</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.totalCommunities}</div>
                <div className="admin-stat-label">Communities</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-value">{stats.totalGames}</div>
                <div className="admin-stat-label">Supported Games</div>
              </div>
            </div>

            <div className="dashboard-grid mt-lg">
              <div className="card">
                <h2 className="profile-section-title">Game Popularity</h2>
                <div className="flex flex-col gap-sm mt-md">
                  {Object.entries(stats.gamePopularity)
                    .sort((a, b) => b[1] - a[1])
                    .map(([gameId, count]) => {
                      const game = getGameById(gameId);
                      if (!game) return null;
                      const maxCount = Math.max(...Object.values(stats.gamePopularity));
                      const width = `${(count / maxCount) * 100}%`;
                      return (
                        <div key={gameId} className="mb-sm">
                          <div className="flex-between mb-sm text-sm">
                            <span>{game.icon} {game.name}</span>
                            <span className="text-muted">{count} players</span>
                          </div>
                          <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width, background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }}></div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
              
              <div className="card">
                <h2 className="profile-section-title">Top Locations</h2>
                <div className="flex flex-col gap-sm mt-md">
                  {Object.entries(stats.locationDist)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 8)
                    .map(([loc, count], idx) => (
                      <div key={idx} className="flex-between p-sm border-b" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                        <span>📍 {loc}</span>
                        <span className="badge badge-primary">{count} users</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-table-container animate-fade-in">
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Location</th>
                    <th>Games</th>
                    <th>Skill</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: '600' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </td>
                      <td>{u.location}</td>
                      <td>{u.games.length} games</td>
                      <td><span className={`player-skill skill-${u.skillLevel.toLowerCase()}`}>{u.skillLevel}</span></td>
                      <td>
                        <div className="flex items-center gap-sm">
                          <div className={u.isOnline ? 'online-dot' : 'offline-dot'}></div>
                          <span>{u.isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteUser(u.id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="admin-table-container animate-fade-in">
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Game</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsList.map(req => {
                    const from = getUserById(req.fromUserId);
                    const to = getUserById(req.toUserId);
                    const game = getGameById(req.gameType);
                    let badgeClass = 'badge-warning';
                    if (req.status === 'accepted') badgeClass = 'badge-success';
                    if (req.status === 'declined') badgeClass = 'badge-danger';

                    return (
                      <tr key={req.id}>
                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td>{from?.name || 'Deleted User'}</td>
                        <td>{to?.name || 'Deleted User'}</td>
                        <td>{game?.icon} {game?.name}</td>
                        <td><span className={`badge ${badgeClass}`}>{req.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
