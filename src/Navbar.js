// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="primary" sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo512.png" 
              alt="Logo" 
              style={{ 
                height: '40px', 
                marginRight: theme.spacing(2),
                filter: darkMode ? 'invert(1)' : 'none'
              }} 
            />
            <Typography variant="h6" component="div">
              El Madani Chafik Maths
            </Typography>
          </Link>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
          }
          label="Mode Sombre"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
