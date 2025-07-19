// In src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent route flicker on load
  const navigate = useNavigate();

  // On initial app load, check if a session cookie exists and is valid
  // In src/context/AuthContext.jsx

// This useEffect is the key to staying logged in across refreshes
useEffect(() => {
  // We'll call this function to check the cookie session
  const checkLoggedIn = async () => {
    try {
      // Make a request to a protected backend route.
      // The browser automatically sends the cookie.
      const response = await axios.get('/api/user/get-details'); 
      // If the request succeeds, the cookie is valid. Set the user state.
      setUser(response.data);
    } catch (err) {
      // If it fails, there is no valid session. User state remains null.
      console.log('No active session found.');
    } finally {
      // CRITICAL: Set loading to false after the check is complete.
      setLoading(false);
    }
  };

  checkLoggedIn();
}, []); // The empty array [] ensures this runs only once on app load.

  const login = async (email, password) => {
    // The backend will set the httpOnly cookie on successful login
    const response = await axios.post('/api/user/login', { email, password });
    
    // The response should contain the user object
    const { user } = response.data;
    if (user) {
      setUser(user);
      navigate('/');
    }
  };

  const register = async (name, email, password) => {
    await axios.post('/api/user/register', { name, email, password });
    navigate('/login');
  };

  const logout = async () => {
    // We must hit the backend logout endpoint to clear the cookie
    try {
      await axios.post('/api/users/logout'); // Make sure this endpoint exists on your backend
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  const value = { user, login, logout, register, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};