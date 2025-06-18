'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  ArrowLeft,
  ExternalLink,
  Shield,
  Award,
  Globe,
  TreePine,
  Wind,
  Sun,
  Droplets
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/footer';

export default function OffsetPage() {
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

  const currentEmissions = emissions?.totalEmissions || { total: 14500 };
  const offsetCost = Math.round((currentEmissions.total / 1000) * 25); // $25 per ton

  const offsetPrograms = [
    {
      name: "Gold Standard",
      description: "High-quality carbon credits from renewable energy and forestry projects",
      price: "$25/ton",
      rating: 4.8,
      projects: "Renewable Energy, Forest Protection",
      verification: "Third-party verified",
      icon: Award,
      color: "bg-yellow-500",
      url: "https://www.goldstandard.org"
    },
    {
      name: "Verified Carbon Standard",
      description: "World's most used voluntary GHG program with rigorous standards",
      price: "$22/ton",
      rating: 4.7,
      projects: "REDD+, Clean Energy, Waste Management",
      verification: "VCS verified",
      icon: Shield,
      color: "bg-blue-500",
      url: "https://verra.org"
    },
    {
      name: "Climate Action Reserve",
      description: "North American carbon offset registry with transparent protocols",
      price: "$28/ton",
      rating: 4.6,
      projects: "Forest Carbon, Methane Capture",
      verification: "CAR verified",
      icon: TreePine,
      color: "bg-green-500",
      url: "https://www.climateactionreserve.org"
    },
    {
      name: "American Carbon Registry",
      description: "First private voluntary greenhouse gas registry in the world",
      price: "$24/ton",
      rating: 4.5,
      projects: "Forestry, Agriculture, Renewable Energy",
      verification: "ACR verified",
      icon: Globe,
      color: "bg-emerald-500",
      url: "https://americancarbonregistry.org"
    }
  ];

  const projectTypes = [
    {
      name: "Renewable Energy",
      description: "Wind, solar, and hydroelectric projects that replace fossil fuel energy",
      icon: Wind,
      impact: "High",
      examples: ["Wind farms in developing countries", "Solar installations", "Small hydroelectric projects"]
    },
    {
      name: "Forest Conservation",
      description: "Protecting existing forests and preventing deforestation",
      icon: TreePine,
      impact: "High",
      examples: ["REDD+ projects", "Forest protection initiatives", "Sustainable forest management"]
    },
    {
      name: "Reforestation",
      description: "Planting new trees and restoring degraded forest lands",
      icon: Leaf,
      impact: "Medium",
      examples: ["Tree planting programs", "Habitat restoration", "Agroforestry projects"]
    },
    {
      name: "Clean Water",
      description: "Providing clean water access and reducing water treatment emissions",
      icon: Droplets,
      impact: "Medium",
      examples: ["Water purification systems", "Well drilling projects", "Water conservation initiatives"]
    }
  ];

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
              <span className="text-gray-600">Carbon Reduction Programs</span>
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
            Carbon Reduction Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reduce your carbon footprint by supporting verified climate projects around the world. 
            Make a positive impact while working towards carbon neutrality.
          </p>
        </div>

        {/* Your Emissions Summary */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Carbon Footprint</CardTitle>
            <CardDescription>
              Based on your latest calculation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {(currentEmissions.total / 1000).toFixed(1)} tons
                </div>
                <div className="text-gray-600">Annual CO₂ Emissions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${offsetCost}
                </div>
                <div className="text-gray-600">Estimated Offset Cost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Carbon Neutral Goal</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offset Programs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Carbon Reduction Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {offsetPrograms.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${program.color} rounded-full flex items-center justify-center`}>
                        <program.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{program.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full ${
                                  i < Math.floor(program.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{program.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {program.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Project Types:</span>
                      <span className="font-medium">{program.projects}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Verification:</span>
                      <span className="font-medium">{program.verification}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a href={program.url} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Carbon Reduction Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projectTypes.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <project.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={`${
                        project.impact === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800'
                      }`}>
                        {project.impact} Impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {project.examples.map((example, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-emerald-600 rounded-full mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-600 to-green-600">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Go Carbon Neutral?
            </h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Choose a verified carbon reduction program and make a positive impact on the environment. 
              Your contribution supports projects that reduce greenhouse gas emissions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link href="/track">
                <Button size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-300">
                  Calculate Exact Offset
                </Button>
              </Link> */}
              <Link href="/tips">
                <Button size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}