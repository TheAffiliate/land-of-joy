"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

// Defining the params type to fix the 'possibly null' error
type BlogParams = {
  id: string;
};

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-600',
  events: 'bg-green-100 text-green-600',
  parenting_tips: 'bg-purple-100 text-purple-600',
  activities: 'bg-orange-100 text-orange-600',
  announcements: 'bg-red-100 text-red-600'
};

// Full Mock Data so ID 1, 2, and 3 all work
const MOCK_POSTS = [
  {
    id: '1',
    title: "Preparing Your Child for Their First Day",
    content: `<p>The first day of daycare is a significant milestone for both parents and children. Mark the beginning of a new journey of growth!</p>`,
    category: "parenting_tips",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200",
  },
  {
    id: '2',
    title: "Annual Sports Day 2024: What to Expect",
    content: `<p>Get ready for a day of fun, games, and healthy competition! We have a full schedule of relay races and family events.</p>`,
    category: "events",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200",
  },
  {
    id: '3',
    title: "New Playground Equipment Has Arrived!",
    content: `<p>We are thrilled to announce that our new outdoor play area is officially open. Come see the new slides and climbing frames!</p>`,
    category: "announcements",
    published_date: new Date().toISOString(),
    cover_image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200",
  }
];

export default function BlogPostPage() {
  const params = useParams() as BlogParams;
  const postId = params?.id;

  const post = MOCK_POSTS.find(p => p.id === postId);

  // This variable was causing your ESLint error because it wasn't used in the JSX below
  const relatedPosts = MOCK_POSTS.filter(p => p.category === post?.category && p.id !== post?.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-white py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/blog" className="px-6 py-2 bg-purple-500 text-white rounded-full">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative py-12 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> 
            Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${categoryColors[post.category]}`}>
              {post.category.replace('_', ' ')}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{post.title}</h1>
            <div className="flex items-center gap-2 text-gray-500"><Calendar size={16} />{format(new Date(post.published_date), 'MMMM d, yyyy')}</div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="relative h-72 sm:h-120 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Article Content */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <div className="prose prose-lg prose-purple max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="mt-16 pt-8 border-t flex justify-between items-center">
          <span className="font-bold text-gray-900">Share:</span>
          <div className="flex gap-3">
            <Facebook className="text-gray-400 hover:text-blue-600 cursor-pointer" />
            <Twitter className="text-gray-400 hover:text-sky-500 cursor-pointer" />
            <Share2 className="text-gray-400 hover:text-purple-600 cursor-pointer" />
          </div>
        </div>
      </section>

      {/* RELATED POSTS SECTION - Using the variable here fixes the ESLint error */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">More from {post.category.replace('_', ' ')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.id}`} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                  <div className="relative h-48"><Image src={related.cover_image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform" /></div>
                  <div className="p-6"><h3 className="font-bold group-hover:text-purple-600">{related.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}