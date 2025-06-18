'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Car, Plane, Train, Bus, Bike } from 'lucide-react';

interface TransportFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function TransportForm({ onComplete, initialData = {} }: TransportFormProps) {
  const [formData, setFormData] = useState({
    carType: '',
    carMiles: '',
    carDays: '',
    publicTransport: '',
    publicMiles: '',
    flights: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.carType && formData.carMiles) {
      newErrors.carType = 'Please select car type';
    }
    
    if (formData.carMiles && (!formData.carDays || parseInt(formData.carDays) < 0 || parseInt(formData.carDays) > 7)) {
      newErrors.carDays = 'Please enter valid days per week (0-7)';
    }

    if (formData.carMiles && (parseInt(formData.carMiles) < 0 || parseInt(formData.carMiles) > 1000)) {
      newErrors.carMiles = 'Please enter valid miles per day (0-1000)';
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Car Transportation */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Personal Vehicle</CardTitle>
          </div>
          <CardDescription>
            Information about your car usage for daily commuting and regular trips
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carType">Vehicle Type</Label>
              <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Car (Compact)</SelectItem>
                  <SelectItem value="medium">Medium Car (Sedan)</SelectItem>
                  <SelectItem value="large">Large Car (SUV)</SelectItem>
                  <SelectItem value="hybrid">Hybrid Vehicle</SelectItem>
                  <SelectItem value="electric">Electric Vehicle</SelectItem>
                </SelectContent>
              </Select>
              {errors.carType && <p className="text-sm text-red-600">{errors.carType}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carMiles">Miles per Day</Label>
              <Input
                id="carMiles"
                type="number"
                placeholder="e.g., 30"
                value={formData.carMiles}
                onChange={(e) => handleInputChange('carMiles', e.target.value)}
                min="0"
                max="1000"
              />
              {errors.carMiles && <p className="text-sm text-red-600">{errors.carMiles}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carDays">Days per Week</Label>
              <Input
                id="carDays"
                type="number"
                placeholder="e.g., 5"
                value={formData.carDays}
                onChange={(e) => handleInputChange('carDays', e.target.value)}
                min="0"
                max="7"
              />
              {errors.carDays && <p className="text-sm text-red-600">{errors.carDays}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Public Transportation */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bus className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Public Transportation</CardTitle>
          </div>
          <CardDescription>
            Bus, train, subway, and other public transport usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publicTransport">Primary Public Transport</Label>
              <Select value={formData.publicTransport} onValueChange={(value) => handleInputChange('publicTransport', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="train">Train/Subway</SelectItem>
                  <SelectItem value="mixed">Mixed (Bus + Train)</SelectItem>
                  <SelectItem value="none">No Public Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publicMiles">Miles per Week</Label>
              <Input
                id="publicMiles"
                type="number"
                placeholder="e.g., 50"
                value={formData.publicMiles}
                onChange={(e) => handleInputChange('publicMiles', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Air Travel */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Air Travel</CardTitle>
          </div>
          <CardDescription>
            Flights taken in the past year (including business and leisure)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="flights">Number of Flights per Year</Label>
            <Select value={formData.flights} onValueChange={(value) => handleInputChange('flights', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select flight frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No flights</SelectItem>
                <SelectItem value="1-2">1-2 flights</SelectItem>
                <SelectItem value="3-5">3-5 flights</SelectItem>
                <SelectItem value="6-10">6-10 flights</SelectItem>
                <SelectItem value="10+">More than 10 flights</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Continue to Home Energy
        </Button>
      </div>
    </form>
  );
}