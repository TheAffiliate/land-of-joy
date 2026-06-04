"use client";

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import AboutPreview from '@/components/home/AboutPreview';
import UpdatesSection from '@/components/home/UpdatesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import BlogPreview from '@/components/home/BlogPreview';
import ContactCTA from '@/components/home/ContactCTA';
import { Shield } from 'lucide-react'; // Added icon for the admin button


export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* 1. Hero / Introduction */}
      <HeroSection content={{}} />
      
      {/* 2. Core Services */}
      <ProgramsSection />
      
      {/* 3. About Summary */}
      <AboutPreview content={{}} />
      
      {/* 4. Dynamic Updates & Announcements */}
      <UpdatesSection /> 
      
      {/* 5. Visual Showcase */}
      <GalleryPreview images={[]} />
      
      {/* 6. Insights & News */}
      <BlogPreview/> 
      
      {/* 7. Final Call to Action & Contact Info */}
      <ContactCTA />

      {/* Admin Access Button (Floating bottom right) */}
      <Link href="/admin">
        <div className="fixed bottom-6 right-6 p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all z-50 cursor-pointer group">
          <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
      </Link>
    </div>
  );
}