"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

// 1. Categories & Colors exactly from your Base44 template
const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'news', label: 'News' },
  { value: 'events', label: 'Events' },
  { value: 'parenting_tips', label: 'Parenting Tips' },
  { value: 'activities', label: 'Activities' },
  { value: 'announcements', label: 'Announcements' }
];

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-600',
  events: 'bg-green-100 text-green-600',
  parenting_tips: 'bg-purple-100 text-purple-600',
  activities: 'bg-orange-100 text-orange-600',
  announcements: 'bg-red-100 text-red-600'
};

// 2. Mock Data (Mirroring your Appwrite entity structure)
const MOCK_POSTS = [
  {
    id: '1',
    title: "Preparing Your Child for Their First Day",
    excerpt: "The first day of daycare is a big milestone! Here are five tips to make the transition smooth for both you and your little one.",
    category: "parenting_tips",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800",
    is_published: true
  },
  {
    id: '2',
    title: "Annual Sports Day 2024: What to Expect",
    excerpt: "Get ready for a day of fun, games, and healthy competition! We've outlined the schedule for our upcoming Sports Day event.",
    category: "events",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800",
    is_published: true
  },
  {
    id: '3',
    title: "New Playground Equipment Has Arrived!",
    excerpt: "We are thrilled to announce that our new outdoor play area is officially open. Come see the new slides and climbing frames.",
    category: "announcements",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
    is_published: true
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic kept exactly from your template
  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero - Consistent with Gallery styling */}
      <section className="relative py-20 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6">
              <BookOpen size={16} /> Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              News & <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Stay updated with the latest news, parenting tips, and stories from Land of Joy
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-0 bg-white shadow-xl focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Category Filter */}
      <section className="py-6 bg-white border-b sticky top-0 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 min-w-max md:justify-center">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.value 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-52 overflow-hidden">
                    <Image 
                      src={post.cover_image} 
                      alt={post.title}
                      fill
                      priority={index === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                        {post.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium uppercase tracking-widest">
                      <Calendar size={14} />
                      {format(new Date(post.published_date), 'MMM d, yyyy')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-purple-600 font-bold text-sm">
                      Read More 
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No stories found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}