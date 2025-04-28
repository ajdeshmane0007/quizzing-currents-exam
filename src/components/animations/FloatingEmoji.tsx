
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
  isCorrect?: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show, isCorrect = true }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; y: number; type: number; scale: number; delay: number; rotation: number }[]>([]);
  
  useEffect(() => {
    if (show) {
      const newEmojis = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: Math.floor(Math.random() * (isCorrect ? 4 : 1)), // Only X icon for wrong answers
        scale: Math.random() * 0.5 + 0.75,
        delay: Math.random() * 1500,
        rotation: Math.random() * 720 - 360
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, isCorrect]);

  if (!show) return null;

  const getEmoji = (type: number) => {
    if (!isCorrect) {
      return <X className="w-[123px] h-[120px] text-red-500" />;
    }

    switch (type) {
      case 0:
        return <Star className="w-[123px] h-[120px] text-yellow-400" />;
      case 1:
        return <Trophy className="w-[123px] h-[120px] text-yellow-500" />;
      case 2:
        return <PartyPopper className="w-[123px] h-[120px] text-purple-500" />;
      default:
        return <Award className="w-[123px] h-[120px] text-blue-500" />;
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 pointer-events-none overflow-hidden z-50",
      isCorrect ? "bg-black/30" : "bg-black/40"
    )}>
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute animate-float"
          style={{ 
            left: `${emoji.x}%`,
            top: `${emoji.y}%`, 
            transform: `scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
            animationDelay: `${emoji.delay}ms`,
            animationDuration: '3s'
          }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
