import React, { useState } from 'react';
import { Stack, Button, Box, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const username = localStorage.getItem('username'); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [mobileMenuEl, setMobileMenuEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const handleMobileMenuOpen = (event) => {
    setMobileMenuEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuEl(null);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{ 
        position: 'sticky', 
        background: '#000', 
        top: 0, 
        justifyContent: 'space-between' 
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Responsive logo size */}
        <img src="/logo.png" alt="Logo" style={{ height: '60px', width: '120px', display: { xs: '50px', sm: '80px' } }} />
      </Link>
      
      {/* Responsive SearchBar with adjusted width for mobile */}
      <Box 
        sx={{ 
          display: { xs: searchOpen ? 'flex' : 'none', sm: 'flex' }, 
          flexGrow: 1, 
          justifyContent: 'center',
          width: { xs: '50%', sm: '70%' }  // Reduced width for mobile
        }}
      >
        <SearchBar />
      </Box>

      {/* Conditionally render SearchIcon only if SearchBar is hidden */}
      {!searchOpen && (
        <IconButton 
          sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <SearchIcon />
        </IconButton>
      )}

      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
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
              <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
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

      {/* Mobile view icon with white color */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
        <IconButton onClick={handleMobileMenuOpen} sx={{ color: 'white' }}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={mobileMenuEl}
          open={Boolean(mobileMenuEl)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {username ? (
            <>
              <MenuItem onClick={handleMobileMenuClose}>{username}</MenuItem>
              <MenuItem component={Link} to="/history">Watch History</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/login">Login</MenuItem>
              <MenuItem component={Link} to="/signup">Signup</MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Stack>
  );
};

export default Navbar;
