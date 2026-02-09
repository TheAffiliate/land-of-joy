"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// 1. Full interface to match your future Appwrite/Base44 structure
interface GalleryImage {
  id: number;
  image_url: string;
  title: string;
  album: string;
  description?: string;
}

// 2. All 8 original categories from your template
const albums = [
  { value: 'all', label: 'All Photos' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'daily_activities', label: 'Daily Activities' },
  { value: 'events', label: 'Events' },
  { value: 'outdoor_play', label: 'Outdoor Play' },
  { value: 'classroom', label: 'Classroom' },
  { value: 'sports_day', label: 'Sports Day' },
  { value: 'cultural_day', label: 'Cultural Day' }
];

// 3. Full Mock Data (6 Images as requested)
const MOCK_IMAGES: GalleryImage[] = [
  { id: 1, image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800", title: "Outdoor Fun", album: "outdoor_play" },
  { id: 2, image_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800", title: "Classroom Craft", album: "classroom" },
  { id: 3, image_url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=800", title: "Graduation 2024", album: "graduation" },
  { id: 4, image_url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800", title: "Annual Sports Day", album: "events" },
  { id: 5, image_url: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800", title: "Cultural Day Heroes", album: "cultural_day"},
  { id: 6, image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800", title: "Reading Time", album: "daily_activities" },
];

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = selectedAlbum === 'all' 
    ? MOCK_IMAGES 
    : MOCK_IMAGES.filter((img) => img.album === selectedAlbum);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Restoring your blue-purple-pink gradient */}
      <section className="relative py-20 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              <Camera size={16} /> Photo Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Moments of <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">Joy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Capturing precious memories of learning, playing, and growing together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs - Custom built to match your theme without breaking CSS */}
      <section className="py-8 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 justify-start md:justify-center min-w-max">
          {albums.map(album => (
            <button
              key={album.value}
              onClick={() => setSelectedAlbum(album.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedAlbum === album.value 
                ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {album.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid - Showing all images */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-4/3 rounded-3xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image 
                  src={image.image_url} 
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  {image.description && <p className="text-white/80 text-sm mt-1">{image.description}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <Camera size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No photos found in this category.</p>
          </div>
        )}
      </section>

      {/* Full Feature Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors cursor-pointer"><X size={40}/></button>
            
            <button onClick={prevImage} className="absolute left-4 md:left-8 text-white p-3 hover:bg-white/10 rounded-full cursor-pointer transition-all">
              <ChevronLeft size={48}/>
            </button>
            
            <button onClick={nextImage} className="absolute right-4 md:right-8 text-white p-3 hover:bg-white/10 rounded-full cursor-pointer transition-all">
              <ChevronRight size={48}/>
            </button>

            <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
               <Image 
                src={filteredImages[currentIndex].image_url} 
                alt={filteredImages[currentIndex].title}
                fill
                className="object-contain"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center text-white">
                <h2 className="text-2xl font-bold">{filteredImages[currentIndex].title}</h2>
                <p className="text-white/60">{currentIndex + 1} of {filteredImages.length}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}