'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, MapPin, Sparkles, Users, Calendar, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Planning',
    description: 'Get personalized itineraries crafted by advanced AI that understands your preferences and budget.'
  },
  {
    icon: MapPin,
    title: 'Real-Time Updates',
    description: 'Weather-based suggestions and live activity recommendations to optimize your travel experience.'
  },
  {
    icon: CreditCard,
    title: 'Smart Budget Tracking',
    description: 'Keep track of expenses with intelligent budget allocation and spending insights.'
  },
  {
    icon: Users,
    title: 'Group Travel Support',
    description: 'Plan trips for solo adventures, couples, families, or groups with tailored suggestions.'
  }
];

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 AI-Powered Travel Planning
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Plan Your Perfect Trip with{' '}
              <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              From flights and hotels to restaurants and activities - get personalized itineraries 
              that adapt to weather, budget, and your unique travel style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
                onClick={() => router.push('/auth/login')}
              >
                <Plane className="mr-2 h-5 w-5" />
                Start Planning
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg border-sky-200 text-sky-600 hover:bg-sky-50"
                onClick={() => router.push('/demo')}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-sky-200/50 animate-float">
              <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">TravelAI Dashboard</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-sky-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-8 w-8 text-sky-600" />
                        <div>
                          <p className="font-semibold">5-Day Paris Trip</p>
                          <p className="text-sm text-gray-500">AI Generated</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-semibold">$2,450 Budget</p>
                          <p className="text-sm text-gray-500">Smart Tracking</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-8 w-8 text-orange-600" />
                        <div>
                          <p className="font-semibold">15 Activities</p>
                          <p className="text-sm text-gray-500">Personalized</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TravelAI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of travel planning with AI-driven insights and real-time adaptability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="border-2 border-transparent hover:border-sky-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900 dark:to-indigo-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Travel Experience?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of travelers who are already using AI to plan their perfect trips.
            </p>
            <Button 
              size="lg" 
              className="px-12 py-4 text-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
              onClick={() => router.push('/auth/signup')}
            >
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}