"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Sparkles, BookOpen, GraduationCap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const programs = [
  {
    icon: Baby,
    title: "Babies Programme",
    age: "3 months - 1 year",
    description: "Our babies programme focuses on creating a nurturing environment where infants feel safe, loved, and stimulated. Through gentle activities, we encourage sensory development and early bonding.",
    features: ["Individual care plans", "Sensory stimulation", "Sleep routines", "Nutritious meals", "Daily updates to parents"],
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: Sparkles,
    title: "Toddlers Programme",
    age: "1 - 2 years",
    description: "Toddlers are natural explorers! Our programme encourages curiosity through play-based learning, helping children develop motor skills, language, and social awareness.",
    features: ["Play-based learning", "Language development", "Motor skill activities", "Creative arts", "Outdoor exploration"],
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: BookOpen,
    title: "Pre-School Programme",
    age: "3 - 4 years",
    description: "Our pre-school programme builds foundations for lifelong learning. Children engage in structured activities that develop cognitive, social, and emotional skills.",
    features: ["Early literacy", "Numeracy foundations", "Science exploration", "Music & movement", "Social skills"],
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=800",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: GraduationCap,
    title: "Grade R Programme",
    age: "5 - 6 years",
    description: "Our Grade R programme is recognized by the Department of Education and prepares children for formal schooling. We focus on school readiness while maintaining the joy of learning.",
    features: ["Dept. of Education curriculum", "Reading readiness", "Mathematics concepts", "Writing skills", "School preparation"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50"
  }
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6 border border-orange-200">
              <BookOpen className="w-4 h-4" />
              Our Curriculum
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Learning for <span className="text-orange-600">Every Age</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Age-appropriate programmes designed to nurture your child&apos;s unique potential and curiosity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule Info Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Operating Hours</h3>
                  <p className="text-orange-100 font-medium">Monday — Friday</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-4xl font-black">6:30am - 5:30pm</p>
                <p className="text-orange-100 text-sm mt-1 uppercase tracking-widest font-bold">Standard Day Care Hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''} relative`}>
                  <div className={`absolute -inset-4 bg-linear-to-r ${program.color} rounded-[2.5rem] opacity-10 blur-2xl`} />
                  <div className="relative rounded-4xl overflow-hidden shadow-2xl aspect-4/3 border-8 border-white">
                    <Image 
                      src={program.image} 
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                  <div className={`w-14 h-14 bg-linear-to-br ${program.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{program.title}</h2>
                  <p className="text-xl font-bold text-orange-600 mb-6">{program.age}</p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed italic">
                    &quot;{program.description}&quot;
                  </p>
                  
                  <div className="grid sm:grid-cols-1 gap-4 mb-10">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact">
                    <Button size="lg" className={`bg-linear-to-r ${program.color} hover:scale-105 transition-transform text-white rounded-full px-8 h-14 font-bold shadow-lg`}>
                      Enquire for {program.title.split(' ')[0]} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - THE FIX IS HERE */}
      <div className="pb-12 bg-white"> {/* Wraps the section to hide the black gap */}
        <section className="py-24 bg-gray-50 rounded-[4rem] mx-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Not sure which group is right?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Every child is unique. Contact us today to discuss your child&apos;s specific needs and schedule a visit to our centre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-10 h-16 font-bold text-lg">
                  Book a School Tour
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}