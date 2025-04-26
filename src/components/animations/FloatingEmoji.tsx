
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; type: number; scale: number; delay: number; rotation: number }[]>([]);
  
  useEffect(() => {
    if (show) {
      const newEmojis = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Random X position between 10% and 90%
        type: Math.floor(Math.random() * 4), // Random emoji type
        scale: Math.random() * 0.8 + 1.2, // Random scale between 1.2 and 2
        delay: Math.random() * 800, // Random delay for staggered animation
        rotation: Math.random() * 360 // Random rotation
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  const getEmoji = (type: number) => {
    switch (type) {
      case 0:
        return <Star className="w-16 h-16 text-yellow-400" />;
      case 1:
        return <Trophy className="w-16 h-16 text-yellow-500" />;
      case 2:
        return <PartyPopper className="w-16 h-16 text-purple-500" />;
      default:
        return <Award className="w-16 h-16 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute bottom-0 animate-float"
          style={{ 
            left: `${emoji.x}%`, 
            transform: `scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
            animationDelay: `${emoji.delay}ms`,
            animationDuration: '2.5s'
          }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
