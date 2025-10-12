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
    navigate("/login");
    if (onLogout) onLogout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#1f2937",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, lg: 8 },
          ml: { lg: `${sidebarWidth}px` }, // dynamic left margin
          height: 64,
          transition: (theme) =>
            theme.transitions.create(['margin'], { duration: theme.transitions.duration.shorter }),
        }}
      >
        {/* Left: menu + title */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={() => setSidebarOpen((prev) => !prev)}
            sx={{ display: { lg: 'none' }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: "#fff" }}>
            HandyHub
          </Typography>
        </Box>

        {/* Right: actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-controls={anchorEl ? 'settings-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
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
              width: 36,
              height: 36,
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
