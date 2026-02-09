import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, Image, FileText, HardDrive, 
  Upload, TrendingUp, Clock, FolderOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFiles, formatFileSize } from '@/contexts/FileContext';

function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle,
  color,
  delay 
}: { 
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#2C3E50]">{value}</p>
          {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function RecentFiles() {
  const { files } = useFiles();
  const recentFiles = files.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#2C3E50]">File recenti</h3>
          <Button variant="ghost" size="sm" className="text-[#1CAAD9]">
            Vedi tutti
          </Button>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {recentFiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Nessun file caricato</p>
          </div>
        ) : (
          recentFiles.map((file) => (
            <div key={file.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                file.type === 'video' ? 'bg-red-100' :
                file.type === 'image' ? 'bg-blue-100' :
                'bg-yellow-100'
              }`}>
                {file.type === 'video' ? (
                  <Video className="w-5 h-5 text-red-600" />
                ) : file.type === 'image' ? (
                  <Image className="w-5 h-5 text-blue-600" />
                ) : (
                  <FileText className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2C3E50] truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                <p className="text-xs text-gray-400">
                  {new Date(file.uploadedAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function StorageChart({ used, limit }: { used: number; limit: number }) {
  const percentage = Math.min((used / limit) * 100, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2C3E50]">Spazio di archiviazione</h3>
        <HardDrive className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="relative pt-2">
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`h-full rounded-full ${
              percentage > 90 ? 'bg-red-500' :
              percentage > 70 ? 'bg-yellow-500' :
              'bg-gradient-to-r from-[#1CAAD9] to-[#1ABC9C]'
            }`}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600">{formatFileSize(used)} usati</span>
          <span className="text-gray-400">{formatFileSize(limit)} totali</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Video className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Video</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <Image className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Immagini</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <FileText className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Documenti</p>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { stats } = useFiles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CAAD9]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2C3E50]">Dashboard</h1>
              <p className="text-gray-500 text-sm">
                Benvenuto, {user?.name}
              </p>
            </div>
            <Button 
              onClick={() => navigate('/admin/upload')}
              className="bg-[#1CAAD9] hover:bg-[#1590B8] text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Carica file
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Video}
            title="Video"
            value={stats.totalVideos}
            subtitle="caricati"
            color="bg-red-500"
            delay={0}
          />
          <StatCard
            icon={Image}
            title="Immagini"
            value={stats.totalImages}
            subtitle="caricate"
            color="bg-blue-500"
            delay={0.1}
          />
          <StatCard
            icon={FileText}
            title="Documenti"
            value={stats.totalDocuments}
            subtitle="caricati"
            color="bg-yellow-500"
            delay={0.2}
          />
          <StatCard
            icon={TrendingUp}
            title="File totali"
            value={stats.totalVideos + stats.totalImages + stats.totalDocuments}
            subtitle="nel sistema"
            color="bg-green-500"
            delay={0.3}
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentFiles />
          </div>
          <div>
            <StorageChart used={stats.storageUsed} limit={stats.storageLimit} />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Azioni rapide</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/admin/upload')}
              className="flex items-center p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all text-left"
            >
              <div className="w-12 h-12 bg-[#1CAAD9]/10 rounded-xl flex items-center justify-center mr-4">
                <Upload className="w-6 h-6 text-[#1CAAD9]" />
              </div>
              <div>
                <p className="font-medium text-[#2C3E50]">Carica file</p>
                <p className="text-sm text-gray-500">Aggiungi nuovi contenuti</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/admin/files')}
              className="flex items-center p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all text-left"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FolderOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-[#2C3E50]">Gestisci file</p>
                <p className="text-sm text-gray-500">Organizza i tuoi contenuti</p>
              </div>
            </button>
            <button 
              onClick={() => alert('Funzionalità in sviluppo')}
              className="flex items-center p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all text-left"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-[#2C3E50]">Attività recente</p>
                <p className="text-sm text-gray-500">Visualizza le ultime azioni</p>
              </div>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
