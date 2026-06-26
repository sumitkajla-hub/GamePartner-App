'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGameCategories } from '@/lib/data';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(getGameCategories());
  }, []);

  const features = [
    {
      icon: '📍',
      title: 'Location-Based Search',
      description: 'Find players in your neighborhood, society, or nearby sports complexes. No more searching far and wide.',
      iconClass: 'feature-icon',
    },
    {
      icon: '🤝',
      title: 'Smart Matchmaking',
      description: 'Our algorithm matches you with players based on skill level, game preferences, and availability.',
      iconClass: 'feature-icon feature-icon-accent',
    },
    {
      icon: '👥',
      title: 'Community Groups',
      description: 'Join local communities, organize tournaments, and build lasting friendships through sports.',
      iconClass: 'feature-icon feature-icon-warning',
    },
    {
      icon: '📅',
      title: 'Flexible Scheduling',
      description: 'Set your availability and find partners who match your schedule. Morning, evening, or weekends.',
      iconClass: 'feature-icon',
    },
    {
      icon: '🏆',
      title: 'Skill-Based Matching',
      description: 'Whether you\'re a beginner or advanced player, find opponents at your level for the best experience.',
      iconClass: 'feature-icon feature-icon-accent',
    },
    {
      icon: '📊',
      title: 'Play History Tracking',
      description: 'Track your matches, see your stats, and watch your progress grow over time.',
      iconClass: 'feature-icon feature-icon-warning',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Sign up and tell us about your favorite games, skill level, and when you\'re available to play.',
    },
    {
      number: 2,
      title: 'Select Your Games',
      description: 'Choose from Chess, Badminton, Cricket, Table Tennis, and many more indoor and outdoor games.',
    },
    {
      number: 3,
      title: 'Find Partners',
      description: 'Search for nearby players, filter by game, location, skill level, and send play requests instantly.',
    },
    {
      number: 4,
      title: 'Play Together',
      description: 'Meet up, play your favorite games, track your matches, and build your local sports community!',
    },
  ];



  return (
    <main>
      {/* =============== HERO SECTION =============== */}
      <section className="hero" id="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge" id="hero-badge">
            <span>🎮</span>
            <span>Your Local Sports Network</span>
          </div>

          <h1 className="hero-title" id="hero-title">
            Find Your Perfect{' '}
            <span className="hero-title-gradient">Game Partner</span>
          </h1>

          <p className="hero-subtitle" id="hero-subtitle">
            Connect with nearby players for indoor and outdoor games. From Chess to Cricket,
            find partners who match your skill level, schedule, and passion for sports.
          </p>

          <div className="hero-actions" id="hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg" id="hero-cta-register">
              Get Started 🚀
            </Link>
            <a href="#games-section" className="btn btn-secondary btn-lg" id="hero-cta-learn">
              Learn More ↓
            </a>
          </div>


        </div>
      </section>

      {/* =============== GAMES SECTION =============== */}
      <section className="section section-dark" id="games-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🎯 Available Games</span>
            <h2 className="section-title" id="games-title">
              Choose Your <span className="text-gradient">Favorite Game</span>
            </h2>
            <p className="section-description">
              From classic indoor board games to thrilling outdoor sports — find partners for every game you love.
            </p>
          </div>

          <div className="games-grid" id="games-grid">
            {games.map((game, index) => (
              <div
                className="game-card"
                key={game.id}
                id={`game-card-${game.id}`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                }}
              >
                <span className="game-card-icon">{game.icon}</span>
                <h3 className="game-card-name">{game.name}</h3>
                <p className="game-card-players">{game.players}</p>
                <span className="game-card-type">{game.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== HOW IT WORKS SECTION =============== */}
      <section className="section" id="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">✨ Simple Process</span>
            <h2 className="section-title" id="how-it-works-title">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="section-description">
              Getting started is easy. Follow these four simple steps and start playing today.
            </p>
          </div>

          <div className="steps-container" id="steps-container">
            {steps.map((step, index) => (
              <div
                className="step-item"
                key={step.number}
                id={`step-${step.number}`}
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${0.2 * index}s both`,
                }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FEATURES SECTION =============== */}
      <section className="section section-dark" id="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🚀 Platform Features</span>
            <h2 className="section-title" id="features-title">
              Everything You Need to{' '}
              <span className="text-gradient">Play More</span>
            </h2>
            <p className="section-description">
              Packed with powerful features to make finding and connecting with game partners effortless.
            </p>
          </div>

          <div className="features-grid" id="features-grid">
            {features.map((feature, index) => (
              <div
                className="feature-card card-glow"
                key={feature.title}
                id={`feature-card-${index}`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                }}
              >
                <div className={feature.iconClass}>
                  <span>{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =============== CTA SECTION =============== */}
      <section className="cta-section" id="cta-section">
        <div className="cta-content" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <h2 className="cta-title" id="cta-title">
            Ready to Find Your{' '}
            <span className="text-gradient">Game Partner?</span>
          </h2>
          <p className="cta-description" id="cta-description">
            Join hundreds of players already connecting through GamePartner.
            Create your free profile today and never play alone again.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-primary btn-lg" id="cta-register-btn">
              Create Free Account 🎮
            </Link>
            <Link href="/search" className="btn btn-outline btn-lg" id="cta-search-btn">
              Browse Players
            </Link>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <Footer />
    </main>
  );
}
