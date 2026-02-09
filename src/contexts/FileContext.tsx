import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { FileItem, FileType, DashboardStats } from '@/types';

interface FileContextType {
  files: FileItem[];
  stats: DashboardStats;
  isLoading: boolean;
  uploadFile: (file: File, category: string, description?: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  getFilesByType: (type: FileType) => FileItem[];
  getFilesByCategory: (category: string) => FileItem[];
  searchFiles: (query: string) => FileItem[];
}

const FileContext = createContext<FileContextType | undefined>(undefined);

// Demo files for initial state
const DEMO_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Esercizi spalla.mp4',
    type: 'video',
    size: 15_000_000,
    url: '#',
    thumbnailUrl: '/hero-image.jpg',
    category: 'Esercizi riabilitativi',
    uploadedAt: '2024-01-15T10:30:00Z',
    description: 'Video dimostrativo esercizi per la spalla',
  },
  {
    id: '2',
    name: 'Valutazione iniziale.pdf',
    type: 'document',
    size: 2_500_000,
    url: '#',
    category: 'Documenti clinici',
    uploadedAt: '2024-01-14T14:20:00Z',
    description: 'Scheda valutazione paziente',
  },
  {
    id: '3',
    name: 'Postura corretta.jpg',
    type: 'image',
    size: 3_200_000,
    url: '/hero-image.jpg',
    thumbnailUrl: '/hero-image.jpg',
    category: 'Immagini diagnostiche',
    uploadedAt: '2024-01-13T09:15:00Z',
    description: 'Esempio di postura corretta',
  },
  {
    id: '4',
    name: 'Stretching mattutino.mp4',
    type: 'video',
    size: 45_000_000,
    url: '#',
    thumbnailUrl: '/hero-image.jpg',
    category: 'Video educativi',
    uploadedAt: '2024-01-12T16:45:00Z',
    description: 'Routine di stretching mattutino',
  },
  {
    id: '5',
    name: 'Referto RM.pdf',
    type: 'document',
    size: 1_800_000,
    url: '#',
    category: 'Documenti clinici',
    uploadedAt: '2024-01-11T11:00:00Z',
    description: 'Referto risonanza magnetica',
  },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileTypeFromMimeType(mimeType: string): FileType {
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  return 'document';
}

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load files from localStorage or use demo files
    const storedFiles = localStorage.getItem('fisiocare_files');
    if (storedFiles) {
      try {
        setFiles(JSON.parse(storedFiles));
      } catch {
        setFiles(DEMO_FILES);
        localStorage.setItem('fisiocare_files', JSON.stringify(DEMO_FILES));
      }
    } else {
      setFiles(DEMO_FILES);
      localStorage.setItem('fisiocare_files', JSON.stringify(DEMO_FILES));
    }
    setIsLoading(false);
  }, []);

  // Calculate stats
  const stats: DashboardStats = {
    totalVideos: files.filter(f => f.type === 'video').length,
    totalImages: files.filter(f => f.type === 'image').length,
    totalDocuments: files.filter(f => f.type === 'document').length,
    storageUsed: files.reduce((acc, f) => acc + f.size, 0),
    storageLimit: 10 * 1024 * 1024 * 1024, // 10GB
  };

  const uploadFile = async (file: File, category: string, description?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const newFile: FileItem = {
          id: Date.now().toString(),
          name: file.name,
          type: getFileTypeFromMimeType(file.type),
          size: file.size,
          url: reader.result as string,
          thumbnailUrl: file.type.startsWith('image/') ? reader.result as string : undefined,
          category,
          uploadedAt: new Date().toISOString(),
          description,
        };

        const updatedFiles = [newFile, ...files];
        setFiles(updatedFiles);
        localStorage.setItem('fisiocare_files', JSON.stringify(updatedFiles));
        resolve();
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  };

  const deleteFile = async (id: string): Promise<void> => {
    const updatedFiles = files.filter(f => f.id !== id);
    setFiles(updatedFiles);
    localStorage.setItem('fisiocare_files', JSON.stringify(updatedFiles));
  };

  const getFilesByType = (type: FileType): FileItem[] => {
    return files.filter(f => f.type === type);
  };

  const getFilesByCategory = (category: string): FileItem[] => {
    return files.filter(f => f.category === category);
  };

  const searchFiles = (query: string): FileItem[] => {
    const lowerQuery = query.toLowerCase();
    return files.filter(f => 
      f.name.toLowerCase().includes(lowerQuery) ||
      f.description?.toLowerCase().includes(lowerQuery) ||
      f.category.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <FileContext.Provider value={{
      files,
      stats,
      isLoading,
      uploadFile,
      deleteFile,
      getFilesByType,
      getFilesByCategory,
      searchFiles,
    }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
}

export { formatFileSize };
