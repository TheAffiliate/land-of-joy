"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Baby, BookOpen, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  {
    icon: Baby,
    title: "Babies",
    age: "3 months - 1 year",
    description: "Nurturing care and sensory stimulation in a safe, loving environment.",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500"
  },
  {
    icon: Sparkles,
    title: "Toddlers",
    age: "1 - 2 years",
    description: "Encouraging curiosity through play-based learning and exploration.",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  },
  {
    icon: BookOpen,
    title: "Pre-School",
    age: "3 - 4 years",
    description: "Building foundations with creative activities and social skills development.",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    icon: GraduationCap,
    title: "Grade R",
    age: "5 - 6 years",
    description: "Department of Education recognized programme preparing for primary school.",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-500"
  }
];

export default function ProgramsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
            Our Programmes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Age-Appropriate Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored programmes designed to nurture each stage of your child&apos;s development
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`${program.bgColor} rounded-3xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2`}>
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-r ${program.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className={`text-sm font-medium ${program.iconColor} mb-3`}>{program.age}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={createPageUrl('Programs')}
                    className={`inline-flex items-center text-sm font-medium ${program.iconColor}`}
                  >
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href={createPageUrl('Programs')}>
            <Button variant="outline" className="rounded-full px-8 h-12">
              View All Programmes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}