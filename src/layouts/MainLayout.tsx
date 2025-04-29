
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { useApp } from '@/contexts/AppContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useApp();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Mobile container with max-width */}
      <div className="w-full max-w-md bg-white shadow-lg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 px-4 py-6">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
