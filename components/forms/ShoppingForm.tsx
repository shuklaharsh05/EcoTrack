'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Shirt, Smartphone, Package } from 'lucide-react';

interface ShoppingFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function ShoppingForm({ onComplete, initialData = {} }: ShoppingFormProps) {
  const [formData, setFormData] = useState({
    clothingSpending: '',
    clothingFrequency: '',
    electronicsSpending: '',
    electronicsFrequency: '',
    generalShopping: '',
    shoppingHabits: '',
    secondHand: '',
    packaging: '',
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Clothing */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shirt className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Clothing & Fashion</CardTitle>
          </div>
          <CardDescription>
            Your clothing purchasing habits and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clothingSpending">Monthly Clothing Spending ($)</Label>
              <Input
                id="clothingSpending"
                type="number"
                placeholder="e.g., 100"
                value={formData.clothingSpending}
                onChange={(e) => handleInputChange('clothingSpending', e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clothingFrequency">Shopping Frequency</Label>
              <Select value={formData.clothingFrequency} onValueChange={(value) => handleInputChange('clothingFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Electronics */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Electronics & Technology</CardTitle>
          </div>
          <CardDescription>
            Your electronics purchasing and replacement patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="electronicsSpending">Annual Electronics Spending ($)</Label>
              <Input
                id="electronicsSpending"
                type="number"
                placeholder="e.g., 500"
                value={formData.electronicsSpending}
                onChange={(e) => handleInputChange('electronicsSpending', e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="electronicsFrequency">Device Replacement Frequency</Label>
              <Select value={formData.electronicsFrequency} onValueChange={(value) => handleInputChange('electronicsFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Every year</SelectItem>
                  <SelectItem value="2-3-years">Every 2-3 years</SelectItem>
                  <SelectItem value="3-5-years">Every 3-5 years</SelectItem>
                  <SelectItem value="5-plus-years">5+ years</SelectItem>
                  <SelectItem value="when-broken">Only when broken</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Shopping */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">General Shopping</CardTitle>
          </div>
          <CardDescription>
            Your overall shopping habits and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="generalShopping">Monthly Non-Food Shopping ($)</Label>
              <Input
                id="generalShopping"
                type="number"
                placeholder="e.g., 200"
                value={formData.generalShopping}
                onChange={(e) => handleInputChange('generalShopping', e.target.value)}
                min="0"
              />
              <p className="text-sm text-gray-500">
                Household items, personal care, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shoppingHabits">Shopping Preference</Label>
              <Select value={formData.shoppingHabits} onValueChange={(value) => handleInputChange('shoppingHabits', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Primarily Online</SelectItem>
                  <SelectItem value="in-store">Primarily In-Store</SelectItem>
                  <SelectItem value="mixed">Mixed (Online + In-Store)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Shopping */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">Sustainable Shopping</CardTitle>
          </div>
          <CardDescription>
            Your eco-friendly shopping practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secondHand">Second-Hand Shopping</Label>
              <Select value={formData.secondHand} onValueChange={(value) => handleInputChange('secondHand', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frequently">Frequently</SelectItem>
                  <SelectItem value="sometimes">Sometimes</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="packaging">Packaging Preference</Label>
              <Select value={formData.packaging} onValueChange={(value) => handleInputChange('packaging', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Prefer minimal packaging</SelectItem>
                  <SelectItem value="eco-friendly">Prefer eco-friendly packaging</SelectItem>
                  <SelectItem value="standard">Standard packaging is fine</SelectItem>
                  <SelectItem value="no-preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Complete Assessment
        </Button>
      </div>
    </form>
  );
}