'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { searchPlayers, GAMES, LOCATIONS, SKILL_LEVELS, AVAILABILITY_OPTIONS, sendPlayRequest, getGameById } from '@/lib/data';
import Footer from '@/components/Footer';

export default function Search() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ game: '', location: '', skillLevel: '', availability: '' });
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [requestData, setRequestData] = useState({ gameType: '', message: '', preferredDate: '', preferredTime: '', location: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      handleSearch();
    }
  }, [user]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    if (!user) return;
    const players = searchPlayers({ ...filters, excludeUserId: user.id });
    setResults(players);
  };

  const clearFilters = () => {
    setFilters({ game: '', location: '', skillLevel: '', availability: '' });
    if (user) {
      setResults(searchPlayers({ excludeUserId: user.id }));
    }
  };

  const openRequestModal = (player) => {
    setSelectedUser(player);
    // Auto-select first common game if any
    const commonGames = player.games.filter(g => user.games.includes(g));
    setRequestData({
      gameType: commonGames.length > 0 ? commonGames[0] : player.games[0],
      message: `Hi ${player.name.split(' ')[0]}! Would you like to play a game?`,
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      preferredTime: '17:00',
      location: player.preferredLocation
    });
    setModalOpen(true);
  };

  const handleSendRequest = () => {
    if (!requestData.gameType || !requestData.preferredDate || !requestData.preferredTime || !requestData.location) {
      return; // Basic validation
    }
    
    sendPlayRequest(
      user.id,
      selectedUser.id,
      requestData.gameType,
      requestData.message,
      requestData.preferredDate,
      requestData.preferredTime,
      requestData.location
    );
    
    setModalOpen(false);
    setToast(`Play request sent to ${selectedUser.name}!`);
    setTimeout(() => setToast(null), 3000);
  };

  if (loading || !user) return <div className="loading-page"><div className="loading-spinner"></div></div>;

  return (
    <>
      <div className="search-layout container animate-fade-in-up">
        <div className="search-header">
          <h1 className="search-title">Find Players</h1>
          <p className="search-subtitle">Connect with people nearby who share your game interests.</p>
        </div>

        <div className="search-filters">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Game</label>
            <select name="game" value={filters.game} onChange={handleFilterChange} className="form-select">
              <option value="">All Games</option>
              {GAMES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Location/Area</label>
            <input type="text" name="location" value={filters.location} onChange={handleFilterChange} placeholder="e.g. Pune" className="form-input" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Skill Level</label>
            <select name="skillLevel" value={filters.skillLevel} onChange={handleFilterChange} className="form-select">
              <option value="">All Levels</option>
              {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Availability</label>
            <select name="availability" value={filters.availability} onChange={handleFilterChange} className="form-select">
              <option value="">Any Time</option>
              {AVAILABILITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex gap-sm">
            <button onClick={handleSearch} className="btn btn-primary" style={{ flex: 1 }}>Search</button>
            <button onClick={clearFilters} className="btn btn-secondary">Clear</button>
          </div>
        </div>

        <div className="search-results-header">
          <h2 style={{ fontSize: '1.2rem' }}>Results</h2>
          <span className="search-results-count">{results.length} players found</span>
        </div>

        {results.length > 0 ? (
          <div className="players-grid">
            {results.map((player, idx) => (
              <div key={player.id} className="player-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="player-card-header">
                  <div className={`player-avatar player-avatar-${idx % 3 === 0 ? 'green' : idx % 2 === 0 ? 'warm' : 'cool'}`}>
                    {player.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="player-info">
                    <div className="flex-between">
                      <h3 className="player-name">{player.name}</h3>
                      <div className={player.isOnline ? 'online-dot' : 'offline-dot'} title={player.isOnline ? 'Online' : 'Offline'}></div>
                    </div>
                    <div className="player-location">📍 {player.location}</div>
                  </div>
                </div>

                <div className="player-meta">
                  <span className={`player-skill skill-${player.skillLevel.toLowerCase()}`}>{player.skillLevel}</span>
                  <span className="player-meta-item">🎮 {player.matchesPlayed} matches</span>
                </div>

                <div className="player-games">
                  {player.games.slice(0, 4).map(gameId => {
                    const game = getGameById(gameId);
                    return game ? <span key={gameId} className="player-game-tag" title={game.name}>{game.icon} {game.name}</span> : null;
                  })}
                  {player.games.length > 4 && <span className="player-game-tag">+{player.games.length - 4}</span>}
                </div>

                <div className="availability-tags mb-md">
                  {player.availability.slice(0, 3).map((a, i) => <span key={i} className="availability-tag">{a}</span>)}
                </div>

                <button onClick={() => openRequestModal(player)} className="btn btn-primary w-full">Send Request</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No players found</h3>
            <p className="empty-state-description">Try adjusting your filters to find more players in your area.</p>
            <button onClick={clearFilters} className="btn btn-primary mt-md">Clear Filters</button>
          </div>
        )}
      </div>

      {modalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Play with {selectedUser.name}</h3>
              <button onClick={() => setModalOpen(false)} className="modal-close">×</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Game</label>
              <select 
                className="form-select" 
                value={requestData.gameType} 
                onChange={e => setRequestData({...requestData, gameType: e.target.value})}
              >
                {selectedUser.games.map(gid => {
                  const g = getGameById(gid);
                  return <option key={gid} value={gid}>{g?.icon} {g?.name}</option>;
                })}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                className="form-textarea" 
                value={requestData.message} 
                onChange={e => setRequestData({...requestData, message: e.target.value})}
                style={{ minHeight: '80px' }}
              />
            </div>
            
            <div className="flex gap-md">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={requestData.preferredDate} 
                  onChange={e => setRequestData({...requestData, preferredDate: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Time</label>
                <input 
                  type="time" 
                  className="form-input" 
                  value={requestData.preferredTime} 
                  onChange={e => setRequestData({...requestData, preferredTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-group mb-0">
              <label className="form-label">Location</label>
              <select 
                className="form-select" 
                value={requestData.location} 
                onChange={e => setRequestData({...requestData, location: e.target.value})}
              >
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            
            <div className="modal-footer">
              <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSendRequest} className="btn btn-primary">Send Request</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast toast-success">
          <span className="toast-icon">✅</span>
          <span className="toast-message">{toast}</span>
        </div>
      )}

      <Footer />
    </>
  );
}
