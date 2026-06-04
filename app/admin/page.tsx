"use client";

import React, { useState, useEffect, useCallback } from "react";
import { account, databases, storage, appwriteConfig } from "@/lib/appwrite";
import { Query, ID, Models } from "appwrite";
import { toast } from "sonner";
import { 
  Loader2, Lock, LogOut, Trash2, Mail, 
  Plus, ImageIcon, FileText, ShieldCheck, Grid
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlogPost } from "@/types/blog";
import Image from "next/image";

interface Inquiry extends Models.Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface GalleryItem extends Models.Document {
    image_url: string;
    category: string;
}

type TabType = 'blogs' | 'gallery' | 'inquiries' | 'settings';

const GALLERY_CATEGORIES = [
    "graduation", "daily_activities", "events", "outdoor_play", "classroom", "sports_day", "cultural_day"
];

export default function AdminDashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('blogs');
    const [showNewForm, setShowNewForm] = useState(false);

    // --- Data States ---
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    
    // --- Form States ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [blogForm, setBlogForm] = useState({
        title: '', excerpt: '', content: '', category: 'news' as BlogPost['category'], cover_image: '', is_published: true
    });

    const [galleryForm, setGalleryForm] = useState({
        image_url: '', category: 'daily_activities'
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            // Fetch Inquiries
            const inqRes = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.collectionId, [Query.orderDesc("$createdAt")]);
            setInquiries(inqRes.documents as unknown as Inquiry[]);

            // Fetch Blogs
            const blogRes = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.blogsCollectionId, [Query.orderDesc("$createdAt")]);
            setBlogs(blogRes.documents as unknown as BlogPost[]);

            // Fetch Gallery
            const galleryRes = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, [Query.orderDesc("$createdAt")]);
            setGallery(galleryRes.documents as unknown as GalleryItem[]);
        } catch (error) {
            console.error("Data fetch error:", error);
        }
    }, []);

    const checkSession = useCallback(async () => {
        try {
            await account.get();
            setIsAuthenticated(true);
            fetchData();
        } catch {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [fetchData]);

    useEffect(() => { checkSession(); }, [checkSession]);

    const handleImageUpload = async (file: File, type: 'blog' | 'gallery') => {
        try {
            setIsUploading(true);
            const response = await storage.createFile(appwriteConfig.storageBucketId, ID.unique(), file);
            const fileUrl = storage.getFileView(appwriteConfig.storageBucketId, response.$id).toString();
            
            if (type === 'blog') setBlogForm(prev => ({ ...prev, cover_image: fileUrl }));
            else setGalleryForm(prev => ({ ...prev, image_url: fileUrl }));
            
            toast.success("Image uploaded!");
        } catch (error) {
            toast.error("Upload failed.");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCreateGalleryItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newItem = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.galleryCollectionId,
                ID.unique(),
                galleryForm
            );
            setGallery([newItem as unknown as GalleryItem, ...gallery]);
            setGalleryForm({ image_url: '', category: 'daily_activities' });
            setShowNewForm(false);
            toast.success("Gallery item added!");
        } catch {
            toast.error("Failed to add image.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteGalleryItem = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        try {
            await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.galleryCollectionId, id);
            setGallery(gallery.filter(item => item.$id !== id));
            toast.success("Image removed");
        } catch {
            toast.error("Delete failed");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await account.createEmailPasswordSession(email, password);
            setIsAuthenticated(true);
            fetchData();
            toast.success("Welcome back!");
        } catch {
            toast.error("Invalid credentials");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setIsAuthenticated(false);
            toast.success("Logged out");
        } catch {
            toast.error("Logout failed");
        }
    };

    const handleCreateBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = { ...blogForm, published_date: new Date().toISOString() };
        try {
            const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.blogsCollectionId, ID.unique(), payload);
            setBlogs([newPost as unknown as BlogPost, ...blogs]);
            setBlogForm({ title: '', excerpt: '', content: '', category: 'news', cover_image: '', is_published: true });
            setShowNewForm(false);
            toast.success("Blog post published!");
        } catch {
            toast.error("Failed to create post.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteBlog = async (id: string) => {
        if (!confirm("Delete this post?")) return;
        try {
            await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.blogsCollectionId, id);
            setBlogs(blogs.filter(b => b.$id !== id));
            toast.success("Post deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    const deleteInquiry = async (id: string) => {
        try {
            await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.collectionId, id);
            setInquiries(inquiries.filter(iq => iq.$id !== id));
            toast.success("Inquiry deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>;

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-xl border-t-4 border-orange-500 p-8">
                    <div className="text-center mb-6">
                        <Lock className="w-10 h-10 mx-auto text-orange-500 mb-2" />
                        <h2 className="text-2xl font-bold">Admin Login</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                        <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoggingIn}>
                            {isLoggingIn ? "Signing in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-99 bg-gray-50 overflow-y-auto">
            <header className="bg-orange-500 text-white pt-10 pb-20 px-8">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-orange-100 opacity-80">Manage Land of Joy content</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="bg-white text-gray-700 border-none shadow-sm">
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 -mt-10 pb-20">
                <nav className="flex gap-2 mb-10 bg-white p-1.5 rounded-full shadow-lg border border-gray-100 w-fit">
                    {[
                        { id: 'blogs', label: `Blogs (${blogs.length})`, icon: <FileText className="w-4 h-4" /> },
                        { id: 'gallery', label: `Gallery (${gallery.length})`, icon: <Grid className="w-4 h-4" /> },
                        { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <Mail className="w-4 h-4" /> },
                        { id: 'settings', label: 'Settings', icon: <ShieldCheck className="w-4 h-4" /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {setActiveTab(tab.id as TabType); setShowNewForm(false);}}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-semibold ${
                                activeTab === tab.id ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>

                {activeTab === 'blogs' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
                            <Button onClick={() => setShowNewForm(!showNewForm)} className="bg-orange-500 rounded-full px-6">
                                {showNewForm ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> New Post</>}
                            </Button>
                        </div>
                        {showNewForm && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
                                <form onSubmit={handleCreateBlog} className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div><Label>Title</Label><Input value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} required /></div>
                                        <div>
                                            <Label>Category</Label>
                                            <select className="w-full border rounded-md p-2 text-sm" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value as BlogPost['category']})}>
                                                <option value="news">News</option><option value="events">Events</option><option value="parenting_tips">Parenting Tips</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Cover Image</Label>
                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                                <div className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer" onClick={() => document.getElementById('blogImg')?.click()}>
                                                    <input type="file" id="blogImg" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'blog')} />
                                                    {isUploading ? <Loader2 className="animate-spin text-orange-500" /> : <ImageIcon className="w-6 h-6 text-gray-400" />}
                                                </div>
                                                <Input placeholder="URL..." value={blogForm.cover_image} onChange={e => setBlogForm({...blogForm, cover_image: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div><Label>Excerpt</Label><textarea className="w-full border rounded-md p-2 text-sm h-20" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} required /></div>
                                        <div><Label>Content</Label><textarea className="w-full border rounded-md p-2 text-sm h-32" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} required /></div>
                                        <Button type="submit" className="w-full bg-orange-500" disabled={isSubmitting}>Publish</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className="space-y-4">
                            {blogs.map((post) => (
                                <div key={post.$id} className="bg-white rounded-2xl border p-4 shadow-sm flex items-center gap-6">
                                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-gray-100 border shrink-0">
                                        {post.cover_image && <Image src={post.cover_image} alt="" fill className="object-cover" unoptimized />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">{post.title}</h3>
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{post.category}</span>
                                    </div>
                                    <Button variant="ghost" onClick={() => deleteBlog(post.$id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                            <Button onClick={() => setShowNewForm(!showNewForm)} className="bg-orange-500 rounded-full px-6">
                                {showNewForm ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Image</>}
                            </Button>
                        </div>

                        {showNewForm && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8 animate-in zoom-in-95">
                                <form onSubmit={handleCreateGalleryItem} className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Image Category</Label>
                                            <select className="w-full border rounded-md p-2 text-sm" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}>
                                                {GALLERY_CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Image Source</Label>
                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                                <div className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer" onClick={() => document.getElementById('galleryImg')?.click()}>
                                                    <input type="file" id="galleryImg" className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'gallery')} />
                                                    {isUploading ? <Loader2 className="animate-spin text-orange-500" /> : <ImageIcon className="w-6 h-6 text-gray-400" />}
                                                </div>
                                                <Input placeholder="Or URL..." value={galleryForm.image_url} onChange={e => setGalleryForm({...galleryForm, image_url: e.target.value})} className="h-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <Button type="submit" className="w-full bg-orange-500 h-12" disabled={isSubmitting || !galleryForm.image_url}>
                                            {isSubmitting ? "Adding..." : "Add to Gallery"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {gallery.map((item) => (
                                <div key={item.$id} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border">
                                    <Image src={item.image_url} alt="" fill className="object-cover" unoptimized />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                                        <span className="text-white text-[10px] font-bold uppercase mb-2">{item.category.replace('_', ' ')}</span>
                                        <Button size="sm" onClick={() => deleteGalleryItem(item.$id)} className="bg-red-500 hover:bg-red-600 text-white rounded-full h-8 w-8 p-0">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'inquiries' && (
                    <div className="space-y-4">
                        {inquiries.map((iq) => (
                            <div key={iq.$id} className="bg-white rounded-2xl border p-6 flex justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold">{iq.name}</span>
                                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-bold">{iq.subject}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm italic">&quot;{iq.message}&quot;</p>
                                </div>
                                <Button variant="ghost" onClick={() => deleteInquiry(iq.$id)}><Trash2 className="w-4 h-4 text-gray-400" /></Button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}