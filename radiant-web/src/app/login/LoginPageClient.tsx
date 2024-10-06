'use client'

import { LoginComponent } from "@/components/pages-login"
import { useRouter } from 'next/navigation'

export default function LoginPageClient() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    console.log('Attempting login')
    try {
      const response = await fetch('http://localhost:8000/v1/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      console.log('Login successful:', data);
      // Store the access token in an HTTP-only cookie instead of localStorage
      // This should be done server-side for better security
      // For now, we'll just log it (in a real app, implement proper token handling)
      console.log('Received access token:', data.access_token);
      console.log('Received refresh token:', data.refresh_token);

      // Redirect to the feed page
      router.push('/feed')
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message to user)
    }
  }

  const handleSignUp = (email: string, password: string) => {
    // Implement sign up logic here
    console.log('Sign up:', email, password)
  }

  const handleForgotPassword = (email: string) => {
    // Implement forgot password logic here
    console.log('Forgot password:', email)
  }

  return (
    <div className="bg-gradient-default">
      <LoginComponent
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  )
}