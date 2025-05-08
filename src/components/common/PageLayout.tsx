
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = "", 
  containerClassName = ""
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 ${className}`}>
      <div className={`w-full max-w-md bg-white shadow-xl rounded-lg min-h-screen flex flex-col ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
