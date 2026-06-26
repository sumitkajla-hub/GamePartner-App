'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authenticateUser, createUser, updateUser, getUserById } from '@/lib/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    try {
      const storedUserId = localStorage.getItem('gp_currentUser');
      if (storedUserId) {
        const userData = getUserById(storedUserId);
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem('gp_currentUser');
        }
      }
    } catch (e) {
      console.error('Auth init error:', e);
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const userData = authenticateUser(email, password);
    if (userData) {
      setUser(userData);
      localStorage.setItem('gp_currentUser', userData.id);
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const register = useCallback((userData) => {
    try {
      const newUser = createUser(userData);
      setUser(newUser);
      localStorage.setItem('gp_currentUser', newUser.id);
      return { success: true, user: newUser };
    } catch (e) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gp_currentUser');
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return { success: false, error: 'Not logged in' };
    const updated = updateUser(user.id, updates);
    if (updated) {
      setUser(updated);
      return { success: true, user: updated };
    }
    return { success: false, error: 'Update failed' };
  }, [user]);

  const refreshUser = useCallback(() => {
    if (!user) return;
    const fresh = getUserById(user.id);
    if (fresh) setUser(fresh);
  }, [user]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
