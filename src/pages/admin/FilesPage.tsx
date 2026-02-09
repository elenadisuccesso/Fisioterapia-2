import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Grid, List, Filter,
  Video, Image, FileText, MoreVertical, 
  Download, Trash2, Edit, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFiles, formatFileSize } from '@/contexts/FileContext';
import type { FileItem, FileType } from '@/types';

const filters: { id: FileType | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Tutti', icon: FolderOpen },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'image', label: 'Immagini', icon: Image },
  { id: 'document', label: 'Documenti', icon: FileText },
];

function FileCard({ 
  file, 
  viewMode, 
  onDelete 
}: { 
  file: FileItem; 
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFileIcon = () => {
    if (file.type === 'video') return Video;
    if (file.type === 'image') return Image;
    return FileText;
  };

  const FileIcon = getFileIcon();

  if (viewMode === 'list') {
    return (
      <div className="flex items-center p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all group">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          file.type === 'video' ? 'bg-red-100' :
          file.type === 'image' ? 'bg-blue-100' :
          'bg-yellow-100'
        }`}>
          {file.type === 'image' && file.thumbnailUrl && !imageError ? (
            <img 
              src={file.thumbnailUrl} 
              alt={file.name}
              className="w-full h-full object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <FileIcon className={`w-6 h-6 ${
              file.type === 'video' ? 'text-red-600' :
              file.type === 'image' ? 'text-blue-600' :
              'text-yellow-600'
            }`} />
          )}
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <p className="font-medium text-[#2C3E50] truncate">{file.name}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span>{file.category}</span>
            <span>•</span>
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{new Date(file.uploadedAt).toLocaleDateString('it-IT')}</span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
              >
                <button
                  onClick={() => alert('Download in sviluppo')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Scarica
                </button>
                <button
                  onClick={() => alert('Rinomina in sviluppo')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Rinomina
                </button>
                <button
                  onClick={() => {
                    onDelete(file.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Elimina
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all group overflow-hidden">
      <div className={`aspect-video ${
        file.type === 'video' ? 'bg-red-50' :
        file.type === 'image' ? 'bg-blue-50' :
        'bg-yellow-50'
      } flex items-center justify-center relative`}>
        {file.type === 'image' && file.thumbnailUrl && !imageError ? (
          <img 
            src={file.thumbnailUrl} 
            alt={file.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <FileIcon className={`w-16 h-16 ${
            file.type === 'video' ? 'text-red-400' :
            file.type === 'image' ? 'text-blue-400' :
            'text-yellow-400'
          }`} />
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-12 right-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
            >
              <button
                onClick={() => alert('Download in sviluppo')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Scarica
              </button>
              <button
                onClick={() => {
                  onDelete(file.id);
                  setShowMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Elimina
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4">
        <p className="font-medium text-[#2C3E50] truncate">{file.name}</p>
        <p className="text-sm text-gray-500">{file.category}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{formatFileSize(file.size)}</span>
          <span>{new Date(file.uploadedAt).toLocaleDateString('it-IT')}</span>
        </div>
      </div>
    </div>
  );
}

export function FilesPage() {
  const navigate = useNavigate();
  const { files, deleteFile, searchFiles } = useFiles();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<FileType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredFiles = searchQuery 
    ? searchFiles(searchQuery)
    : activeFilter === 'all' 
      ? files 
      : files.filter(f => f.type === activeFilter);

  const handleDelete = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteFile(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#2C3E50]">I miei file</h1>
                <p className="text-gray-500 text-sm">Gestisci i tuoi contenuti</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/admin/upload')}
              className="bg-[#1CAAD9] hover:bg-[#1590B8] text-white"
            >
              Carica file
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-4 shadow-card mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cerca file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters & View Toggle */}
            <div className="flex items-center space-x-4">
              {/* Type Filters */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <div className="flex space-x-1">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter.id
                          ? 'bg-[#1CAAD9] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Files Grid/List */}
        {filteredFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nessun file trovato</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? 'Nessun risultato per la tua ricerca' 
                : 'Inizia caricando il tuo primo file'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => navigate('/admin/upload')}
                className="bg-[#1CAAD9] hover:bg-[#1590B8] text-white"
              >
                Carica file
              </Button>
            )}
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-3'
          }>
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <FileCard 
                  file={file} 
                  viewMode={viewMode} 
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">
                  Conferma eliminazione
                </h3>
                <p className="text-gray-600 mb-6">
                  Sei sicuro di voler eliminare questo file? L'azione non può essere annullata.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                  >
                    Annulla
                  </Button>
                  <Button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Elimina
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
