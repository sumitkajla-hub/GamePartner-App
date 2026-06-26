'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GAMES, LOCATIONS, SKILL_LEVELS, AVAILABILITY_OPTIONS } from '@/lib/data';
import Footer from '@/components/Footer';

export default function Profile() {
  const { user, isAuthenticated, loading, updateProfile } = useAuth();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (user && !formData) {
      setFormData({
        name: user.name,
        phone: user.phone || '',
        location: user.location,
        preferredLocation: user.preferredLocation,
        bio: user.bio || '',
        skillLevel: user.skillLevel,
        games: [...user.games],
        availability: [...user.availability]
      });
    }
  }, [loading, isAuthenticated, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGame = (gameId) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      games: prev.games.includes(gameId) 
        ? prev.games.filter(id => id !== gameId)
        : [...prev.games, gameId]
    }));
  };

  const toggleAvailability = (option) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(opt => opt !== option)
        : [...prev.availability, option]
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.location || formData.games.length === 0) {
      return; // Basic validation
    }
    
    const result = updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
      setToast('Profile updated successfully!');
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading || !user || !formData) return <div className="loading-page"><div className="loading-spinner"></div></div>;

  return (
    <>
      <div className="profile-layout container animate-fade-in-up">
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="profile-info" style={{ flex: 1 }}>
            <div className="flex-between flex-wrap gap-sm">
              <h1>{user.name}</h1>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-sm">Edit Profile</button>
              ) : (
                <div className="flex gap-sm">
                  <button onClick={() => {
                    setIsEditing(false);
                    setFormData({ ...user }); // Reset
                  }} className="btn btn-secondary btn-sm">Cancel</button>
                  <button onClick={handleSave} className="btn btn-primary btn-sm">Save Changes</button>
                </div>
              )}
            </div>
            <p>📧 {user.email} &nbsp;•&nbsp; 🗓️ Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
            <div className="mt-sm flex gap-sm">
              <span className={`player-skill skill-${user.skillLevel.toLowerCase()}`}>{user.skillLevel}</span>
              <span className="badge badge-primary">🎮 {user.matchesPlayed || 0} Matches Played</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="profile-section-title">Personal Details</h2>
          <div className="profile-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              {isEditing ? (
                <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} />
              ) : (
                <div className="form-input" style={{ background: 'transparent', borderColor: 'transparent', padding: '12px 0' }}>{user.name}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              {isEditing ? (
                <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
              ) : (
                <div className="form-input" style={{ background: 'transparent', borderColor: 'transparent', padding: '12px 0' }}>{user.phone || 'Not provided'}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Location / Area</label>
              {isEditing ? (
                <input type="text" name="location" className="form-input" value={formData.location} onChange={handleChange} />
              ) : (
                <div className="form-input" style={{ background: 'transparent', borderColor: 'transparent', padding: '12px 0' }}>{user.location}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Playing Spot</label>
              {isEditing ? (
                <select name="preferredLocation" className="form-select" value={formData.preferredLocation} onChange={handleChange}>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              ) : (
                <div className="form-input" style={{ background: 'transparent', borderColor: 'transparent', padding: '12px 0' }}>{user.preferredLocation}</div>
              )}
            </div>
          </div>
          
          <div className="form-group mt-md">
            <label className="form-label">About Me (Bio)</label>
            {isEditing ? (
              <textarea name="bio" className="form-textarea" value={formData.bio} onChange={handleChange} style={{ minHeight: '100px' }} />
            ) : (
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                {user.bio || 'No bio provided.'}
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <div className="flex-between mb-md">
            <h2 className="profile-section-title" style={{ border: 'none', margin: 0, padding: 0 }}>Games & Skill</h2>
            {isEditing && (
              <select name="skillLevel" className="form-select" style={{ width: 'auto', padding: '8px 36px 8px 16px' }} value={formData.skillLevel} onChange={handleChange}>
                {SKILL_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            )}
          </div>
          
          <div className="auth-games-select" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {GAMES.map(game => {
              const isSelected = isEditing ? formData.games.includes(game.id) : user.games.includes(game.id);
              if (!isEditing && !isSelected) return null; // Only show selected when not editing
              
              return (
                <div 
                  key={game.id} 
                  className={`auth-game-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleGame(game.id)}
                  style={{ cursor: isEditing ? 'pointer' : 'default', opacity: (!isEditing && !isSelected) ? 0.5 : 1 }}
                >
                  <span className="auth-game-option-icon">{game.icon}</span>
                  {game.name}
                </div>
              );
            })}
          </div>
        </div>

        <div className="profile-section mb-lg">
          <h2 className="profile-section-title">Availability</h2>
          <div className="availability-tags">
            {AVAILABILITY_OPTIONS.map(opt => {
              const isSelected = isEditing ? formData.availability.includes(opt) : user.availability.includes(opt);
              if (!isEditing && !isSelected) return null;
              
              return (
                <span 
                  key={opt}
                  onClick={() => toggleAvailability(opt)}
                  style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.9rem',
                    cursor: isEditing ? 'pointer' : 'default', transition: 'var(--transition)',
                    background: isSelected ? 'var(--primary)' : 'var(--glass)',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`
                  }}
                >
                  {opt}
                </span>
              );
            })}
          </div>
        </div>
      </div>

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
