import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout'); // adjust route if needed
      setUser(null);
      navigate('/login');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>💰 Personal Finance</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.username}>Hi, {user.name || user.email}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '1rem 2rem',
    backgroundColor: '#222',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#00ff99',
    fontWeight: 'bold',
    fontSize: '20px',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  username: {
    color: '#ccc',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#ff5555',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default Navbar;
