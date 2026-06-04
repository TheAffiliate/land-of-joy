"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { databases, appwriteConfig } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { BlogPost } from '@/types/blog'; // Or define it locally if you prefer

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-600',
  events: 'bg-green-100 text-green-600',
  parenting_tips: 'bg-purple-100 text-purple-600',
  activities: 'bg-orange-100 text-orange-600',
  announcements: 'bg-red-100 text-red-600'
};

export default function BlogPostPage() {
  // FIX: Type cast useParams to access 'id' safely
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const currentPost = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.blogsCollectionId,
          id
        ) as BlogPost;
        
        setPost(currentPost);

        const related = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.blogsCollectionId,
          [
            Query.equal('category', currentPost.category),
            Query.notEqual('$id', currentPost.$id),
            Query.limit(3)
          ]
        );
        setRelatedPosts(related.documents as unknown as BlogPost[]);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-white py-20 flex items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/blog" className="px-6 py-2 bg-purple-500 text-white rounded-full">Back to Blog</Link>
      </div>
    </div>
  );

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
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              {format(new Date(post.$createdAt), 'MMMM d, yyyy')}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="relative h-72 sm:h-120 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image src={post.cover_image || "/placeholder-blog.jpg"} alt={post.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Article Content */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        {/* Important: Ensure your Admin page saves HTML from the ReactQuill editor for this to work */}
        <div 
          className="prose prose-lg prose-purple max-w-none text-gray-700" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <div className="mt-16 pt-8 border-t flex justify-between items-center">
          <span className="font-bold text-gray-900">Share:</span>
          <div className="flex gap-3">
            <Facebook className="text-gray-400 hover:text-blue-600 cursor-pointer" />
            <Twitter className="text-gray-400 hover:text-sky-500 cursor-pointer" />
            <Share2 className="text-gray-400 hover:text-purple-600 cursor-pointer" />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">More from {post.category.replace('_', ' ')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.$id} href={`/blog/${related.$id}`} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                  <div className="relative h-48">
                    <Image src={related.cover_image || "/placeholder-blog.jpg"} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold group-hover:text-purple-600 line-clamp-2">{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}