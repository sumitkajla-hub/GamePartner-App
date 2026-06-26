'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getPlayHistory, getUserById, getGameById } from '@/lib/data';
import Footer from '@/components/Footer';

export default function History() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, uniquePartners: 0, topGame: '-' });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      const hist = getPlayHistory(user.id);
      // Sort by newest first based on createdAt since we don't track completion date yet
      hist.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setHistory(hist);

      // Calculate stats
      const partners = new Set();
      const gameCounts = {};
      
      hist.forEach(req => {
        const partnerId = req.fromUserId === user.id ? req.toUserId : req.fromUserId;
        partners.add(partnerId);
        gameCounts[req.gameType] = (gameCounts[req.gameType] || 0) + 1;
      });

      let topG = '-';
      let maxCount = 0;
      for (const [game, count] of Object.entries(gameCounts)) {
        if (count > maxCount) {
          maxCount = count;
          topG = getGameById(game)?.name || game;
        }
      }

      setStats({
        total: hist.length,
        uniquePartners: partners.size,
        topGame: topG
      });
    }
  }, [user]);

  if (loading || !user) return <div className="loading-page"><div className="loading-spinner"></div></div>;

  return (
    <>
      <div className="container" style={{ paddingTop: '92px', minHeight: '100vh', paddingBottom: '64px' }}>
        <div className="dashboard-header animate-fade-in-up">
          <h1 className="search-title">Play History</h1>
          <p className="search-subtitle">Look back at all your past matches and games.</p>
        </div>

        <div className="dashboard-stats mb-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card">
            <div className="stat-icon stat-icon-primary">🎮</div>
            <div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Matches</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-accent">👥</div>
            <div>
              <div className="stat-value">{stats.uniquePartners}</div>
              <div className="stat-label">Unique Partners</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-warning">🏆</div>
            <div>
              <div className="stat-value" style={{ fontSize: '1.4rem' }}>{stats.topGame}</div>
              <div className="stat-label">Most Played Game</div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {history.length > 0 ? (
            history.map((match, idx) => {
              const isSender = match.fromUserId === user.id;
              const partnerId = isSender ? match.toUserId : match.fromUserId;
              const partner = getUserById(partnerId);
              const game = getGameById(match.gameType);
              
              return (
                <div key={match.id} className="history-card" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="history-card-left">
                    <div className="history-game-icon">{game?.icon}</div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{game?.name}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>with {partner?.name || 'Unknown'}</div>
                    </div>
                  </div>
                  <div className="history-card-right">
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        📅 {new Date(match.preferredDate).toLocaleDateString()} • {match.preferredTime}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        📍 {match.location}
                      </div>
                    </div>
                    <span className="badge badge-success" style={{ padding: '6px 12px' }}>Completed</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state card">
              <div className="empty-state-icon">📋</div>
              <h3 className="empty-state-title">No history yet</h3>
              <p className="empty-state-description">Your completed matches will appear here once you accept requests and play!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
