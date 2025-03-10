// app/page.tsx
'use client';

import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import Link from 'next/link';
/*import { 
  SportsSoccer as SportsIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';*/

export default function HomePage() {
  const theme = useTheme();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          background: 'linear-gradient(135deg, #56e39f 0%, #59c9a5 50%, #5b6c5d 100%)',
          py: 12,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Connect Athletes with University Recruiters
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Your pathway to athletic scholarships starts here
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={Link}
                  href="/auth/login"
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Log In
                </Button>
                <Button 
                  component={Link}
                  href="/auth/signup"
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              {/* Placeholder for hero image or illustration */}
              <Box 
                sx={{
                  width: '100%',
                  height: 400,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  TÁLANTOS
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="bold" 
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Why Choose TÁLANTOS?
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Showcase Your Talent
                  </Typography>
                  <Typography color="text.secondary">
                    Create a comprehensive profile highlighting your athletic achievements, skills, and academic performance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Connect with Universities
                  </Typography>
                  <Typography color="text.secondary">
                    Get discovered by recruiters from top universities looking for talented athletes like you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Secure Scholarships
                  </Typography>
                  <Typography color="text.secondary">
                    Increase your chances of receiving athletic scholarships and funding for your education.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundColor: theme.palette.grey[100]
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of athletes and recruiters on TÁLANTOS today.
          </Typography>
          <Button 
            component={Link}
            href="/auth/signup"
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 6, py: 1.5 }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: theme.palette.grey[900], color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} TÁLANTOS. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}