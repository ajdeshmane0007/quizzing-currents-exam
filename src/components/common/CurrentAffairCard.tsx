
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CurrentAffair } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface CurrentAffairCardProps {
  article: CurrentAffair;
}

const CurrentAffairCard: React.FC<CurrentAffairCardProps> = ({ article }) => {
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
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <Badge>{article.category}</Badge>
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
      <CardFooter className="bg-white pt-2">
        <Button asChild className="w-full" variant="outline">
          <Link to={`/current-affairs/${article.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentAffairCard;
