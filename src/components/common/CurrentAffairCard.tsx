
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CurrentAffair } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Shield } from 'lucide-react';

interface CurrentAffairCardProps {
  article: CurrentAffair;
  onNext?: () => void;
  isPremium?: boolean;
}

const CurrentAffairCard: React.FC<CurrentAffairCardProps> = ({ article, onNext, isPremium = false }) => {
  const isMobile = useIsMobile();
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(article.publishedDate);

  return (
    <Card className="overflow-hidden">
      {article.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isPremium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-amber-400 text-black">
                <Shield className="h-3 w-3 mr-1" /> Premium
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge>{article.category}</Badge>
            {isPremium && !article.imageUrl && (
              <Badge variant="secondary" className="bg-amber-400 text-black">
                <Shield className="h-3 w-3 mr-1" /> Premium
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isMobile && (
          <p className="text-sm line-clamp-3">{article.content}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {!isMobile && article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-2 flex flex-col gap-2">
        <Button asChild className="w-full" variant="outline">
          <Link to={`/current-affairs/${article.id}`}>Read More</Link>
        </Button>
        {onNext && (
          <Button 
            onClick={onNext} 
            className="w-full flex justify-between items-center" 
            variant="ghost"
            size="sm"
          >
            <span>Next Article</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrentAffairCard;
