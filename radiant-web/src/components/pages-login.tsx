'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
  onForgotPassword: (email: string) => void;
}

export function LoginComponent({ onLogin, onSignUp, onForgotPassword }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    forgotPasswordEmail: ''
  })

  const validateForm = (isSignUp = false) => {
    const newErrors = {
      email: email ? '' : 'Email is required',
      password: password ? '' : 'Password is required',
      repeatPassword: '',
      forgotPasswordEmail: ''
    }

    if (isSignUp) {
      if (!repeatPassword) {
        newErrors.repeatPassword = 'Repeat password is required'
      } else if (password !== repeatPassword) {
        newErrors.repeatPassword = 'Password and repeat password do not match'
      }
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const validateForgotPasswordForm = () => {
    const newErrors = {
      ...errors,
      forgotPasswordEmail: forgotPasswordEmail ? '' : 'Email is required'
    }
    setErrors(newErrors)
    return !newErrors.forgotPasswordEmail
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(email, password)
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm(true)) {
      onSignUp(email, password)
      setIsSignUpModalOpen(false)
    }
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForgotPasswordForm()) {
      onForgotPassword(forgotPasswordEmail)
      setIsForgotPasswordModalOpen(false)
    }
  }

  return (
    <div className="bg-yuja-gradient min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold text-center">Welcome to Yuja</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" type="submit">
                Log In
              </Button>
              <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex-1" type="button" variant="outline">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Sign Up</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repeat-password">Repeat Password</Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        placeholder="Repeat your password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
                    </div>
                    <Button className="w-full" type="submit">
                      Sign Up
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </form>
          <div className="mt-8 text-center text-sm">
            <Dialog open={isForgotPasswordModalOpen} onOpenChange={setIsForgotPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-pink-600 hover:underline p-0">Forgot password?</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Forgot Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-password-email">Email</Label>
                    <Input
                      id="forgot-password-email"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                    {errors.forgotPasswordEmail && <p className="text-red-500 text-sm">{errors.forgotPasswordEmail}</p>}
                  </div>
                  <Button className="w-full" type="submit">
                    Reset Password
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}