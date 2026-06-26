'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'navbar-link active' : 'navbar-link';

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" id="navbar-logo">
          <span className="navbar-logo-icon">🎮</span>
          GamePartner
        </Link>

        {isAuthenticated && (
          <div className="navbar-nav" id="navbar-nav">
            <Link href="/dashboard" className={isActive('/dashboard')} id="nav-dashboard">
              Dashboard
            </Link>
            <Link href="/search" className={isActive('/search')} id="nav-search">
              Find Players
            </Link>
            <Link href="/requests" className={isActive('/requests')} id="nav-requests">
              Requests
            </Link>
            <Link href="/community" className={isActive('/community')} id="nav-community">
              Community
            </Link>
            <Link href="/history" className={isActive('/history')} id="nav-history">
              History
            </Link>
            {isAdmin && (
              <Link href="/admin" className={isActive('/admin')} id="nav-admin">
                ⚙️ Admin
              </Link>
            )}
          </div>
        )}

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="btn btn-secondary btn-sm" id="nav-profile-btn">
                👤 {user?.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm" id="nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm" id="nav-login-btn">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm" id="nav-register-btn">
                Get Started
              </Link>
            </>
          )}

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobile-menu">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className={isActive('/dashboard')} onClick={() => setMobileMenuOpen(false)}>
              📊 Dashboard
            </Link>
            <Link href="/search" className={isActive('/search')} onClick={() => setMobileMenuOpen(false)}>
              🔍 Find Players
            </Link>
            <Link href="/requests" className={isActive('/requests')} onClick={() => setMobileMenuOpen(false)}>
              📩 Requests
            </Link>
            <Link href="/community" className={isActive('/community')} onClick={() => setMobileMenuOpen(false)}>
              👥 Community
            </Link>
            <Link href="/history" className={isActive('/history')} onClick={() => setMobileMenuOpen(false)}>
              📋 History
            </Link>
            <Link href="/profile" className={isActive('/profile')} onClick={() => setMobileMenuOpen(false)}>
              👤 Profile
            </Link>
            {isAdmin && (
              <Link href="/admin" className={isActive('/admin')} onClick={() => setMobileMenuOpen(false)}>
                ⚙️ Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="navbar-link" style={{ textAlign: 'left', width: '100%' }}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Sign In
            </Link>
            <Link href="/register" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
