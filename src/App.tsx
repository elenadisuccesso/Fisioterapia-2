import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { FileProvider } from '@/contexts/FileContext';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { ServicesPage } from '@/pages/public/ServicesPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ContactPage } from '@/pages/public/ContactPage';

// Admin Pages
import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { UploadPage } from '@/pages/admin/UploadPage';
import { FilesPage } from '@/pages/admin/FilesPage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CAAD9]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Layout with Navbar and Footer
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        } 
      />
      <Route 
        path="/servizi" 
        element={
          <PublicLayout>
            <ServicesPage />
          </PublicLayout>
        } 
      />
      <Route 
        path="/chi-sono" 
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        } 
      />
      <Route 
        path="/contatti" 
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        } 
      />

      {/* Admin Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/upload" 
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/files" 
        element={
          <ProtectedRoute>
            <FilesPage />
          </ProtectedRoute>
        } 
      />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;
