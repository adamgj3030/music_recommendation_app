import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Login: React.FC = () => {
  const handleLogin = () => {
    // Adjust the backend URL and port if necessary.
    window.location.href = 'http://localhost:5000/auth/spotify';
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login with Spotify
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with Spotify
      </Button>
    </Container>
  );
};

export default Login;
