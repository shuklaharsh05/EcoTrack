'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Apple, Fish, Beef, Salad } from 'lucide-react';

interface FoodFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function FoodForm({ onComplete, initialData = {} }: FoodFormProps) {
  const [formData, setFormData] = useState({
    dietType: '',
    meatFrequency: '',
    dairyFrequency: '',
    localFood: '',
    organicFood: '',
    foodWaste: '',
    diningOut: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.dietType) {
      newErrors.dietType = 'Please select your diet type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors((prev: typeof errors) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Diet Type */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Utensils className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Diet Type</CardTitle>
          </div>
          <CardDescription>
            Your primary dietary preferences and habits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dietType">Primary Diet Type</Label>
            <Select value={formData.dietType} onValueChange={(value) => handleInputChange('dietType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="omnivore">Omnivore (Meat & Plants)</SelectItem>
                <SelectItem value="pescatarian">Pescatarian (Fish & Plants)</SelectItem>
                <SelectItem value="vegetarian">Vegetarian (No Meat)</SelectItem>
                <SelectItem value="vegan">Vegan (No Animal Products)</SelectItem>
              </SelectContent>
            </Select>
            {errors.dietType && <p className="text-sm text-red-600">{errors.dietType}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Meat Consumption */}
      {(formData.dietType === 'omnivore') && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Beef className="h-5 w-5 text-red-600" />
              <CardTitle className="text-lg">Meat Consumption</CardTitle>
            </div>
            <CardDescription>
              How often do you consume meat products?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meatFrequency">Meat Consumption Frequency</Label>
              <Select value={formData.meatFrequency} onValueChange={(value) => handleInputChange('meatFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily (Multiple meals)</SelectItem>
                  <SelectItem value="frequent">Frequent (Once daily)</SelectItem>
                  <SelectItem value="moderate">Moderate (Few times a week)</SelectItem>
                  <SelectItem value="occasional">Occasional (Once a week)</SelectItem>
                  <SelectItem value="rare">Rare (Few times a month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dairy Consumption */}
      {(formData.dietType === 'omnivore' || formData.dietType === 'pescatarian' || formData.dietType === 'vegetarian') && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Apple className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Dairy Consumption</CardTitle>
            </div>
            <CardDescription>
              Your consumption of dairy products (milk, cheese, yogurt)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dairyFrequency">Dairy Consumption Level</Label>
              <Select value={formData.dairyFrequency} onValueChange={(value) => handleInputChange('dairyFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select consumption level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Multiple servings daily)</SelectItem>
                  <SelectItem value="moderate">Moderate (Daily consumption)</SelectItem>
                  <SelectItem value="low">Low (Few times a week)</SelectItem>
                  <SelectItem value="very-low">Very Low (Rarely)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Food Sourcing */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Salad className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Food Sourcing</CardTitle>
          </div>
          <CardDescription>
            Where and how you source your food
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="localFood">Local Food Consumption</Label>
              <Select value={formData.localFood} onValueChange={(value) => handleInputChange('localFood', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select local food level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Mostly local/seasonal)</SelectItem>
                  <SelectItem value="moderate">Moderate (Some local food)</SelectItem>
                  <SelectItem value="low">Low (Occasional local food)</SelectItem>
                  <SelectItem value="none">None (No focus on local)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organicFood">Organic Food Consumption</Label>
              <Select value={formData.organicFood} onValueChange={(value) => handleInputChange('organicFood', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organic food level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Mostly organic)</SelectItem>
                  <SelectItem value="moderate">Moderate (Some organic)</SelectItem>
                  <SelectItem value="low">Low (Occasional organic)</SelectItem>
                  <SelectItem value="none">None (No organic focus)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Habits */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Fish className="h-5 w-5 text-teal-600" />
            <CardTitle className="text-lg">Food Habits</CardTitle>
          </div>
          <CardDescription>
            Your food consumption and waste patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foodWaste">Food Waste Level</Label>
              <Select value={formData.foodWaste} onValueChange={(value) => handleInputChange('foodWaste', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Minimal waste)</SelectItem>
                  <SelectItem value="moderate">Moderate (Some waste)</SelectItem>
                  <SelectItem value="high">High (Significant waste)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diningOut">Dining Out Frequency</Label>
              <Select value={formData.diningOut} onValueChange={(value) => handleInputChange('diningOut', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="frequent">Frequent (4-6 times/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (2-3 times/week)</SelectItem>
                  <SelectItem value="occasional">Occasional (Once/week)</SelectItem>
                  <SelectItem value="rare">Rare (Few times/month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Continue
        </Button>
      </div>
    </form>
  );
}