'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/ui/footer';
import { 
  Leaf, 
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Code,
  Lightbulb,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">EcoTrack</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">About</span>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Project Story */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About EcoTrack
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passion project dedicated to helping individuals understand and reduce their environmental impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Code className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">The Project</h2>
              </div>
              <p className="text-gray-600 mb-4">
                EcoTrack was born from a desire to make carbon footprint tracking accessible and engaging. 
                Using modern web technologies and accurate emission calculations, we&apos;ve created a platform 
                that helps users understand their environmental impact and take meaningful action.
              </p>
              <p className="text-gray-600">
                Built with Next.js, TypeScript, and Tailwind CSS, EcoTrack combines beautiful design with 
                powerful functionality to deliver an exceptional user experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">The Developer</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Hi! I&apos;m Harsh Shukla, a passionate developer focused on creating meaningful applications 
                that make a positive impact. With a background in Computer Science and Engineering and a passion for sustainability, I combine technical 
                expertise with a commitment to sustainability.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/shuklaharsh05" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="mailto:harshshukla5092002@gmail.com"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="border-0 shadow-lg mb-16">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              At EcoTrack, we believe that small actions can lead to big changes. Our mission is to 
              empower individuals with the knowledge and tools they need to make sustainable choices 
              and reduce their carbon footprint. By making environmental impact tracking accessible 
              and engaging, we hope to inspire a community of eco-conscious individuals working 
              together for a better future.
            </p>
          </CardContent>
        </Card> 

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or suggestions? I&apos;d love to hear from you!
          </p>
          <a href="mailto:harshshukla5092002@gmail.com">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Mail className="h-4 w-4 mr-2" />
              Contact Me
            </Button>
          </a>
        </div>
      </div>
      <Footer />
    </div>

    
  );
} 