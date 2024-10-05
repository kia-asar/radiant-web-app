'use client'

import { LoginComponent } from "@/components/pages-login"

export default function LoginPageClient() {
  const handleLogin = (email: string, password: string) => {
    // Implement login logic here
    console.log('Login:', email, password)
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