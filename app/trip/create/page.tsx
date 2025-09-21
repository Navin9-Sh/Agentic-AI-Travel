'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard, 
  Sparkles, 
  ArrowLeft,
  Plane,
  Heart,
  Camera,
  Utensils,
  Mountain,
  Building,
  Music
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number[];
  interests: string[];
  travelStyle: string;
  accommodation: string;
  specialRequests: string;
}

const interestOptions = [
  { id: 'culture', label: 'Museums & Culture', icon: Building },
  { id: 'food', label: 'Food & Dining', icon: Utensils },
  { id: 'nature', label: 'Nature & Outdoors', icon: Mountain },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'nightlife', label: 'Nightlife & Entertainment', icon: Music },
  { id: 'romantic', label: 'Romantic Experiences', icon: Heart }
];

export default function CreateTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: [2000],
    interests: [],
    travelStyle: '',
    accommodation: '',
    specialRequests: ''
  });

  const totalSteps = 4;

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate AI trip generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create new trip with AI-generated data
      const newTrip = {
        id: Date.now().toString(),
        destination: formData.destination,
        dates: `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}`,
        budget: formData.budget[0],
        spent: 0,
        status: 'planning' as const,
        activities: Math.floor(Math.random() * 20) + 10,
        travelers: formData.travelers,
        weather: 'Loading...',
        image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg'
      };
      
      // Save to localStorage (in real app, this would be API call)
      const existingTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      localStorage.setItem('trips', JSON.stringify([newTrip, ...existingTrips]));
      
      toast.success('🎉 Your AI-powered itinerary is ready!');
      router.push(`/trip/${newTrip.id}`);
      
    } catch (error) {
      toast.error('Failed to create trip. Please try again.');
    }
    
    setLoading(false);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.destination && formData.startDate && formData.endDate;
      case 2:
        return formData.travelers > 0 && formData.budget[0] > 0;
      case 3:
        return formData.interests.length > 0 && formData.travelStyle;
      case 4:
        return formData.accommodation;
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <Sparkles className="h-16 w-16 text-sky-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            AI is crafting your perfect itinerary ✨
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This might take a moment as we personalize everything for you...
          </p>
          <div className="mt-6 w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <motion.div
              className="bg-gradient-to-r from-sky-600 to-indigo-600 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Plan Your Dream Trip
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your preferences and let AI do the magic
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-sky-600" />
              <span className="text-sm font-medium text-gray-500">
                Step {step} of {totalSteps}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-sky-200/50 shadow-xl">
            <CardContent className="p-8">
              {/* Step 1: Destination & Dates */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <MapPin className="h-12 w-12 text-sky-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Where & When?</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Let's start with the basics of your journey
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Paris, Tokyo, New York..."
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        className="border-sky-200 focus:border-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="border-sky-200 focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="border-sky-200 focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travelers & Budget */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Users className="h-12 w-12 text-sky-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Group & Budget</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Help us tailor the perfect experience for your group
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Number of Travelers</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                          disabled={formData.travelers <= 1}
                        >
                          -
                        </Button>
                        <span className="text-2xl font-bold px-4">{formData.travelers}</span>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, travelers: prev.travelers + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Budget (Total for all travelers)</Label>
                      <div className="mt-4">
                        <Slider
                          value={formData.budget}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                          max={10000}
                          min={500}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>$500</span>
                          <span className="font-bold text-lg text-sky-600">
                            ${formData.budget[0].toLocaleString()}
                          </span>
                          <span>$10,000+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Interests & Travel Style */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Heart className="h-12 w-12 text-sky-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your Interests</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      What makes your perfect trip? Select all that apply
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">What interests you most?</Label>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {interestOptions.map((interest) => (
                          <div
                            key={interest.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.interests.includes(interest.id)
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                                : 'border-gray-200 hover:border-sky-300'
                            }`}
                            onClick={() => handleInterestToggle(interest.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <interest.icon className="h-6 w-6 text-sky-600" />
                              <span className="font-medium">{interest.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Travel Style</Label>
                      <Select value={formData.travelStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, travelStyle: value }))}>
                        <SelectTrigger className="border-sky-200 focus:border-sky-500">
                          <SelectValue placeholder="How do you like to travel?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relaxed">Relaxed & Flexible</SelectItem>
                          <SelectItem value="packed">Packed with Activities</SelectItem>
                          <SelectItem value="balanced">Balanced Schedule</SelectItem>
                          <SelectItem value="spontaneous">Spontaneous & Adventurous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <CreditCard className="h-12 w-12 text-sky-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Final Touches</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Last few details to make your trip perfect
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Accommodation Preference</Label>
                      <Select value={formData.accommodation} onValueChange={(value) => setFormData(prev => ({ ...prev, accommodation: value }))}>
                        <SelectTrigger className="border-sky-200 focus:border-sky-500">
                          <SelectValue placeholder="Where would you like to stay?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotels</SelectItem>
                          <SelectItem value="airbnb">Airbnb/Vacation Rentals</SelectItem>
                          <SelectItem value="hostel">Hostels</SelectItem>
                          <SelectItem value="resort">Resorts</SelectItem>
                          <SelectItem value="mixed">Mix of Options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any dietary restrictions, accessibility needs, or special occasions we should know about?"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                        className="border-sky-200 focus:border-sky-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300"
                >
                  {step === 1 ? 'Cancel' : 'Previous'}
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
                >
                  {step === totalSteps ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate My Trip
                    </>
                  ) : (
                    'Next Step'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}