"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Phone, MapPin, ArrowRight, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeroSectionProps {
  content?: {
    hero_subtitle?: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  // Fixed positions to keep React "Pure" and UI consistent
  const floatingIcons = [
    { emoji: '🎨', top: '25%', left: '15%', duration: 3 },
    { emoji: '📚', top: '70%', left: '10%', duration: 4 },
    { emoji: '🎵', top: '40%', left: '85%', duration: 3.5 },
    { emoji: '⭐', top: '15%', left: '75%', duration: 4.5 },
    { emoji: '🌈', top: '80%', left: '80%', duration: 3.2 },
    { emoji: '🎪', top: '55%', left: '20%', duration: 3.8 },
  ];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-linear-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-125 h-125 bg-yellow-200 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: item.top, left: item.left }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
              ${i % 3 === 0 ? 'bg-orange-100' : i % 3 === 1 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
              {item.emoji}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
              <Award className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Award Winning Centre of Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Welcome to{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-500 to-orange-600">
                  Land of Joy
                </span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {content?.hero_subtitle || "Where every child's journey begins with love, laughter, and learning. Nurturing young minds since 2000."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link href={createPageUrl('Contact')}>
                <Button size="lg" className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-6 rounded-2xl text-lg shadow-xl flex items-center">
                  Enrol Your Child
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={createPageUrl('About')}>
                <Button size="lg" variant="outline" className="border-2 border-gray-200 px-8 py-6 rounded-2xl text-lg bg-white/50 backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="tel:0798395149" className="flex items-center gap-3 text-gray-700 hover:text-orange-600">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Call us today</p>
                  <p className="font-semibold">079 839 5149</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold">South Africa</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div className="absolute -inset-4 bg-linear-to-r from-orange-400 to-yellow-400 rounded-4xl opacity-20 blur-2xl" />
              <div className="relative bg-white rounded-4xl p-3 shadow-2xl overflow-hidden aspect-6/5">
                <Image 
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800" 
                    alt="Happy children learning" 
                    fill
                    className="object-cover rounded-4xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw" 
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">25+</p>
                    <p className="text-sm text-gray-500">Years of Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}