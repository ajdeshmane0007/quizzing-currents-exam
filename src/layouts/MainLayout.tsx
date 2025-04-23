
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-8 md:px-6 md:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
