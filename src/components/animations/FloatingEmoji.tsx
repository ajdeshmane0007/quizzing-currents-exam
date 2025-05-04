
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
  isCorrect?: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show, isCorrect = true }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; y: number; type: number; scale: number; delay: number; rotation: number }[]>([]);
  
  useEffect(() => {
    if (show && isCorrect) {
      // Only show emojis for correct answers
      const newEmojis = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Keep emojis more centered horizontally
        y: Math.random() * 70 + 15, // Distribute vertically but avoid edges
        type: Math.floor(Math.random() * 4), // Use all icon types for correct answers
        scale: Math.random() * 0.4 + 0.8, // Larger scale for mobile view
        delay: Math.random() * 1000, // Faster animations for mobile
        rotation: Math.random() * 360 - 180 // Less rotation for cleaner look
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 2500); // Shorter duration for mobile UX

      return () => clearTimeout(timer);
    } else {
      // For wrong answers or when not showing, clear emojis
      setEmojis([]);
    }
  }, [show, isCorrect]);

  if (!show || !isCorrect) return null;

  const getEmoji = (type: number) => {
    switch (type) {
      case 0:
        return <Star className="w-[80px] h-[80px] text-yellow-400" />;
      case 1:
        return <Trophy className="w-[80px] h-[80px] text-yellow-500" />;
      case 2:
        return <PartyPopper className="w-[80px] h-[80px] text-purple-500" />;
      default:
        return <Award className="w-[80px] h-[80px] text-blue-500" />;
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 pointer-events-none overflow-hidden z-50",
      "bg-black/40"
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
            animationDuration: '2s'
          }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
