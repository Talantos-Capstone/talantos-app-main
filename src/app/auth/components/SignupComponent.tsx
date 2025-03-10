
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Step,
  StepLabel,
  Stepper,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Card,
  Container,
  useTheme,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Alert,
  SelectChangeEvent,
  IconButton,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Define your styled components
const GradientBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #56e39f 0%, #59c9a5 50%, #5b6c5d 100%)',
  padding: theme.spacing(3),
}));

// Define types for the form data
interface SignupFormData {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  
  // Tutor specific
  athleteFirstName?: string;
  athleteLastName?: string;
  athleteAge?: string;
  athleteSpecialty?: string;
  athleteGrade?: string;
  
  // Recruiter specific
  recruiterId?: string;
  university?: string;
  
  // Specialist specific
  specialistId?: string;
  specialty?: string;
}

interface SignupComponentProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
}

const SignupComponent: React.FC<SignupComponentProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tutor',
  });

  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    athleteFirstName: string;
    athleteLastName: string;
    athleteAge: string;
    athleteSpecialty: string;
    athleteGrade: string;
    recruiterId: string;
    university: string;
    specialistId: string;
    specialty: string;
    general: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    athleteFirstName: '',
    athleteLastName: '',
    athleteAge: '',
    athleteSpecialty: '',
    athleteGrade: '',
    recruiterId: '',
    university: '',
    specialistId: '',
    specialty: '',
    general: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user selects
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleRoleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newRole: string,
  ) => {
    if (newRole !== null) {
      setFormData(prev => ({
        ...prev,
        role: newRole
      }));

      // Clear role error
      if (errors.role) {
        setErrors(prev => ({
          ...prev,
          role: ''
        }));
      }
    }
  };

  const validatePersonalDetails = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const validateRoleDetails = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (formData.role === 'tutor') {
      // Validate athlete information
      if (!formData.athleteFirstName?.trim()) {
        newErrors.athleteFirstName = 'Athlete first name is required';
        valid = false;
      }
      
      if (!formData.athleteLastName?.trim()) {
        newErrors.athleteLastName = 'Athlete last name is required';
        valid = false;
      }
      
      if (!formData.athleteAge) {
        newErrors.athleteAge = 'Age is required';
        valid = false;
      } else if (parseInt(formData.athleteAge) < 10 || parseInt(formData.athleteAge) > 25) {
        newErrors.athleteAge = 'Age must be between 10 and 25';
        valid = false;
      }
      
      if (!formData.athleteSpecialty?.trim()) {
        newErrors.athleteSpecialty = 'Athlete specialty is required';
        valid = false;
      }
      
      if (!formData.athleteGrade) {
        newErrors.athleteGrade = 'Grade is required';
        valid = false;
      }
    } else if (formData.role === 'recruiter') {
      // Validate recruiter information
      if (!formData.recruiterId?.trim()) {
        newErrors.recruiterId = 'Recruiter ID is required';
        valid = false;
      }
      
      if (!formData.university?.trim()) {
        newErrors.university = 'University is required';
        valid = false;
      }
    } else if (formData.role === 'specialist') {
      // Validate specialist information
      if (!formData.specialistId?.trim()) {
        newErrors.specialistId = 'Specialist ID is required';
        valid = false;
      }
      
      if (!formData.specialty?.trim()) {
        newErrors.specialty = 'Specialty is required';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleNext = () => {
    if (activeStep === 0) {
      if (validatePersonalDetails()) {
        setActiveStep(1);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 1) {
      if (!validateRoleDetails()) {
        return;
      }

      setLoading(true);
      try {
        await onSubmit(formData);
        handleNext(); // Move to success step
      } catch (error) {
        console.error('Signup error:', error);
        setErrors(prev => ({
          ...prev,
          general: 'Registration failed. Please try again.'
        }));
      } finally {
        setLoading(false);
      }
    } else {
      handleNext();
    }
  };
  
  // Step contents
  const renderStepContent = (step: number) => {
    switch(step) {
      case 0: // Personal Details
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Personal Details
            </Typography>

            {errors.general && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.general}
              </Alert>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
            </Grid>
            
            <Box mt={2} mb={3}>
              <Typography variant="body1" mb={1}>Role</Typography>
              <ToggleButtonGroup
                value={formData.role}
                exclusive
                onChange={handleRoleChange}
                aria-label="user role"
                fullWidth
                sx={{ 
                  '& .MuiToggleButton-root': { 
                    py: 1,
                    borderColor: theme.palette.grey[300],
                    '&.Mui-selected': { 
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      }
                    } 
                  } 
                }}
              >
                <ToggleButton value="recruiter">RECRUITER</ToggleButton>
                <ToggleButton value="tutor">TUTOR</ToggleButton>
                <ToggleButton value="specialist">SPECIALIST</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
            />
            
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              sx={{ mt: 4, py: 1.5 }}
            >
              NEXT
            </Button>
          </Box>
        );
        
      case 1: // Role-specific details
        if (formData.role === 'tutor') {
          return (
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                Role-specific Details
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Athlete Information (for Tutor)
              </Typography>

              {errors.general && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.general}
                </Alert>
              )}
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Athlete First Name"
                    name="athleteFirstName"
                    value={formData.athleteFirstName || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.athleteFirstName}
                    helperText={errors.athleteFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Athlete Last Name"
                    name="athleteLastName"
                    value={formData.athleteLastName || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.athleteLastName}
                    helperText={errors.athleteLastName}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Age"
                    name="athleteAge"
                    type="number"
                    value={formData.athleteAge || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.athleteAge}
                    helperText={errors.athleteAge}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Athlete Specialty"
                    name="athleteSpecialty"
                    value={formData.athleteSpecialty || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.athleteSpecialty}
                    helperText={errors.athleteSpecialty}
                  />
                </Grid>
              </Grid>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="grade-label">Grade</InputLabel>
                <Select
                  labelId="grade-label"
                  id="grade-select"
                  name="athleteGrade"
                  value={formData.athleteGrade || ''}
                  label="Grade"
                  onChange={handleSelectChange}
                  required
                >
                  {[9, 10, 11, 12].map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      Grade {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        } else if (formData.role === 'recruiter') {
          return (
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Role-specific Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Recruiter ID"
                    name="recruiterId"
                    value={formData.recruiterId || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.recruiterId}
                    helperText={errors.recruiterId}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="University"
                    name="university"
                    value={formData.university || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.university}
                    helperText={errors.university}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        } else if (formData.role === 'specialist') {
          return (
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Role-specific Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Specialist ID"
                    name="specialistId"
                    value={formData.specialistId || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.specialistId}
                    helperText={errors.specialistId}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Specialty"
                    name="specialty"
                    value={formData.specialty || ''}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.specialty}
                    helperText={errors.specialty}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        }
        return null;
        
      case 2: // Success step
        return (
          <Box textAlign="center" py={4}>
            
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Registration Complete!
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Thank you for signing up with Talantos.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              href="/auth/login"
              sx={{ py: 1.5 }}
            >
              GO TO LOGIN
            </Button>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <GradientBox>
      <Container maxWidth="md">
        <Card elevation={10} sx={{ overflow: 'hidden' }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            {/* Left side - Logo and progress */}
            <Box 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', md: '35%' }
              }}
            >
              <Box textAlign="center" mb={6}>
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
                  Join our community of athletes and recruiters
                </Typography>
              </Box>
              
              {activeStep !== 2 && (
                <Box width="100%">
                  <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                      <StepLabel>
                        <Typography fontWeight={activeStep === 0 ? 'bold' : 'normal'}>
                          Personal Details
                        </Typography>
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>
                        <Typography fontWeight={activeStep === 1 ? 'bold' : 'normal'}>
                          Role Details
                        </Typography>
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>
                        <Typography fontWeight={activeStep === 2 ? 'bold' : 'normal'}>
                          Complete
                        </Typography>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </Box>
              )}
            </Box>

            {/* Right side - Form */}
            <Box 
              sx={{ 
                bgcolor: 'white', 
                p: 4,
                width: { xs: '100%', md: '65%' },
                position: 'relative'
              }}
            >
              {activeStep > 0 && activeStep < 2 && (
                <Button
                  onClick={handleBack}
                  variant="text"
                  sx={{ position: 'absolute', top: 16, left: 16 }}
                >
                  ← Back
                </Button>
              )}
              
              <form onSubmit={handleSubmit}>
                {renderStepContent(activeStep)}
                
                {activeStep === 1 && (
                  <Box display="flex" gap={2} mt={4}>
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ py: 1.5 }}
                    >
                      BACK
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      sx={{ py: 1.5 }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'NEXT'}
                    </Button>
                  </Box>
                )}
              </form>
              
              {activeStep < 2 && (
                <Box mt={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link href="/auth/login" underline="hover" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                      Log in
                    </Link>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Container>
    </GradientBox>
  );
};

export default SignupComponent;