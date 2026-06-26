'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleDemoLogin = () => {
    setEmail('aarav@example.com');
    setPassword('password123');
  };

  const handleAdminLogin = () => {
    setEmail('admin@gamepartner.com');
    setPassword('admin123');
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🎮</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to find your next game partner</p>
        </div>

        {error && (
          <div className="mb-md" style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: 'var(--radius)', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" id="login-submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="flex flex-col gap-sm">
          <button onClick={handleDemoLogin} className="btn btn-secondary w-full" id="demo-login-btn">
            Use Demo Account
          </button>
          <button onClick={handleAdminLogin} className="btn btn-outline w-full" id="admin-login-btn">
            Use Admin Account
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link href="/register" id="link-register">Create one</Link>
        </div>
      </div>
    </div>
  );
}
