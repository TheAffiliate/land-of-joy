"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { CheckCircle2, Heart, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const highlights = [
  { icon: Heart, text: "Loving & caring environment" },
  { icon: Shield, text: "Safe & secure facilities" },
  { icon: Users, text: "Qualified & experienced staff" },
  { icon: CheckCircle2, text: "Grade R recognized by Dept. of Education" }
];

interface AboutPreviewProps {
  content?: {
    about_text?: string;
  };
}

export default function AboutPreview({ content }: AboutPreviewProps) {
  return (
    <section className="py-20 bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="space-y-4"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400" 
                    alt="Children playing" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-56">
                  <Image 
                    src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=400" 
                    alt="Learning activities" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                  />
                </div>
              </motion.div>
              <motion.div 
                className="space-y-4 pt-8"
                initial={{ y: -20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-56">
                  <Image 
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=400" 
                    alt="Art activities" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=400" 
                    alt="Outdoor play" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-linear-to-r from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Since 2000</p>
                <p className="text-sm text-gray-500">Trusted by families</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nurturing Young Minds{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-yellow-500">
                With Love
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {content?.about_text || "Land of Joy Day Care Centre has been a cornerstone of early childhood education since 2000. We provide a warm, nurturing environment where children can learn, grow, and develop through play-based education."}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link href={createPageUrl('About')}>
              <Button size="lg" className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full px-8">
                Discover More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}