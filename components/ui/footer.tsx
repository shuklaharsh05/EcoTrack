import { Leaf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <>
                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <a href="/" className="flex items-center space-x-2">
                  <Leaf className="h-8 w-8 text-emerald-400" />
                  <span className="text-xl font-bold">EcoTrack</span>
                </a>
              </div>
              <p className="text-gray-300 text-sm">
                Empowering individuals to make sustainable choices and reduce their environmental impact.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {/* <li><Link href="/track" className="hover:text-emerald-400 transition-all duration-300">Carbon Calculator</Link></li> */}
                {/* <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li> */}
                <li><Link href="/tips" className="hover:text-emerald-400 transition-all duration-300">Eco Tips</Link></li>
                <li><Link href="/offset" className="hover:text-emerald-400 transition-all duration-300">Carbon Reduction Programs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-emerald-400 transition-all duration-300">About Us</Link></li>
                {/* <li><Link href="/contact" className="hover:text-emerald-400 transition-all duration-300">Contact</Link></li> */}
                <li><Link href="/faqs" className="hover:text-emerald-400 transition-all duration-300">FAQs</Link></li>
                {/* <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect with us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-all duration-300">GitHub</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-all duration-300">LinkedIn</a></li>
                {/* <li><a href="#" className="hover:text-emerald-400 transition-colors">Newsletter</a></li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 EcoTrack. All rights reserved. Made with 💚 for the planet.</p>
            <div className="mt-2 text-gray-400">
              <p>Developed by <a href="mailto:harshshukla509200@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">Harsh Shukla</a></p>
              <p className="mt-1">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">GitHub</a>
                {' • '}
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}