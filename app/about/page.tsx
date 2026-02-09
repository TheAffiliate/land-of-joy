"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Users, Shield, Star, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const values = [
  { icon: Heart, title: "Love & Care", description: "Every child is treated with warmth, kindness, and individual attention." },
  { icon: Shield, title: "Safety First", description: "Our secure facilities ensure peace of mind for parents." },
  { icon: Users, title: "Qualified Staff", description: "Trained educators passionate about early childhood development." },
  { icon: Star, title: "Excellence", description: "Committed to providing the highest quality education." }
];

const milestones = [
  { year: "2000", title: "Founded", description: "Land of Joy opened its doors to the community." },
  { year: "2015", title: "Award Winning", description: "Recognized as a regional Centre of Excellence." },
  { year: "2016", title: "Grade R Approved", description: "Official Department of Education recognition." },
  { year: "2026", title: "25+ Years", description: "Serving generations of families with pride." }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-orange-50 via-white to-orange-50/30 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6 border border-orange-200">
              <Award className="w-4 h-4" />
              Our Heritage
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              A Legacy of{' '}
              <span className="text-orange-600">Joyful Learning</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over two decades, we&apos;ve been more than just a daycare. We are a home away from home where young minds find their wings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3">
                <Image 
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800" 
                  alt="Children learning through play" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-orange-600 text-white rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-black italic">25+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-90">Years of Growth</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Land of Joy Day Care Centre, our mission is to provide a safe, nurturing, and stimulating environment where every child can thrive. We believe that early childhood is the most crucial time for development.
              </p>
              
              <div className="grid gap-4">
                {[
                  "Award Winning Centre of Excellence",
                  "Grade R recognized by Dept. of Education",
                  "NPO 017-735 Registered",
                  "Affordable quality uniforms"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The Land of Joy Way</h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              &quot;The principles that guide our hearts and our classrooms every day.&quot;
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">Our Journey</h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-orange-200 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 w-full text-center md:text-right">
                    {index % 2 === 0 && (
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 inline-block max-w-xs">
                        <span className="text-2xl font-black text-orange-600">{milestone.year}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-500 text-sm mt-2">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-4 h-4 bg-orange-600 rounded-full relative z-10 hidden md:block">
                    <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-20" />
                  </div>
                  
                  <div className="flex-1 w-full text-center md:text-left">
                    {index % 2 !== 0 && (
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 inline-block max-w-xs">
                        <span className="text-2xl font-black text-orange-600">{milestone.year}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-500 text-sm mt-2">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}