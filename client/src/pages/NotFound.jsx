import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! Looks like this page doesn't exist.</p>
      <Link to="/" style={styles.link}>Go to Home</Link>
    </div>
  );
};

const styles = {
  link: {
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: '5px',
  },
};

export default NotFound;
