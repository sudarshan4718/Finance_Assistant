import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>💸 Welcome to Personal Finance Assistant</h1>
      <p>Track your income, manage your expenses, and visualize your spending habits.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/register" style={{ ...styles.button, backgroundColor: '#0099ff' }}>Register</Link>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#00cc88',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    margin: '0 10px',
  },
};

export default Home;
