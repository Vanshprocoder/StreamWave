import React, { useState } from 'react';
import { Stack, Button, Box, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const username = localStorage.getItem('username'); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const navigate = useNavigate(); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); 
    handleMenuClose(); 
    navigate('/login'); 
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{ position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between' }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" height="80" width="150" />
      </Link>
      <SearchBar />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {username ? (
          <>
            <Typography
              variant="h6"
              color="white"
              onClick={handleMenuOpen}
              sx={{ cursor: 'pointer' }}
            >
              Welcome, {username}
            </Typography>
           
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem>{username}</MenuItem>
              <MenuItem component={Link} to="/history">Watch History</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem> {/* Change color here */}
            </Menu>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Navbar;
