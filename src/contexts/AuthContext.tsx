import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  email: 'admin@fisiocare.it',
  name: 'Dott. Marco Rossi',
  role: 'admin',
  avatar: '/physio-portrait.jpg',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem('fisiocare_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setState({
          user: parsed.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('fisiocare_auth');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, this would call an API
    if (email === 'admin@fisiocare.it' && password === 'admin123') {
      const authData = { user: DEMO_USER, token: 'demo-token' };
      localStorage.setItem('fisiocare_auth', JSON.stringify(authData));
      setState({
        user: DEMO_USER,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('fisiocare_auth');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      const storedAuth = localStorage.getItem('fisiocare_auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        localStorage.setItem('fisiocare_auth', JSON.stringify({
          ...parsed,
          user: updatedUser,
        }));
      }
      setState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CAAD9]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login - handled by router
    return null;
  }

  return <>{children}</>;
}
