"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface ContactItem {
  icon: React.ElementType;
  title: string;
  info: string;
  href?: string;
  color: string;
}

const contactInfo: ContactItem[] = [
  { icon: Phone, title: "Phone", info: "079 839 5149", href: "tel:0798395149", color: "bg-green-100 text-green-600" },
  { icon: Mail, title: "Email", info: "info@landofjoy.co.za", href: "mailto:info@landofjoy.co.za", color: "bg-blue-100 text-blue-600" },
  { icon: Clock, title: "Hours", info: "Mon-Fri: 6:30am - 5:30pm", color: "bg-orange-100 text-orange-600" },
  { icon: MapPin, title: "Location", info: "South Africa", color: "bg-purple-100 text-purple-600" }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-orange-50 via-yellow-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full opacity-30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-6">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6">
              Get In{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-yellow-500">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Have questions about enrollment or our programs? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-50 hover:border-orange-200 transition-all"
              >
                {item.href ? (
                  <a href={item.href} className="group">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.info}</p>
                  </a>
                ) : (
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="font-bold text-gray-900">{item.info}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Parent Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value})}
                      placeholder="079 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Inquiry Type</Label>
                    <Select onValueChange={(v: string) => setFormData({...formData, subject: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enrolment">Enrolment Enquiry</SelectItem>
                        <SelectItem value="tour">Schedule a Tour</SelectItem>
                        <SelectItem value="fees">Fee Structure</SelectItem>
                        <SelectItem value="general">General Enquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your child and any specific questions you have..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-linear-to-br from-orange-500 to-yellow-500 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Why Choose Land of Joy?</h3>
                <ul className="space-y-4">
                  {[
                    "Award Winning Centre of Excellence",
                    "Grade R recognized by Dept. of Education",
                    "25+ years of nurturing excellence",
                    "Fully qualified and background-checked staff",
                    "Safe, secure, and stimulating environment"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/90 font-medium">
                      <div className="mt-1.5 w-2 h-2 bg-white rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-6">We invite you to experience our vibrant learning environment firsthand.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                    href="https://www.facebook.com/192120381211327" 
                    target="_blank" 
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <a 
                    href="tel:0798395149"
                    className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}