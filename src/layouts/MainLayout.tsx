
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
    <div className="flex min-h-screen flex-col items-center bg-gray-50">
      {/* Material design inspired container with subtle shadow */}
      <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-7xl'} bg-white rounded-lg shadow-sm min-h-screen flex flex-col border border-gray-100`}>
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
