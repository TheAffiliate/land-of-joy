"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Camera, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";

interface GalleryImage {
  image_url: string;
  title: string;
}

interface GalleryPreviewProps {
  images?: GalleryImage[];
}

// Fallback images in case the database is empty or fails to load
const FALLBACK_IMAGES = [
  { image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800", title: "Outdoor Play" },
  { image_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800", title: "Art Time" },
  { image_url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=800", title: "Learning" },
  { image_url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800", title: "Friends" },
  { image_url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800", title: "Graduation" },
  { image_url: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2?q=80&w=800", title: "Music" },
];

export default function GalleryPreview({ images = [] }: GalleryPreviewProps) {
  const [fetchedImages, setFetchedImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.galleryCollectionId,
          [
            Query.orderDesc("$createdAt"),
            Query.limit(6) // Only fetch 6 for the preview grid
          ]
        );

        const formattedImages = response.documents.map((doc) => ({
          image_url: doc.image_url,
          // Convert 'daily_activities' to 'Daily Activities'
        title: doc.category.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
        }));

        setFetchedImages(formattedImages);
      } catch (error) {
        console.error("Error fetching gallery preview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // If images are passed as props, skip fetching
    if (images.length > 0) {
      setFetchedImages(images.slice(0, 6));
      setIsLoading(false);
    } else {
      fetchGalleryImages();
    }
  }, [images]);

  // Determine which images to display (Props -> Appwrite -> Fallback)
  const displayImages = fetchedImages.length > 0 ? fetchedImages : FALLBACK_IMAGES;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Photo Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Moments of Joy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing precious memories of our little ones learning, playing, and growing together
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <div className={`relative w-full transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-100 md:h-125' : 'h-48 md:h-60'
                  }`}>
                  <Image 
                    src={image.image_url} 
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  />
                </div>
                
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href={createPageUrl('Gallery')}>
            <Button size="lg" className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-8">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}