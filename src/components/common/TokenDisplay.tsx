
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface TokenDisplayProps {
  showAddButton?: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ showAddButton = false }) => {
  const { currentUser, addTokens } = useApp();
  const isMobile = useIsMobile();
  
  const handleAddTokens = () => {
    // In a real app, this would be connected to a payment system
    // For demo purposes, we'll just add 5 tokens
    addTokens(5);
  };
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Badge variant="outline" className={`${isMobile ? 'px-1.5 py-0.5 text-xs' : 'px-3 py-1'}`}>
        <span className="font-semibold">{currentUser.tokens}</span> Token{currentUser.tokens !== 1 ? 's' : ''}
      </Badge>
      
      {showAddButton && (
        <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={handleAddTokens} className="text-xs h-7 px-2">
          Add Tokens
        </Button>
      )}
    </div>
  );
};

export default TokenDisplay;
