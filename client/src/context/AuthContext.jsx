import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ensure cookies are sent with every request
  axios.defaults.withCredentials = true;

  // Check authentication status on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/api/user/is-authenticated');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
      } finally {
        setLoading(false); // Stop blocking render
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const { user } = response.data;
      if (user) {
        setUser(user);
        navigate('/');
      }
    } catch (error) {
      throw error; // You can catch this in your login component
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post('/api/user/register', { name, email, password });
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/user/logout'); // Ensure backend clears the cookie
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
