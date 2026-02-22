// components/Navbar.jsx
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setSidebarOpen, onLogout, sidebarWidth }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/handyhub/login");
    if (onLogout) onLogout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundImage: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, lg: 4 },
          height: 64,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: menu + title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={() => setSidebarOpen((prev) => !prev)}
            sx={{ display: { lg: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            LocalPro+
          </Typography>
        </Box>

        {/* Right: actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" size="small">
            <NotificationsNoneIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            aria-controls={anchorEl ? 'settings-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={handleSettingsClick}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSettingsClose}
            PaperProps={{ elevation: 3, sx: { width: 160 } }}
          >
            <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
              <LogoutIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>

          <Avatar
            alt="User Avatar"
            src="https://i.pravatar.cc/150?img=32"
            sx={{
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'white',
                boxShadow: '0 0 10px rgba(255,255,255,0.3)',
              }
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
