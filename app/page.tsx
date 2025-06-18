'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Calculator, 
  TrendingDown, 
  Users, 
  ArrowRight,
  Zap,
  Car,
  Home,
  ShoppingBag,
  Award,
  Star,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/ui/footer';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    // Check authentication
    const auth = localStorage.getItem('ecotrack_auth');
    const userData = localStorage.getItem('ecotrack_user');
    
    if (auth && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ecotrack_auth');
    localStorage.removeItem('ecotrack_user');
    localStorage.removeItem('ecotrack_emissions');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  const features = [
    {
      icon: Calculator,
      title: "Easy Calculation",
      description: "Simple step-by-step process to calculate your carbon footprint accurately"
    },
    {
      icon: TrendingDown,
      title: "Track Progress",
      description: "Monitor your emissions over time and see your impact reduction"
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get badges and achievements for reaching your sustainability goals"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of eco-conscious individuals making a difference"
    }
  ];

  const categories = [
    {
      icon: Car,
      title: "Transportation",
      description: "Track your daily commute and travel emissions",
      color: "bg-blue-500"
    },
    {
      icon: Home,
      title: "Home Energy",
      description: "Monitor electricity, gas, and water usage",
      color: "bg-green-500"
    },
    {
      icon: ShoppingBag,
      title: "Shopping",
      description: "Calculate emissions from purchases and lifestyle",
      color: "bg-purple-500"
    },
    {
      icon: Leaf,
      title: "Food & Diet",
      description: "Understand your dietary impact on the environment",
      color: "bg-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Advocate",
      content: "EcoTrack helped me reduce my carbon footprint by 30% in just 6 months!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Sustainability Manager",
      content: "The insights and tips are incredibly valuable. I've changed my daily habits completely.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Student",
      content: "User-friendly interface makes tracking my environmental impact so simple.",
      rating: 5
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "2.5M kg", label: "CO₂ Reduced" },
    { value: "95%", label: "User Satisfaction" },
    { value: "50+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">EcoTrack</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">
                How it Works
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Testimonials
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Welcome back,</div>
                    <div className="font-semibold text-gray-900">{user?.name || 'User'}</div>
                  </div>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 border">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Carbon Footprint
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take control of your environmental impact with our comprehensive carbon footprint calculator. 
              Track, analyze, and reduce your emissions while making a positive difference for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/track">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {/* <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg">
                  View Demo
                </Button>
              </Link> */}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EcoTrack?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to understand and reduce your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your carbon footprint across all areas of your life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/track">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of people who are already making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start tracking your carbon footprint today and join the movement towards a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="border-white text-emerald-600 bg-white hover:bg-gray-100 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}