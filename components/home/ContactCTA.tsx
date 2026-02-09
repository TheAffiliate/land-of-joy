"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactCTA() {
  const contactItems = [
    { icon: Phone, title: "Call Us", info: "079 839 5149", href: "tel:0798395149" },
    { icon: Mail, title: "Email Us", info: "info@landofjoy.co.za", href: "mailto:info@landofjoy.co.za" },
    { icon: Clock, title: "Working Hours", info: "Mon-Fri: 6:30am - 5:30pm" },
    { icon: MapPin, title: "Visit Us", info: "South Africa" }
  ];

  return (
    <section className="py-20 bg-linear-to-r from-orange-500 via-orange-600 to-yellow-500 relative overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-100 h-100 bg-white rounded-full opacity-10"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Give Your Child the Best Start?
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Contact us today to schedule a tour and discover why families choose Land of Joy for their little ones.
            </p>
            <Link href={createPageUrl('Contact')}>
                <Button 
                    size="lg" 
                    className="bg-white text-orange-600 hover:bg-white font-bold rounded-full px-8 shadow-xl transition-all hover:scale-105 active:scale-95 border-none">
                    {/* Ensure text is explicitly wrapped and styled */}
                    <span className="relative z-10 text-orange-600">Get In Touch</span>
                    <ArrowRight className="ml-2 w-4 h-4 text-orange-600" />
                </Button>
            </Link>
          </motion.div>

          {/* Right Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-all border border-white/10"
              >
                {item.href ? (
                  <a href={item.href} className="group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-orange-100 text-sm mb-1">{item.title}</p>
                    <p className="text-white font-semibold">{item.info}</p>
                  </a>
                ) : (
                  <div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-orange-100 text-sm mb-1">{item.title}</p>
                    <p className="text-white font-semibold">{item.info}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}