
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Trophy } from 'lucide-react';

interface FloatingEmojiProps {
  show: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; y: number; type: number; scale: number; delay: number; rotation: number }[]>([]);
  
  useEffect(() => {
    if (show) {
      const newEmojis = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: Math.floor(Math.random() * 4),
        scale: Math.random() * 0.5 + 0.75, // Adjusted scale for 123x120px size
        delay: Math.random() * 1500,
        rotation: Math.random() * 720 - 360
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  const getEmoji = (type: number) => {
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50 bg-black/30">
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
