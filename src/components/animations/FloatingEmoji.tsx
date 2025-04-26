
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; type: number; scale: number; delay: number }[]>([]);
  
  useEffect(() => {
    if (show) {
      const newEmojis = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Random X position between 10% and 90%
        type: Math.floor(Math.random() * 5), // Random emoji type
        scale: Math.random() * 0.5 + 0.8, // Random scale between 0.8 and 1.3
        delay: Math.random() * 500, // Random delay for staggered animation
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
        return <Star className="w-12 h-12 text-yellow-400" />;
      case 1:
        return <Trophy className="w-12 h-12 text-yellow-500" />;
      case 2:
        return <PartyPopper className="w-12 h-12 text-purple-500" />;
      case 3:
        return <Award className="w-12 h-12 text-blue-500" />;
      default:
        return <Sparkles className="w-12 h-12 text-pink-500" />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute bottom-0 animate-[float_2s_ease-in-out]"
          style={{ 
            left: `${emoji.x}%`, 
            transform: `scale(${emoji.scale})`,
            animationDelay: `${emoji.delay}ms` 
          }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
