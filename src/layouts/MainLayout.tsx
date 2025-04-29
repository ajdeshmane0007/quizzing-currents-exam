
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
      {/* Mobile container with max-width and material design appearance */}
      <div className="w-full max-w-md bg-white rounded-none shadow-lg min-h-screen flex flex-col border border-gray-200">
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
