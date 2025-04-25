
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; type: number }[]>([]);
  
  useEffect(() => {
    if (show) {
      const newEmojis = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Random X position between 10% and 90%
        type: Math.floor(Math.random() * 5), // Random emoji type
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  const getEmoji = (type: number) => {
    switch (type) {
      case 0:
        return <Star className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <PartyPopper className="w-6 h-6 text-purple-500" />;
      case 3:
        return <Award className="w-6 h-6 text-blue-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-pink-500" />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className={cn(
            "absolute bottom-0 animate-[float_2s_ease-in-out]"
          )}
          style={{ left: `${emoji.x}%` }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
