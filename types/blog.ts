import { Models } from 'appwrite';

export interface BlogPost extends Models.Document {
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'events' | 'parenting_tips' | 'activities' | 'announcements';
  cover_image: string;
  is_published: boolean;
}