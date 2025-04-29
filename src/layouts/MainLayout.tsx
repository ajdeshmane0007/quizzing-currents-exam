
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useApp();
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Responsive container with material design appearance */}
      <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'} bg-white rounded-lg shadow-lg min-h-screen flex flex-col border border-gray-200`}>
        <Navbar />
        <div className="flex-1 px-3 sm:px-4 py-3 sm:py-4">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
