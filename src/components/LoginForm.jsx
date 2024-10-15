import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // Fetch all users from Firebase Realtime Database
      const response = await fetch(`${process.env.REACT_APP_FIREBASE_DB_URL}/UserData.json`);
      const data = await response.json();

      // Check if username exists and password matches
      const user = Object.values(data).find(user => user.name === username && user.password === password);

      if (user) {
        // Store the username in localStorage to use it in the Navbar
        localStorage.setItem('username', username);
        alert('Login successful!');
        navigate('/'); // Redirect to homepage
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'url(path_to_your_background_image.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 300,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Box display="flex" justifyContent="space-between">
          <Link href="#" variant="body2">
            Forgot Password?
          </Link>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
