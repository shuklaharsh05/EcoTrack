'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  TrendingDown, 
  TrendingUp,
  Target,
  Award,
  Car,
  Home,
  Utensils,
  ShoppingBag,
  Calculator as CalculatorIcon,
  Settings,
  Share2,
  Download,
  FileText,
  FileJson,
  FileSpreadsheet
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [emissions, setEmissions] = useState<any>(null);
  const [goal, setGoal] = useState(12000); // Default goal: 12 tons CO2/year
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

  const handleLogout = () => {
    localStorage.removeItem('ecotrack_auth');
    localStorage.removeItem('ecotrack_user');
    localStorage.removeItem('ecotrack_emissions');
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const mockEmissions = {
    total: 14500,
    breakdown: {
      transport: 6200,
      home: 4800,
      food: 2100,
      shopping: 1400
    },
    dailyAverage: 40,
    monthlyAverage: 1208,
    comparedToAverage: 91
  };

  const currentEmissions = emissions?.totalEmissions || mockEmissions;
  
  const pieData = [
    { name: 'Transportation', value: currentEmissions.breakdown.transport, color: '#3B82F6' },
    { name: 'Home Energy', value: currentEmissions.breakdown.home, color: '#10B981' },
    { name: 'Food & Diet', value: currentEmissions.breakdown.food, color: '#F59E0B' },
    { name: 'Shopping', value: currentEmissions.breakdown.shopping, color: '#8B5CF6' },
  ];

  const monthlyData = [
    { month: 'Jan', emissions: 1350, goal: 1000 },
    { month: 'Feb', emissions: 1200, goal: 1000 },
    { month: 'Mar', emissions: 1100, goal: 1000 },
    { month: 'Apr', emissions: 1250, goal: 1000 },
    { month: 'May', emissions: 1150, goal: 1000 },
    { month: 'Jun', emissions: 1000, goal: 1000 },
  ];

  const achievements = [
    { title: 'First Calculation', description: 'Completed your first carbon footprint assessment', earned: true },
    { title: 'Eco Warrior', description: 'Reduced emissions by 10%', earned: false },
    { title: 'Green Commuter', description: 'Used public transport 20 days', earned: true },
    { title: 'Energy Saver', description: 'Reduced home energy by 15%', earned: false },
  ];

  const goalProgress = Math.round((1 - (currentEmissions.total / goal)) * 100);

  const handleShareProgress = async () => {
    try {
      const shareData = {
        title: 'My Carbon Footprint Progress',
        text: `I've reduced my carbon footprint by ${goalProgress}% compared to my target of ${(goal/1000).toFixed(1)} tons CO₂/year! Check out my progress on EcoTrack.`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareData.text);
        alert('Progress copied to clipboard! You can now share it anywhere.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Unable to share progress. Please try again.');
    }
  };

  const generateCSV = (data: any) => {
    const headers = [
      'Category',
      'Emissions (kg CO₂)',
      'Percentage of Total'
    ];
    
    const rows = [
      ['Transportation', data.breakdown.transport, `${Math.round((data.breakdown.transport / data.total) * 100)}%`],
      ['Home Energy', data.breakdown.home, `${Math.round((data.breakdown.home / data.total) * 100)}%`],
      ['Food & Diet', data.breakdown.food, `${Math.round((data.breakdown.food / data.total) * 100)}%`],
      ['Shopping', data.breakdown.shopping, `${Math.round((data.breakdown.shopping / data.total) * 100)}%`],
      ['Total', data.total, '100%'],
      ['Goal', goal, ''],
      ['Progress', `${goalProgress}%`, '']
    ];

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const generateTextReport = (data: any) => {
    return `EcoTrack Carbon Footprint Report
Generated on: ${new Date().toLocaleDateString()}

YOUR CARBON FOOTPRINT SUMMARY
----------------------------
Total Emissions: ${(data.total / 1000).toFixed(1)} tons CO₂
Annual Goal: ${(goal / 1000).toFixed(1)} tons CO₂
Progress: ${goalProgress}% ${goalProgress > 0 ? 'better than' : 'worse than'} target

EMISSIONS BREAKDOWN
------------------
Transportation: ${(data.breakdown.transport / 1000).toFixed(1)} tons (${Math.round((data.breakdown.transport / data.total) * 100)}%)
Home Energy: ${(data.breakdown.home / 1000).toFixed(1)} tons (${Math.round((data.breakdown.home / data.total) * 100)}%)
Food & Diet: ${(data.breakdown.food / 1000).toFixed(1)} tons (${Math.round((data.breakdown.food / data.total) * 100)}%)
Shopping: ${(data.breakdown.shopping / 1000).toFixed(1)} tons (${Math.round((data.breakdown.shopping / data.total) * 100)}%)

ADDITIONAL METRICS
-----------------
Daily Average: ${Math.round(data.total / 365)} kg CO₂
Monthly Average: ${Math.round(data.total / 12)} kg CO₂
Compared to US Average: ${Math.round((data.total / 16000) * 100)}% of average

Thank you for using EcoTrack to monitor your carbon footprint!`;
  };

  const handleExportReport = (format: 'json' | 'csv' | 'txt') => {
    try {
      const reportData = {
        total: currentEmissions.total,
        breakdown: currentEmissions.breakdown,
        goal: goal,
        progress: goalProgress,
        date: new Date().toISOString()
      };

      let content: string;
      let mimeType: string;
      let fileExtension: string;

      switch (format) {
        case 'csv':
          content = generateCSV(reportData);
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        case 'txt':
          content = generateTextReport(reportData);
          mimeType = 'text/plain';
          fileExtension = 'txt';
          break;
        default:
          content = JSON.stringify(reportData, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ecotrack-report-${new Date().toISOString().split('T')[0]}.${fileExtension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Unable to export report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">EcoTrack</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Welcome back,</div>
                <div className="font-semibold text-gray-900">{user?.name || 'User'}</div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Emissions</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(currentEmissions.total / 1000).toFixed(1)}
                    <span className="text-sm font-normal text-gray-500 ml-1">tons CO₂</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Average</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {currentEmissions.dailyAverage}
                    <span className="text-sm font-normal text-gray-500 ml-1">kg CO₂</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">vs. US Average</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {currentEmissions.comparedToAverage}%
                    <span className="text-sm font-normal text-gray-500 ml-1">of avg</span>
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentEmissions.comparedToAverage > 100 ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {currentEmissions.comparedToAverage > 100 ? (
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Goal Progress</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.max(0, goalProgress)}%
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {goalProgress > 0 ? 'better than' : 'worse than'} target
                    </span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts and Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emissions Breakdown */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Emissions Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Your carbon footprint by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{item.value} kg</div>
                          <div className="text-xs text-gray-500">
                            {Math.round((item.value / currentEmissions.total) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>
                  Track your progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                      <Line 
                        type="monotone" 
                        dataKey="emissions" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="goal" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/track">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <CalculatorIcon className="h-4 w-4 mr-2" />
                    Recalculate Footprint
                  </Button>
                </Link>
                <Link href="/tips">
                  <Button variant="outline" className="w-full">
                    <Leaf className="h-4 w-4 mr-2" />
                    Get Eco Tips
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShareProgress}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleExportReport('txt')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as Text
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => handleExportReport('csv')}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => handleExportReport('json')}>
                      <FileJson className="h-4 w-4 mr-2" />
                      Export as JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* Goal Setting */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Your Goal</CardTitle>
                <CardDescription>
                  Target: {(goal / 1000).toFixed(1)} tons CO₂ per year
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {(currentEmissions.total / 1000).toFixed(1)} tons
                  </div>
                  <div className="text-sm text-gray-500">Your Current Emissions</div>
                </div>
                {/* <Progress value={Math.max(0, goalProgress)} className="h-2" /> */}
                <div className="text-sm text-gray-600">
                  {goalProgress > 0 
                    ? `You're doing great! Your emissions are ${goalProgress}% lower than your target` 
                    : `You're ${Math.abs(goalProgress)}% above your target emissions`
                  }
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>
                  Your sustainability milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <Award className={`h-4 w-4 ${
                        achievement.earned ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-emerald-100 text-emerald-800">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}