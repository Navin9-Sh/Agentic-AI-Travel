'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  CreditCard, 
  Plane, 
  Plus, 
  Sparkles, 
  Cloud,
  Users,
  Clock,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface Trip {
  id: string;
  destination: string;
  dates: string;
  budget: number;
  spent: number;
  status: 'planning' | 'confirmed' | 'completed';
  activities: number;
  travelers: number;
  weather: string;
  image: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Load demo trips for demo user, or create sample trips for others
    const demoTrips: Trip[] = [
      {
        id: '1',
        destination: 'Paris, France 🇫🇷',
        dates: 'Mar 15-20, 2024',
        budget: 2500,
        spent: 1850,
        status: 'confirmed',
        activities: 15,
        travelers: 2,
        weather: 'Sunny 18°C',
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg'
      },
      {
        id: '2',
        destination: 'Tokyo, Japan 🇯🇵',
        dates: 'Jun 10-18, 2024',
        budget: 3200,
        spent: 800,
        status: 'planning',
        activities: 22,
        travelers: 1,
        weather: 'Cloudy 24°C',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
      },
      {
        id: '3',
        destination: 'Santorini, Greece 🇬🇷',
        dates: 'Aug 5-12, 2024',
        budget: 2800,
        spent: 200,
        status: 'planning',
        activities: 18,
        travelers: 2,
        weather: 'Sunny 28°C',
        image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg'
      }
    ];

    setTrips(demoTrips);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetProgress = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-12 w-12 text-sky-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 dark:text-gray-300">Loading your travel dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-sky-200/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.name}! ✈️
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ready to plan your next adventure?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/trip/create')}
                className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Trip
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-gray-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Trips</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{trips.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-sky-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Countries Visited</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${trips.reduce((acc, trip) => acc + trip.budget, 0).toLocaleString()}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">AI Suggestions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">847</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="bg-white/50 border border-sky-200">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-6">
            {/* Current Trips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/trip/${trip.id}`)}
                >
                  <Card className="border-2 border-transparent hover:border-sky-200 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-sky-400 to-indigo-600">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getStatusColor(trip.status)} border-0`}>
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{trip.destination}</h3>
                        <p className="text-sm opacity-90">{trip.dates}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{trip.activities} activities</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Budget Progress</span>
                          <span className="text-sm text-gray-600">
                            ${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={getBudgetProgress(trip.spent, trip.budget)} 
                          className="h-2"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Cloud className="h-4 w-4" />
                          <span>{trip.weather}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-sky-600 hover:text-sky-700"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Add New Trip Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => router.push('/trip/create')}
              >
                <Card className="border-2 border-dashed border-sky-300 hover:border-sky-500 transition-colors duration-300 h-full min-h-[400px] flex items-center justify-center group">
                  <div className="text-center">
                    <div className="p-4 bg-sky-100 dark:bg-sky-900 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Plus className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Plan New Trip
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Let AI create your perfect itinerary
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Travel Insights
                  </CardTitle>
                  <CardDescription>Your travel patterns and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Trip Budget</span>
                      <span className="font-semibold">${(trips.reduce((acc, trip) => acc + trip.budget, 0) / trips.length).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Favorite Season</span>
                      <span className="font-semibold">Spring 🌸</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Preferred Trip Length</span>
                      <span className="font-semibold">5-7 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Travel Style</span>
                      <span className="font-semibold">Cultural Explorer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Paris trip confirmed</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">AI suggested 5 new restaurants for Tokyo</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Weather update: Santorini looking sunny!</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>Customize your AI recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Activity Types</h4>
                    <div className="space-y-2">
                      {['Museums & Culture', 'Food & Dining', 'Nature & Outdoors', 'Nightlife', 'Shopping', 'Adventure Sports'].map((activity) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <label className="text-sm">{activity}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Budget Preferences</h4>
                    <div className="space-y-2">
                      {['Budget-friendly', 'Mid-range', 'Luxury', 'Mixed'].map((budget) => (
                        <div key={budget} className="flex items-center space-x-2">
                          <input type="radio" name="budget" className="border-gray-300" />
                          <label className="text-sm">{budget}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}