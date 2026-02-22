import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import {
  Home,
  Settings,
  People,
  Category,
  Bookmarks,
  VerifiedUser,
  TrendingUp,
  Star,
} from '@mui/icons-material';

const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
  <Card sx={{
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: 4,
      '& .stat-icon-box': {
        transform: 'scale(1.15)',
      },
    },
  }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          className="stat-icon-box"
          sx={{
            bgcolor: `${color}.100`,
            p: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Icon sx={{ color: `${color}.main`, fontSize: 28 }} />
        </Box>
        <Box>
          <Typography color="textSecondary" variant="body2" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ServiceCard = ({ name, icon, description, color }) => (
  <Card sx={{ 
    cursor: 'pointer', 
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 16px 32px rgba(249, 115, 22, 0.15)',
      '& .service-icon': {
        transform: 'scale(1.1) rotate(-5deg)',
      },
    },
  }}>
    <CardContent sx={{ textAlign: 'center', py: 3, pb: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box 
        className="service-icon"
        sx={{ 
          fontSize: 48, 
          mb: 2,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, flex: 1 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('USER');

  useEffect(() => {
    const roles = localStorage.getItem('roles');
    if (roles) {
      const roleList = JSON.parse(roles);
      setUserRole(roleList[0] || 'USER');
    }
  }, []);

  const stats = [
    { icon: Category, label: 'Active Services', value: '150+', color: 'primary' },
    { icon: People, label: 'Expert Workers', value: '2.5K', color: 'secondary' },
    { icon: TrendingUp, label: 'Completed Jobs', value: '10K+', color: 'success' },
    { icon: Star, label: 'Avg Rating', value: '4.8★', color: 'warning' },
  ];

  const featuredServices = [
    { id: 1, name: 'Plumbing', icon: '🔧', description: 'Expert plumbers for all your needs' },
    { id: 2, name: 'Electrical', icon: '⚡', description: 'Professional electrical services' },
    { id: 3, name: 'Cleaning', icon: '🧹', description: 'Deep cleaning and maintenance' },
    { id: 4, name: 'Carpentry', icon: '🔨', description: 'Furniture and wood work' },
  ];

  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      {/* Welcome Section */}
      <Paper sx={{ 
        p: { xs: 3, sm: 4 }, 
        mb: 4, 
        backgroundImage: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
        color: 'white',
        borderRadius: 2,
        boxShadow: '0 10px 30px rgba(249, 115, 22, 0.2)',
        animation: 'fadeIn 0.6s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to LocalPro+
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Discover verified local professionals for any service. From plumbing to cleaning, find experts in your area.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Button
            variant="contained"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main', 
              fontWeight: 600,
              transition: 'all 0.2s ease',
              '&:hover': { 
                bgcolor: '#f0f0f0',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              } 
            }}
            onClick={() => navigate('/handyhub/browse/categories')}
          >
            Browse Services
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={idx}
            sx={{
              animation: `fadeIn 0.6s ease-in-out ${idx * 0.1}s both`,
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Featured Services */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' }, justifyContent: 'space-between', mb: 3, gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Popular Services
          </Typography>
          <Button
            size="small"
            onClick={() => navigate('/handyhub/browse/categories')}
            sx={{ 
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateX(4px)',
              },
            }}
          >
            View All →
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featuredServices.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.id}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Admin Dashboard */}
      {userRole === 'ADMIN' && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Admin Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4}
              sx={{
                animation: 'fadeIn 0.6s ease-in-out 0.3s both',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Card sx={{
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                  '& .admin-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box 
                      className="admin-icon"
                      sx={{ 
                        bgcolor: 'primary.100', 
                        p: 1.5, 
                        borderRadius: 1,
                        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <People sx={{ color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Manage Employees
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        View and manage user accounts
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/handyhub/employees')}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    Go to Employees
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4}
              sx={{
                animation: 'fadeIn 0.6s ease-in-out 0.4s both',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Card sx={{
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                  '& .admin-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box 
                      className="admin-icon"
                      sx={{ 
                        bgcolor: 'primary.100', 
                        p: 1.5, 
                        borderRadius: 1,
                        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <People sx={{ color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Manage Workers
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Handle worker profiles and ratings
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/handyhub/workers')}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    Go to Workers
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4}
              sx={{
                animation: 'fadeIn 0.6s ease-in-out 0.5s both',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Card sx={{
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                  '& .admin-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box 
                      className="admin-icon"
                      sx={{ 
                        bgcolor: 'primary.100', 
                        p: 1.5, 
                        borderRadius: 1,
                        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <Category sx={{ color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Manage Services
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Update service categories
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/handyhub/categories')}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    Go to Services
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
