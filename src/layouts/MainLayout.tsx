
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useApp();
  const isAdmin = currentUser?.role === 'admin';
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col items-center bg-indigo-50">
      {/* Mobile optimized container */}
      <div className="w-full max-w-full bg-white min-h-screen flex flex-col shadow-sm border border-gray-100">
        <Navbar />
        <div className={`flex-1 px-4 py-3 ${isAdmin ? 'sm:px-6' : ''} ${isMobile ? 'pb-20' : ''}`}>
          {children}
        </div>
        {isMobile && isAuthenticated ? <BottomNav /> : <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
