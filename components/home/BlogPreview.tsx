"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Calendar, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isValid } from 'date-fns';
import Image from 'next/image';
import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  cover_image?: string;
  category: 'news' | 'events' | 'parenting_tips' | 'activities' | 'announcements' | string;
  is_published: boolean;
  published_date?: string;
  created_date: string;
}

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-600',
  events: 'bg-green-100 text-green-600',
  parenting_tips: 'bg-purple-100 text-purple-600',
  activities: 'bg-orange-100 text-orange-600',
  announcements: 'bg-red-100 text-red-600'
};

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.blogsCollectionId,
          [
            Query.equal('is_published', true),
            Query.orderDesc('$createdAt'),
            Query.limit(3)
          ]
        );

        const formattedPosts = response.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          excerpt: doc.excerpt,
          cover_image: doc.cover_image,
          category: doc.category,
          is_published: doc.is_published,
          published_date: doc.published_date,
          created_date: doc.$createdAt, // Appwrite's default creation date
        }));

        setPosts(formattedPosts as BlogPost[]);
      } catch (error) {
        console.error("Error fetching blog preview posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 flex flex-col justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading latest stories...</p>
      </section>
    );
  }

  // Fallback if no posts are published yet
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Our Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            News & Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, parenting tips, and stories from our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const dateStr = post.published_date || post.created_date;
            const dateObj = new Date(dateStr);
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={post.cover_image || 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800'} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                      {post.category?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {isValid(dateObj) ? format(dateObj, 'MMM d, yyyy') : 'Recent'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`${createPageUrl('BlogPost')}?id=${post.id}`}
                    className="inline-flex items-center text-orange-600 font-medium text-sm hover:text-orange-700"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href={createPageUrl('Blog')}>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}