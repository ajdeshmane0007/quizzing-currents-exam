
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useApp();
  const isMobile = useIsMobile();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Responsive container with better desktop support */}
      <div className={`w-full ${isMobile ? 'max-w-full' : isAdmin ? 'max-w-7xl' : 'max-w-7xl'} bg-white rounded-lg shadow-lg min-h-screen flex flex-col border border-gray-200`}>
        <Navbar />
        <div className={`flex-1 px-3 ${isAdmin ? 'sm:px-6 lg:px-8' : 'sm:px-6'} py-3 sm:py-6`}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
