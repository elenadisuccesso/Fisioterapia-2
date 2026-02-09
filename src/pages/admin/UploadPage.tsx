import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, Image, Video, FileText, 
  CheckCircle, AlertCircle, ArrowLeft, Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFiles } from '@/contexts/FileContext';

const categories = [
  { id: 'video-educativi', name: 'Video educativi', icon: Video },
  { id: 'esercizi', name: 'Esercizi riabilitativi', icon: Folder },
  { id: 'documenti', name: 'Documenti clinici', icon: FileText },
  { id: 'immagini', name: 'Immagini diagnostiche', icon: Image },
];

interface UploadingFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { uploadFile } = useFiles();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles: UploadingFile[] = Array.from(files).map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'uploading',
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    // Simulate upload for each file
    newFiles.forEach(uploadingFile => {
      simulateUpload(uploadingFile);
    });
  };

  const simulateUpload = async (uploadingFile: UploadingFile) => {
    const category = categories.find(c => c.id === selectedCategory)?.name || categories[0].name;
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === uploadingFile.id 
            ? { ...f, progress: Math.min(f.progress + Math.random() * 30, 90) }
            : f
        )
      );
    }, 300);

    try {
      await uploadFile(uploadingFile.file, category, description);
      
      clearInterval(progressInterval);
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === uploadingFile.id 
            ? { ...f, progress: 100, status: 'completed' }
            : f
        )
      );
    } catch (error) {
      clearInterval(progressInterval);
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === uploadingFile.id 
            ? { ...f, status: 'error', error: 'Errore durante il caricamento' }
            : f
        )
      );
    }
  };

  const removeFile = (id: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('image/')) return Image;
    return FileText;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#2C3E50]">Carica file</h1>
                <p className="text-gray-500 text-sm">Aggiungi nuovi contenuti alla tua libreria</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Category Selection */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <Label className="text-base font-medium mb-4 block">Categoria</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedCategory === category.id
                      ? 'border-[#1CAAD9] bg-[#1CAAD9]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <category.icon className={`w-6 h-6 mx-auto mb-2 ${
                    selectedCategory === category.id ? 'text-[#1CAAD9]' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm font-medium ${
                    selectedCategory === category.id ? 'text-[#1CAAD9]' : 'text-gray-600'
                  }`}>
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <Label htmlFor="description" className="text-base font-medium mb-4 block">
              Descrizione (opzionale)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Aggiungi una descrizione per i file..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive
                ? 'border-[#1CAAD9] bg-[#1CAAD9]/5'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="video/*,image/*,.pdf,.doc,.docx"
            />
            <div className="w-16 h-16 bg-[#1CAAD9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-[#1CAAD9]" />
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-2">
              Trascina i file qui
            </h3>
            <p className="text-gray-500 mb-4">
              o clicca per selezionare i file dal tuo dispositivo
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded">Video: MP4, MOV</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Immagini: JPG, PNG</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Documenti: PDF, DOC</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Dimensione massima: 100MB per file</p>
          </div>

          {/* Uploading Files List */}
          <AnimatePresence>
            {uploadingFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl shadow-card overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium text-[#2C3E50]">File in caricamento</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {uploadingFiles.map((uploadingFile) => {
                    const FileIcon = getFileIcon(uploadingFile.file);
                    return (
                      <motion.div
                        key={uploadingFile.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-4 flex items-center space-x-4"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          uploadingFile.file.type.startsWith('video/') ? 'bg-red-100' :
                          uploadingFile.file.type.startsWith('image/') ? 'bg-blue-100' :
                          'bg-yellow-100'
                        }`}>
                          <FileIcon className={`w-5 h-5 ${
                            uploadingFile.file.type.startsWith('video/') ? 'text-red-600' :
                            uploadingFile.file.type.startsWith('image/') ? 'text-blue-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#2C3E50] truncate">
                            {uploadingFile.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(uploadingFile.file.size)}
                          </p>
                          {uploadingFile.status === 'uploading' && (
                            <div className="mt-2">
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-[#1CAAD9]"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadingFile.progress}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          {uploadingFile.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : uploadingFile.status === 'error' ? (
                            <div className="flex items-center text-red-500">
                              <AlertCircle className="w-5 h-5 mr-1" />
                              <span className="text-xs">{uploadingFile.error}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {Math.round(uploadingFile.progress)}%
                            </span>
                          )}
                          <button
                            onClick={() => removeFile(uploadingFile.id)}
                            className="ml-3 p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Dashboard */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              className="border-gray-300 text-gray-600"
            >
              Torna alla dashboard
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
