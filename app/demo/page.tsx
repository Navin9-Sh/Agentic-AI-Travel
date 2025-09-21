'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  CreditCard, 
  Cloud,
  Sparkles,
  Navigation,
  Star,
  Clock,
  Users,
  Utensils,
  Camera,
  Building
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DemoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const demoSteps = [
    {
      title: '🏠 Dashboard Overview',
      description: 'Your personalized travel command center with trip statistics and AI insights',
      component: 'dashboard'
    },
    {
      title: '✈️ Trip Planning',
      description: 'AI-powered trip creation with intelligent recommendations',
      component: 'planning'
    },
    {
      title: '📅 Smart Itinerary',
      description: 'Day-by-day schedule with weather-aware activity suggestions',
      component: 'itinerary'
    },
    {
      title: '💰 Budget Tracking',
      description: 'Real-time expense monitoring and smart budget optimization',
      component: 'budget'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, demoSteps.length]);

  const DashboardDemo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-sky-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="h-8 w-8 text-sky-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="text-2xl font-bold">$18.2K</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Tips</p>
                <p className="text-2xl font-bold">247</p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-2 border-sky-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Paris Adventure 🇫🇷</h3>
            <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Mar 15-20, 2024 • 2 travelers</span>
              <span>15 activities planned</span>
            </div>
            <Progress value={74} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$1,850 / $2,500 spent</span>
              <span>Sunny 18°C ☀️</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PlanningDemo = () => (
    <div className="space-y-6">
      <Card className="border-2 border-sky-200">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Sparkles className="h-12 w-12 text-sky-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Trip Planner</h3>
            <p className="text-gray-600">Tell us your preferences and we'll craft the perfect itinerary</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Destination</label>
                <div className="mt-1 p-3 border border-sky-200 rounded-lg bg-sky-50">
                  Tokyo, Japan 🇯🇵
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Duration</label>
                <div className="mt-1 p-3 border border-sky-200 rounded-lg bg-sky-50">
                  7 days
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Interests</label>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">🍜 Food Culture</Badge>
                <Badge variant="secondary">🏯 Traditional Sites</Badge>
                <Badge variant="secondary">🛍️ Shopping</Badge>
                <Badge variant="secondary">🎮 Pop Culture</Badge>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate My Trip
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ItineraryDemo = () => (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-sky-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-orange-100 text-orange-800 rounded-lg">
                <Utensils className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Breakfast at Tsukiji Market</h4>
                <p className="text-sm text-gray-600 mb-2">Fresh sushi and traditional Japanese breakfast</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    8:00 AM
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    4.8
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$35</p>
              <p className="text-xs text-gray-500">1.5 hrs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <Camera className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Senso-ji Temple</h4>
                <p className="text-sm text-gray-600 mb-2">Ancient Buddhist temple in Asakusa district</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    10:30 AM
                  </span>
                  <Badge variant="outline" className="text-xs">Weather Aware</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">Free</p>
              <p className="text-xs text-gray-500">2 hrs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 text-green-800 rounded-lg">
                <Building className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Hotel Check-in</h4>
                <p className="text-sm text-gray-600 mb-2">Shibuya Sky Hotel - Premium room with city view</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    3:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    4.6
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">$180</p>
              <p className="text-xs text-gray-500">30 mins</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BudgetDemo = () => (
    <div className="space-y-6">
      <Card className="border-2 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Budget Overview</h3>
            <Badge className="bg-green-100 text-green-800">On Track</Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Total Spent</span>
                <span className="font-semibold">$1,850 / $2,500</span>
              </div>
              <Progress value={74} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Accommodation</p>
                <p className="font-semibold">$720 (29%)</p>
              </div>
              <div>
                <p className="text-gray-600">Activities</p>
                <p className="font-semibold">$480 (19%)</p>
              </div>
              <div>
                <p className="text-gray-600">Food & Dining</p>
                <p className="font-semibold">$380 (15%)</p>
              </div>
              <div>
                <p className="text-gray-600">Transportation</p>
                <p className="font-semibold">$270 (11%)</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">💡 AI Tip:</span>
                <span className="text-gray-600">You're saving 15% on dining!</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getCurrentComponent = () => {
    switch (demoSteps[currentStep].component) {
      case 'dashboard': return <DashboardDemo />;
      case 'planning': return <PlanningDemo />;
      case 'itinerary': return <ItineraryDemo />;
      case 'budget': return <BudgetDemo />;
      default: return <DashboardDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-sky-200/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  TravelAI Demo
                </h1>
                <p className="text-gray-600">Experience the future of AI-powered travel planning</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`border-sky-300 ${isAutoPlaying ? 'bg-sky-50 text-sky-700' : 'text-sky-600'}`}
              >
                {isAutoPlaying ? 'Pause Demo' : 'Auto Play'}
              </Button>
              <Button
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
              >
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Navigation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-6">
            {demoSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  setIsAutoPlaying(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  index === currentStep
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-sky-50 border border-gray-200'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <motion.h2
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {demoSteps[currentStep].title}
            </motion.h2>
            <motion.p
              key={`desc-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 dark:text-gray-300"
            >
              {demoSteps[currentStep].description}
            </motion.p>
          </div>
        </div>

        {/* Demo Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sky-200/50"
        >
          {getCurrentComponent()}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Dream Trip?</h3>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Join thousands of travelers who are already using AI to create personalized, 
            budget-friendly itineraries that adapt to weather and preferences in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => router.push('/auth/signup')}
              className="bg-white text-sky-600 hover:bg-gray-50 px-8 py-3 text-lg"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/auth/login')}
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Try Demo Account
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}