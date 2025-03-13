'use client';

import React from 'react';
import SignupComponent from '../components/SignupComponent';
import { useRouter } from 'next/navigation';

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

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    try {
      // This is where you would connect to your actual authentication service
      console.log('Signup data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registration successful - component will show success state
      // No navigation needed as the component handles this
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  return <SignupComponent onSubmit={handleSignup} />;
}
