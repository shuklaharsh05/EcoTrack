'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Car, 
  Home, 
  Utensils, 
  ShoppingBag,
  ArrowLeft,
  Lightbulb,
  Target,
  TrendingDown,
  CheckCircle,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/footer';

export default function TipsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [emissions, setEmissions] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ecotrack_auth');
    const userData = localStorage.getItem('ecotrack_user');
    const emissionsData = localStorage.getItem('ecotrack_emissions');
    
    if (!auth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (emissionsData) {
        setEmissions(JSON.parse(emissionsData));
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const transportTips = [
    {
      title: "Switch to Public Transportation",
      description: "Use buses, trains, or subways instead of driving alone",
      impact: "High",
      difficulty: "Easy",
      savings: "2,300 kg CO₂/year",
      icon: Car
    },
    {
      title: "Work from Home",
      description: "Reduce commuting by working remotely 2-3 days per week",
      impact: "High",
      difficulty: "Medium",
      savings: "1,600 kg CO₂/year",
      icon: Home
    },
    {
      title: "Bike or Walk Short Distances",
      description: "Use active transportation for trips under 3 miles",
      impact: "Medium",
      difficulty: "Easy",
      savings: "800 kg CO₂/year",
      icon: Car
    },
    {
      title: "Combine Errands",
      description: "Plan multiple stops in one trip to reduce total driving",
      impact: "Medium",
      difficulty: "Easy",
      savings: "400 kg CO₂/year",
      icon: Target
    }
  ];

  const homeTips = [
    {
      title: "Switch to LED Bulbs",
      description: "Replace all incandescent bulbs with energy-efficient LEDs",
      impact: "Medium",
      difficulty: "Easy",
      savings: "300 kg CO₂/year",
      icon: Lightbulb
    },
    {
      title: "Adjust Thermostat",
      description: "Lower heating by 2°F in winter, raise cooling by 2°F in summer",
      impact: "High",
      difficulty: "Easy",
      savings: "900 kg CO₂/year",
      icon: Home
    },
    {
      title: "Unplug Electronics",
      description: "Unplug devices when not in use to eliminate phantom loads",
      impact: "Low",
      difficulty: "Easy",
      savings: "200 kg CO₂/year",
      icon: Lightbulb
    },
    {
      title: "Improve Insulation",
      description: "Add insulation to attic, walls, and basement",
      impact: "High",
      difficulty: "Hard",
      savings: "1,200 kg CO₂/year",
      icon: Home
    }
  ];

  const foodTips = [
    {
      title: "Reduce Meat Consumption",
      description: "Try Meatless Monday or reduce meat portions",
      impact: "High",
      difficulty: "Medium",
      savings: "1,100 kg CO₂/year",
      icon: Utensils
    },
    {
      title: "Buy Local and Seasonal",
      description: "Choose locally grown, seasonal produce",
      impact: "Medium",
      difficulty: "Easy",
      savings: "500 kg CO₂/year",
      icon: Leaf
    },
    {
      title: "Reduce Food Waste",
      description: "Plan meals, store food properly, and compost scraps",
      impact: "Medium",
      difficulty: "Easy",
      savings: "600 kg CO₂/year",
      icon: Utensils
    },
    {
      title: "Grow Your Own Food",
      description: "Start a small garden or herb collection",
      impact: "Low",
      difficulty: "Medium",
      savings: "200 kg CO₂/year",
      icon: Leaf
    }
  ];

  const shoppingTips = [
    {
      title: "Buy Second-Hand",
      description: "Shop at thrift stores, consignment shops, or online marketplaces",
      impact: "Medium",
      difficulty: "Easy",
      savings: "400 kg CO₂/year",
      icon: ShoppingBag
    },
    {
      title: "Choose Quality Over Quantity",
      description: "Invest in durable, long-lasting products",
      impact: "Medium",
      difficulty: "Easy",
      savings: "300 kg CO₂/year",
      icon: Star
    },
    {
      title: "Repair Instead of Replace",
      description: "Fix broken items instead of buying new ones",
      impact: "Medium",
      difficulty: "Medium",
      savings: "250 kg CO₂/year",
      icon: Target
    },
    {
      title: "Minimize Packaging",
      description: "Choose products with minimal or recyclable packaging",
      impact: "Low",
      difficulty: "Easy",
      savings: "150 kg CO₂/year",
      icon: ShoppingBag
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TipCard = ({ tip, category }: { tip: any, category: string }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <tip.icon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{tip.title}</CardTitle>
              <CardDescription className="mt-1">
                {tip.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge className={getImpactColor(tip.impact)}>
              {tip.impact} Impact
            </Badge>
            <Badge className={getDifficultyColor(tip.difficulty)}>
              {tip.difficulty}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-emerald-600">
              Save {tip.savings}
            </div>
          </div>
        </div>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark as Done
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">EcoTrack</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Eco Tips</span>
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Personalized Eco Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover actionable ways to reduce your carbon footprint based on your lifestyle. 
            Small changes can make a big difference for our planet.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Up to 50%
              </div>
              <div className="text-gray-600">
                Potential CO₂ Reduction
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                24
              </div>
              <div className="text-gray-600">
                Actionable Tips
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Easy
              </div>
              <div className="text-gray-600">
                Implementation
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips by Category */}
        <Tabs defaultValue="transport" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="transport" className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span>Transport</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Food</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Shopping</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transport">
            <div className="grid md:grid-cols-2 gap-6">
              {transportTips.map((tip, index) => (
                <TipCard key={index} tip={tip} category="transport" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="home">
            <div className="grid md:grid-cols-2 gap-6">
              {homeTips.map((tip, index) => (
                <TipCard key={index} tip={tip} category="home" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="food">
            <div className="grid md:grid-cols-2 gap-6">
              {foodTips.map((tip, index) => (
                <TipCard key={index} tip={tip} category="food" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping">
            <div className="grid md:grid-cols-2 gap-6">
              {shoppingTips.map((tip, index) => (
                <TipCard key={index} tip={tip} category="shopping" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-600 to-green-600">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Take Action?
              </h2>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                Start implementing these tips today and track your progress. 
                Every small action contributes to a more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/track">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                    Recalculate Footprint
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}