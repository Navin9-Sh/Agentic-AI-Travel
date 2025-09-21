'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  Users, 
  CreditCard, 
  Cloud,
  Sparkles,
  Download,
  Share,
  RefreshCw,
  Clock,
  Star,
  Navigation,
  Utensils,
  Camera,
  Building
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Activity {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant' | 'hotel' | 'flight';
  time: string;
  duration: string;
  cost: number;
  rating: number;
  description: string;
  location: string;
  image: string;
  weather_dependent: boolean;
}

interface DayItinerary {
  day: number;
  date: string;
  weather: string;
  activities: Activity[];
  total_cost: number;
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
  itinerary: DayItinerary[];
}

export default function TripDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    // Load trip data (in a real app, this would be an API call)
    const loadTrip = () => {
      // Demo data for Paris trip
      if (params.id === '1') {
        const parisTrip: Trip = {
          id: '1',
          destination: 'Paris, France 🇫🇷',
          dates: 'Mar 15-20, 2024',
          budget: 2500,
          spent: 1850,
          status: 'confirmed',
          activities: 15,
          travelers: 2,
          weather: 'Sunny 18°C',
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
          itinerary: [
            {
              day: 1,
              date: 'Mar 15, 2024',
              weather: 'Sunny 18°C ☀️',
              total_cost: 380,
              activities: [
                {
                  id: '1',
                  name: 'Arrival at Charles de Gaulle Airport',
                  type: 'flight',
                  time: '10:30 AM',
                  duration: '1 hour',
                  cost: 0,
                  rating: 0,
                  description: 'Land in Paris and take the RER B train to city center',
                  location: 'CDG Airport',
                  image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg',
                  weather_dependent: false
                },
                {
                  id: '2',
                  name: 'Hotel Check-in - Le Marais Boutique',
                  type: 'hotel',
                  time: '2:00 PM',
                  duration: '30 mins',
                  cost: 180,
                  rating: 4.6,
                  description: 'Charming boutique hotel in the historic Le Marais district',
                  location: '15 Rue des Rosiers, 75004 Paris',
                  image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
                  weather_dependent: false
                },
                {
                  id: '3',
                  name: 'Walking Tour of Le Marais',
                  type: 'attraction',
                  time: '3:30 PM',
                  duration: '2 hours',
                  cost: 0,
                  rating: 4.8,
                  description: 'Explore the Jewish quarter, vintage shops, and historic architecture',
                  location: 'Le Marais District',
                  image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
                  weather_dependent: true
                },
                {
                  id: '4',
                  name: 'Dinner at L\'As du Fallafel',
                  type: 'restaurant',
                  time: '7:00 PM',
                  duration: '1.5 hours',
                  cost: 28,
                  rating: 4.4,
                  description: 'Famous falafel spot in the heart of Le Marais',
                  location: '34 Rue des Rosiers, 75004 Paris',
                  image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg',
                  weather_dependent: false
                }
              ]
            },
            {
              day: 2,
              date: 'Mar 16, 2024',
              weather: 'Partly Cloudy 16°C ⛅',
              total_cost: 420,
              activities: [
                {
                  id: '5',
                  name: 'Louvre Museum',
                  type: 'attraction',
                  time: '9:00 AM',
                  duration: '3 hours',
                  cost: 34,
                  rating: 4.9,
                  description: 'Visit the world\'s largest art museum and see the Mona Lisa',
                  location: 'Rue de Rivoli, 75001 Paris',
                  image: 'https://images.pexels.com/photos/2889756/pexels-photo-2889756.jpeg',
                  weather_dependent: false
                },
                {
                  id: '6',
                  name: 'Lunch at Angelina',
                  type: 'restaurant',
                  time: '12:30 PM',
                  duration: '1 hour',
                  cost: 45,
                  rating: 4.3,
                  description: 'Famous for their thick hot chocolate and Mont Blanc dessert',
                  location: '226 Rue de Rivoli, 75001 Paris',
                  image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg',
                  weather_dependent: false
                },
                {
                  id: '7',
                  name: 'Seine River Cruise',
                  type: 'attraction',
                  time: '3:00 PM',
                  duration: '1 hour',
                  cost: 25,
                  rating: 4.5,
                  description: 'Scenic boat ride with views of Notre Dame and Eiffel Tower',
                  location: 'Port de la Bourdonnais',
                  image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg',
                  weather_dependent: true
                }
              ]
            }
          ]
        };
        setTrip(parisTrip);
      } else {
        // Generate demo trip for other IDs
        const demoTrip: Trip = {
          id: params.id as string,
          destination: 'Your Destination',
          dates: 'Coming Soon',
          budget: 2000,
          spent: 0,
          status: 'planning',
          activities: 12,
          travelers: 2,
          weather: 'Loading...',
          image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
          itinerary: []
        };
        setTrip(demoTrip);
      }
      setLoading(false);
    };

    loadTrip();
  }, [params.id]);

  const handleRegenerateItinerary = async () => {
    setRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Itinerary updated with new AI suggestions!');
    setRegenerating(false);
  };

  const handleExportPDF = () => {
    toast.success('PDF export feature coming soon!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Trip link copied to clipboard!');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return Utensils;
      case 'attraction': return Camera;
      case 'hotel': return Building;
      case 'flight': return Navigation;
      default: return MapPin;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-100 text-orange-800';
      case 'attraction': return 'bg-blue-100 text-blue-800';
      case 'hotel': return 'bg-green-100 text-green-800';
      case 'flight': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-12 w-12 text-sky-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 dark:text-gray-300">Loading your trip details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-sky-200/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {trip.destination}
                  <Badge className={getActivityColor(trip.status)}>{trip.status}</Badge>
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{trip.dates}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRegenerateItinerary}
                disabled={regenerating}
                className="border-sky-300 text-sky-600 hover:bg-sky-50"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${regenerating ? 'animate-spin' : ''}`} />
                {regenerating ? 'Updating...' : 'Regenerate'}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-gray-300"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${trip.budget.toLocaleString()}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${trip.spent.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <Progress value={(trip.spent / trip.budget) * 100} className="w-16 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Activities</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{trip.activities}</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Weather</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{trip.weather}</p>
                </div>
                <Cloud className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itinerary */}
        <Card className="border-2 border-sky-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-sky-600" />
              Your AI-Powered Itinerary
            </CardTitle>
            <CardDescription>
              Personalized daily schedule with weather-aware recommendations
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {trip.itinerary && trip.itinerary.length > 0 ? (
              <Tabs value={activeDay.toString()} onValueChange={(value) => setActiveDay(parseInt(value))}>
                <TabsList className="grid grid-cols-2 lg:grid-cols-5 mb-6">
                  {trip.itinerary.map((day) => (
                    <TabsTrigger key={day.day} value={day.day.toString()}>
                      Day {day.day}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {trip.itinerary.map((day) => (
                  <TabsContent key={day.day} value={day.day.toString()}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Day Header */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Day {day.day} - {day.date}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">{day.weather}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-sky-600">
                            ${day.total_cost}
                          </p>
                          <p className="text-sm text-gray-500">Daily Budget</p>
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="space-y-4">
                        {day.activities.map((activity, index) => {
                          const IconComponent = getActivityIcon(activity.type);
                          return (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group"
                            >
                              <Card className="border-l-4 border-l-sky-500 hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 flex-1">
                                      <div className="flex-shrink-0">
                                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                                          <IconComponent className="h-5 w-5" />
                                        </div>
                                      </div>
                                      
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {activity.name}
                                          </h4>
                                          <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">{activity.time}</span>
                                          </div>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                                          {activity.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                              <MapPin className="h-4 w-4 text-gray-400" />
                                              <span className="text-sm text-gray-500">{activity.location}</span>
                                            </div>
                                            {activity.rating > 0 && (
                                              <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                <span className="text-sm font-medium">{activity.rating}</span>
                                              </div>
                                            )}
                                            {activity.weather_dependent && (
                                              <Badge variant="outline" className="text-xs">
                                                Weather Dependent
                                              </Badge>
                                            )}
                                          </div>
                                          
                                          <div className="text-right">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                              {activity.cost > 0 ? `$${activity.cost}` : 'Free'}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.duration}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Itinerary Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our AI is crafting the perfect itinerary for your trip.
                </p>
                <Button
                  onClick={handleRegenerateItinerary}
                  disabled={regenerating}
                  className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Itinerary
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}