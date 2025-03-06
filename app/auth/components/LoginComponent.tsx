// app/auth/components/LoginComponent.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  Divider, 
  CircularProgress,
  IconButton,
  Card,
  Container,
  useTheme,
  Paper,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
//import GoogleIcon from '@mui/icons-material/Google';
//import FacebookIcon from '@mui/icons-material/Facebook';
//import TwitterIcon from '@mui/icons-material/Twitter';

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.grey[300]}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #56e39f 0%, #59c9a5 50%, #5b6c5d 100%)',
  padding: theme.spacing(3),
}));

interface LoginComponentProps {
  onSubmit: (email: string, password: string, remember: boolean) => Promise<void>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    general: string;
  }>({
    email: '',
    password: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'remember') setRemember(e.target.checked);
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form first
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(email, password, remember);
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Invalid email or password. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBox>
      <Container maxWidth="sm">
        <Card elevation={10} sx={{ overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            {/* Left side with logo and brand message */}
            <Box 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', md: '40%' }
              }}
            >
              <Box textAlign="center" mb={4}>
                {/* Logo placeholder - replace with your actual logo */}
                <Box 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    margin: '0 auto 16px'
                  }}
                >
                  T
                </Box>
                <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
                  TÁLANTOS
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connect athletes with university recruiters
                </Typography>
              </Box>
            </Box>

            {/* Right side with login form */}
            <Box 
              sx={{ 
                bgcolor: 'white', 
                p: 4,
                width: { xs: '100%', md: '60%' } 
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Please sign in to your account
              </Typography>

              {errors.general && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.general}
              </Alert>
            )}
              
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                />
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Password
                  </Typography>
                  <Link href="/auth/forgot-password" underline="hover" sx={{ color: theme.palette.secondary.main, fontSize: '0.875rem' }}>
                    Forgot password?
                  </Link>
                </Box>
                
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                />
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={remember} 
                      onChange={(e) => setRemember(e.target.checked)} 
                      sx={{ color: theme.palette.primary.main }}
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                  sx={{ mt: 1 }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                </Button>
                
                <Typography color="text.secondary" align="center" variant="body2">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" underline="hover" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    Sign up
                  </Link>
                </Typography>
              </form>
              
              
            </Box>
          </Box>
        </Card>
      </Container>
    </GradientBox>
  );
};

export default LoginComponent;