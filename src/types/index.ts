// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// File types
export type FileType = 'video' | 'image' | 'document';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  category: string;
  uploadedAt: string;
  description?: string;
}

export interface FileCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Stats
export interface DashboardStats {
  totalVideos: number;
  totalImages: number;
  totalDocuments: number;
  storageUsed: number;
  storageLimit: number;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
