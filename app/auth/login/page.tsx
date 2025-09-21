'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plane, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo: Accept any email/password or use demo credentials
      if (formData.email === 'demo@travelai.com' && formData.password === 'demo123') {
        // Set demo user in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          email: 'demo@travelai.com',
          name: 'Demo User',
          role: 'user',
          token: 'demo-jwt-token-123'
        }));
        toast.success('Welcome back! Redirecting to dashboard...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else if (formData.email && formData.password) {
        // Accept any credentials for demo
        localStorage.setItem('user', JSON.stringify({
          id: '2',
          email: formData.email,
          name: 'Travel Explorer',
          role: 'user',
          token: 'user-jwt-token-456'
        }));
        toast.success('Login successful! Welcome to TravelAI');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        toast.error('Please fill in all fields');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@travelai.com',
      password: 'demo123'
    });
    toast.info('Demo credentials loaded! Click Sign In to continue.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-sky-200/50 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-xl">
                <Plane className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your TravelAI account to continue planning amazing trips
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-sky-200 focus:border-sky-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="border-sky-200 focus:border-sky-500"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 h-11"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="space-y-4">
              <Separator className="my-6" />
              
              <Button
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full border-green-200 text-green-600 hover:bg-green-50"
              >
                <User className="mr-2 h-4 w-4" />
                Try Demo Account
              </Button>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                Demo credentials: demo@travelai.com / demo123
              </div>
            </div>
            
            <div className="text-center pt-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-sky-600 hover:text-sky-700 font-medium">
                  Sign up
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}