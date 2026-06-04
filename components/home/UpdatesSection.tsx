"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, AlertTriangle, Info, Megaphone, Loader2 } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { databases, appwriteConfig } from "@/lib/appwrite";
import { Query } from "appwrite";
import { LucideIcon } from 'lucide-react';


// Define the shape of an update for TypeScript
export interface Update {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'reminder' | 'event' | 'holiday' | 'general' | string;
  priority: 'high' | 'medium' | 'low' | string;
  is_active: boolean;
  created_date: string;
}

const typeConfig: Record<string, { icon: LucideIcon, color: string, border: string }> = {
  announcement: { icon: Megaphone, color: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
  reminder: { icon: Bell, color: 'bg-yellow-100 text-yellow-600', border: 'border-yellow-200' },
  event: { icon: Calendar, color: 'bg-green-100 text-green-600', border: 'border-green-200' },
  holiday: { icon: Info, color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' },
  general: { icon: Info, color: 'bg-gray-100 text-gray-600', border: 'border-gray-200' }
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-50 border-red-200',
  medium: 'bg-white border-gray-200',
  low: 'bg-gray-50 border-gray-200'
};

export default function UpdatesSection() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveUpdates = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.updatesCollectionId,
          [
            Query.equal('is_active', true), // Only fetch active notices
            Query.orderDesc('$createdAt'),
            Query.limit(4) // Keep to a max of 4 on the homepage
          ]
        );

        const formattedUpdates = response.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          content: doc.content,
          type: doc.type,
          priority: doc.priority,
          is_active: doc.is_active,
          created_date: doc.$createdAt,
        }));

        setUpdates(formattedUpdates as Update[]);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveUpdates();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <section className="py-16 bg-linear-to-b from-white to-orange-50 flex flex-col justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-500 font-medium">Loading latest updates...</p>
      </section>
    );
  }

  // If no updates are active, we don't render the section at all
  if (updates.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
            <Bell className="w-4 h-4" />
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stay Informed
          </h2>
          <p className="text-lg text-gray-600">
            Important announcements and updates from Land of Joy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {updates.map((update, index) => {
            // Fallback to 'general' if the type from DB doesn't match our config
            const config = typeConfig[update.type] || typeConfig.general;
            const Icon = config.icon;
            const date = new Date(update.created_date);
            const priorityColor = priorityColors[update.priority] || priorityColors.medium;
            
            return (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-5 rounded-2xl border-2 ${priorityColor} hover:shadow-lg transition-shadow`}
              >
                {update.priority === 'high' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{update.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        {update.type?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{update.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {isValid(date) ? format(date, 'MMM d, yyyy') : 'Recently'}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}