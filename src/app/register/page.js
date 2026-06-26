'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GAMES, LOCATIONS, SKILL_LEVELS, AVAILABILITY_OPTIONS } from '@/lib/data';

export default function Register() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    preferredLocation: LOCATIONS[0],
    games: [],
    skillLevel: SKILL_LEVELS[0],
    availability: [],
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGame = (gameId) => {
    setFormData(prev => {
      if (prev.games.includes(gameId)) {
        return { ...prev, games: prev.games.filter(id => id !== gameId) };
      } else {
        return { ...prev, games: [...prev.games, gameId] };
      }
    });
  };

  const toggleAvailability = (option) => {
    setFormData(prev => {
      if (prev.availability.includes(option)) {
        return { ...prev, availability: prev.availability.filter(opt => opt !== option) };
      } else {
        return { ...prev, availability: [...prev.availability, option] };
      }
    });
  };

  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.location) {
        setError('Please fill in all required fields');
        return false;
      }
    } else if (step === 2) {
      if (formData.games.length === 0) {
        setError('Please select at least one game');
        return false;
      }
    } else if (step === 3) {
      if (formData.availability.length === 0) {
        setError('Please select at least one availability slot');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      const result = register(formData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="auth-layout" style={{ padding: '60px 24px' }}>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header" style={{ marginBottom: '24px' }}>
          <div className="auth-logo">🎮</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the local sports community</p>
        </div>

        {/* Step Indicator */}
        <div className="flex-between mb-lg" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border)', zIndex: 0 }} />
          {[1, 2, 3].map(num => (
            <div key={num} style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: step >= num ? 'var(--primary)' : 'var(--bg-secondary)',
              border: `2px solid ${step >= num ? 'var(--primary)' : 'var(--border)'}`,
              color: step >= num ? 'white' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '600', zIndex: 1, transition: 'var(--transition)'
            }}>
              {num}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-md" style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: 'var(--radius)', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div className="form-content">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="mb-md" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Personal Information</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password *</label>
                <input type="password" id="password" name="password" className="form-input" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
                <input type="tel" id="phone" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="location">Your Location/Area *</label>
                <input type="text" id="location" name="location" className="form-input" value={formData.location} onChange={handleChange} placeholder="e.g. Sector 62, Noida" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="mb-md" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Game Preferences</h3>
              <div className="form-group">
                <label className="form-label">Select Games You Play *</label>
                <div className="auth-games-select">
                  {GAMES.map(game => (
                    <div 
                      key={game.id} 
                      className={`auth-game-option ${formData.games.includes(game.id) ? 'selected' : ''}`}
                      onClick={() => toggleGame(game.id)}
                    >
                      <span className="auth-game-option-icon">{game.icon}</span>
                      {game.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group mt-lg">
                <label className="form-label" htmlFor="skillLevel">Overall Skill Level *</label>
                <select id="skillLevel" name="skillLevel" className="form-select" value={formData.skillLevel} onChange={handleChange}>
                  {SKILL_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="preferredLocation">Preferred Playing Location *</label>
                <select id="preferredLocation" name="preferredLocation" className="form-select" value={formData.preferredLocation} onChange={handleChange}>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="mb-md" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Availability & Bio</h3>
              <div className="form-group">
                <label className="form-label">When do you usually play? *</label>
                <div className="availability-tags" style={{ gap: '8px' }}>
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <span 
                      key={opt}
                      onClick={() => toggleAvailability(opt)}
                      style={{
                        padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem',
                        cursor: 'pointer', transition: 'var(--transition)',
                        background: formData.availability.includes(opt) ? 'var(--primary)' : 'var(--glass)',
                        color: formData.availability.includes(opt) ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${formData.availability.includes(opt) ? 'var(--primary)' : 'var(--border)'}`
                      }}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group mt-lg">
                <label className="form-label" htmlFor="bio">Short Bio</label>
                <textarea 
                  id="bio" name="bio" className="form-textarea" 
                  value={formData.bio} onChange={handleChange} 
                  placeholder="Tell others a bit about yourself and what kind of games you're looking for..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex-between mt-lg pt-md" style={{ borderTop: '1px solid var(--border)' }}>
          {step > 1 ? (
            <button onClick={handleBack} className="btn btn-secondary">Back</button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button onClick={handleNext} className="btn btn-primary">Next Step</button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary">Create Account</button>
          )}
        </div>

        {step === 1 && (
          <div className="auth-footer mt-md">
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
