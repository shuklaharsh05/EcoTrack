'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Droplets, Flame, Home } from 'lucide-react';

interface HomeFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function HomeForm({ onComplete, initialData = {} }: HomeFormProps) {
  const [formData, setFormData] = useState({
    homeType: '',
    homeSize: '',
    electricityBill: '',
    heatingType: '',
    heatingBill: '',
    waterBill: '',
    residents: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.homeType) {
      newErrors.homeType = 'Please select home type';
    }
    
    if (!formData.homeSize) {
      newErrors.homeSize = 'Please select home size';
    }

    if (!formData.residents || parseInt(formData.residents) < 1 || parseInt(formData.residents) > 20) {
      newErrors.residents = 'Please enter valid number of residents (1-20)';
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
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Home Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Home Information</CardTitle>
          </div>
          <CardDescription>
            Basic information about your home and household
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="homeType">Home Type</Label>
              <Select value={formData.homeType} onValueChange={(value) => handleInputChange('homeType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select home type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
              {errors.homeType && <p className="text-sm text-red-600">{errors.homeType}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="homeSize">Home Size</Label>
              <Select value={formData.homeSize} onValueChange={(value) => handleInputChange('homeSize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (&lt; 1,000 sq ft)</SelectItem>
                  <SelectItem value="medium">Medium (1,000-2,000 sq ft)</SelectItem>
                  <SelectItem value="large">Large (2,000-3,000 sq ft)</SelectItem>
                  <SelectItem value="very-large">Very Large (&gt; 3,000 sq ft)</SelectItem>
                </SelectContent>
              </Select>
              {errors.homeSize && <p className="text-sm text-red-600">{errors.homeSize}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="residents">Number of Residents</Label>
              <Input
                id="residents"
                type="number"
                placeholder="e.g., 3"
                value={formData.residents}
                onChange={(e) => handleInputChange('residents', e.target.value)}
                min="1"
                max="20"
              />
              {errors.residents && <p className="text-sm text-red-600">{errors.residents}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Electricity Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Electricity Usage</CardTitle>
          </div>
          <CardDescription>
            Your monthly electricity consumption and costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="electricityBill">Average Monthly Electricity Bill ($)</Label>
            <Input
              id="electricityBill"
              type="number"
              placeholder="e.g., 120"
              value={formData.electricityBill}
              onChange={(e) => handleInputChange('electricityBill', e.target.value)}
              min="0"
            />
            <p className="text-sm text-gray-500">
              Check your recent electricity bills for an accurate estimate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Heating & Cooling */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Heating & Cooling</CardTitle>
          </div>
          <CardDescription>
            Your home&apos;s heating and cooling system information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heatingType">Primary Heating Source</Label>
              <Select value={formData.heatingType} onValueChange={(value) => handleInputChange('heatingType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select heating type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural-gas">Natural Gas</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="oil">Heating Oil</SelectItem>
                  <SelectItem value="propane">Propane</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heatingBill">Average Monthly Heating Bill ($)</Label>
              <Input
                id="heatingBill"
                type="number"
                placeholder="e.g., 80"
                value={formData.heatingBill}
                onChange={(e) => handleInputChange('heatingBill', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Water Usage</CardTitle>
          </div>
          <CardDescription>
            Your household water consumption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="waterBill">Average Monthly Water Bill ($)</Label>
            <Input
              id="waterBill"
              type="number"
              placeholder="e.g., 45"
              value={formData.waterBill}
              onChange={(e) => handleInputChange('waterBill', e.target.value)}
              min="0"
            />
            <p className="text-sm text-gray-500">
              Include water, sewer, and any related fees
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Continue to Food & Diet
        </Button>
      </div>
    </form>
  );
}