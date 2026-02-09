import About from '@/app/about/page';
import Admin from '@/pages/Admin';
import Blog from '@/app/blog/page';
import BlogPost from '@/app/blog/[id]/page';
import Contact from '@/pages/Contact';
import Gallery from '@/app/gallery/page';
import Home from '@/pages/Home';
import Programs from '@/app/programs/page';
import Layout from '@/Layout';
import type { ComponentType } from "react";

// Using standard imports resolves the Server Component SSR conflict
const PAGES: Record<string, ComponentType<unknown>> = {
    "About": About,
    "Admin": Admin,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Programs": Programs,
};

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};