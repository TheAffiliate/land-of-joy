"use client";

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import AboutPreview from '@/components/home/AboutPreview';
import UpdatesSection from '@/components/home/UpdatesSection';
import type { Update } from '@/components/home/UpdatesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import BlogPreview from '@/components/home/BlogPreview';
import type { BlogPost } from '@/components/home/BlogPreview';
import ContactCTA from '@/components/home/ContactCTA';

// Mock Data for UI Development
const MOCK_UPDATES: Update[] = [
  {
    id: '1',
    title: 'School Reopening',
    content: 'We are excited to welcome everyone back for the new term starting Monday.',
    type: 'announcement',
    priority: 'high',
    is_active: true,
    created_date: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sports Day 2026',
    content: 'Join us for a day of fun activities and healthy competition.',
    type: 'event',
    priority: 'medium',
    is_active: true,
    created_date: new Date().toISOString()
  }
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Importance of Play in Early Development',
    excerpt: 'Discover why structured and unstructured play is vital for your child\'s cognitive growth.',
    category: 'parenting_tips',
    is_published: true,
    created_date: new Date().toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=800'
  },
  {
    id: '2',
    title: 'Healthy Snack Ideas for Toddlers',
    excerpt: 'Easy, nutritious, and kid-approved snack ideas for busy parents on the go.',
    category: 'activities',
    is_published: true,
    created_date: new Date().toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero / Introduction */}
      <HeroSection content={{}} />
      
      {/* 2. Core Services */}
      <ProgramsSection />
      
      {/* 3. About Summary */}
      <AboutPreview content={{}} />
      
      {/* 4. Dynamic Updates & Announcements */}
      <UpdatesSection updates={MOCK_UPDATES} /> 
      
      {/* 5. Visual Showcase */}
      <GalleryPreview images={[]} />
      
      {/* 6. Insights & News */}
      <BlogPreview posts={MOCK_POSTS} /> 
      
      {/* 7. Final Call to Action & Contact Info */}
      <ContactCTA />
    </div>
  );
}