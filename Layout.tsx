"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import { createPageUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Facebook, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', page: 'Home' },
  { name: 'About', page: 'About' },
  { name: 'Programmes', page: 'Programs' },
  { name: 'Gallery', page: 'Gallery' },
  { name: 'Blog', page: 'Blog' },
  { name: 'Contact', page: 'Contact' }
];

export default function Layout({ 
  children, 
  currentPageName 
}: { 
  children: React.ReactNode, 
  currentPageName?: string 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user] = useState<{role: string} | null>(null); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin pages usually don't want the main header/footer
  const isAdminPage = currentPageName === 'Admin';

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-linear-to-r from-orange-600 to-orange-500 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:0798395149" className="flex items-center gap-2 hover:text-orange-100 transition-colors">
              <Phone className="w-4 h-4" /> 079 839 5149
            </a>
            <a href="mailto:info@landofjoy.co.za" className="flex items-center gap-2 hover:text-orange-100 transition-colors">
              <Mail className="w-4 h-4" /> info@landofjoy.co.za
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/192120381211327" target="_blank" rel="noopener noreferrer" className="hover:text-orange-100 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <span>NPO 017-735</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">LJ</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Land of Joy</h1>
                <p className="text-xs text-gray-500">Day Care Centre</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  href={createPageUrl(item.page)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentPageName === item.page
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA & Admin */}
            <div className="hidden lg:flex items-center gap-3">
              {user?.role === 'admin' && (
                <Link href={createPageUrl('Admin')}>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Settings className="w-4 h-4 mr-1" /> Admin
                  </Button>
                </Link>
              )}
              <Link href={createPageUrl('Contact')}>
                <Button className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full px-6">
                  Enrol Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.page}
                    href={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      currentPageName === item.page
                        ? 'bg-orange-100 text-orange-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={createPageUrl('Contact')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl font-medium bg-orange-500 text-white text-center"
                >
                  Enrol Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">LJ</span>
                </div>
                <h3 className="font-bold text-lg">Land of Joy</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Award-winning early childhood development centre nurturing young minds since 2000.
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.page}>
                    <Link href={createPageUrl(item.page)} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programmes */}
            <div>
              <h3 className="font-bold text-lg mb-4">Our Programmes</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Babies (3 months - 1 year)</li>
                <li>Toddlers (1 - 2 years)</li>
                <li>Pre-School (3 - 4 years)</li>
                <li>Grade R (5 - 6 years)</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:0798395149" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
                    <Phone className="w-4 h-4" /> 079 839 5149
                  </a>
                </li>
                <li>
                  <a href="mailto:info@landofjoy.co.za" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
                    <Mail className="w-4 h-4" /> info@landofjoy.co.za
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Land of Joy Day Care Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}