
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdDisplayProps {
  onClose: () => void;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full bg-white">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Advertisement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Advertisement Content</p>
          </div>
          <Button onClick={onClose} className="w-full">
            Continue Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdDisplay;
