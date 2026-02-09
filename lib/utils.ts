import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function is required by your components to prevent the "Export not found" error
export function createPageUrl(path: string) {
  if (!path) return '/';
  // Standardize the path to lowercase to prevent 404s
  const cleanPath = path.toLowerCase().replace(/^\//, '');
  return cleanPath === 'home' || cleanPath === '' ? '/' : `/${cleanPath}`;
}