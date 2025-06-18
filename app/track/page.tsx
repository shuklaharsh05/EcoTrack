'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Home, 
  Utensils, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Leaf,
  Calculator
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TransportForm from '@/components/forms/TransportForm';
import HomeForm from '@/components/forms/HomeForm';
import FoodForm from '@/components/forms/FoodForm';
import ShoppingForm from '@/components/forms/ShoppingForm';
import { calculateEmissions } from '@/lib/emissions';

export default function TrackPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    transport: {},
    home: {},
    food: {},
    shopping: {}
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ecotrack_auth');
    if (!auth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const steps = [
    {
      id: 'transport',
      title: 'Transportation',
      description: 'Track your daily commute and travel habits',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      id: 'home',
      title: 'Home Energy',
      description: 'Monitor your household energy consumption',
      icon: Home,
      color: 'bg-green-500'
    },
    {
      id: 'food',
      title: 'Food & Diet',
      description: 'Calculate your dietary carbon footprint',
      icon: Utensils,
      color: 'bg-orange-500'
    },
    {
      id: 'shopping',
      title: 'Shopping',
      description: 'Track consumption and purchasing habits',
      icon: ShoppingBag,
      color: 'bg-purple-500'
    }
  ];

  const handleStepComplete = (stepId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data
    }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCalculate = () => {
    const totalEmissions = calculateEmissions(formData);
    
    // Store calculation results
    localStorage.setItem('ecotrack_emissions', JSON.stringify({
      ...formData,
      totalEmissions,
      date: new Date().toISOString()
    }));
    
    router.push('/dashboard');
  };

  const isStepCompleted = (stepIndex: number) => {
    const stepId = steps[stepIndex].id;
    return Object.keys(formData[stepId as keyof typeof formData]).length > 0;
  };

  const allStepsCompleted = steps.every((_, index) => isStepCompleted(index));

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">EcoTrack</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Carbon Calculator</span>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Calculate Your Carbon Footprint
              </h1>
              <p className="text-gray-600">
                Complete each section to get your personalized carbon footprint assessment
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round((currentStep / steps.length) * 100)}%
              </div>
            </div>
          </div>
          
          <Progress value={(currentStep / steps.length) * 100} className="mb-6" />
          
          {/* Step Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = isStepCompleted(index);
              
              return (
                <div
                  key={step.id}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isActive 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : isCompleted
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : step.color
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <StepIcon className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <Badge className="absolute -top-2 -right-2 bg-emerald-500">
                      Active
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${steps[currentStep].color}`}>
                {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-white" })}
              </div>
              <div>
                <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                <CardDescription className="text-base">
                  {steps[currentStep].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentStep === 0 && (
              <TransportForm 
                onComplete={(data) => handleStepComplete('transport', data)}
                initialData={formData.transport}
              />
            )}
            {currentStep === 1 && (
              <HomeForm 
                onComplete={(data) => handleStepComplete('home', data)}
                initialData={formData.home}
              />
            )}
            {currentStep === 2 && (
              <FoodForm 
                onComplete={(data) => handleStepComplete('food', data)}
                initialData={formData.food}
              />
            )}
            {currentStep === 3 && (
              <ShoppingForm 
                onComplete={(data) => handleStepComplete('shopping', data)}
                initialData={formData.shopping}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep 
                    ? 'bg-emerald-500' 
                    : index < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={!isStepCompleted(currentStep)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleCalculate}
              disabled={!allStepsCompleted}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}