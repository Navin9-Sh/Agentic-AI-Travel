'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Plane, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-sky-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              TravelAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/demo" className="text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors">
              Demo
            </Link>
            <Link href="/features" className="text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors">
              Pricing
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost" className="text-sky-600 hover:text-sky-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-sky-200/50 dark:border-gray-700/50"
        >
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/demo" 
              className="block text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Demo
            </Link>
            <Link 
              href="/features" 
              className="block text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="block text-gray-600 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}