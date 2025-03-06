'use client';

import React from 'react';
import LoginComponent from '../components/LoginComponent';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    try {
      // This is where you would connect to your actual authentication service
      console.log('Login with:', { email, password, remember });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to dashboard or home page after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  return <LoginComponent onSubmit={handleLogin} />;
}