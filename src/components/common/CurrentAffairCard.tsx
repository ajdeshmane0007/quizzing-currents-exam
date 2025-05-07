
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CurrentAffair } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Shield, Calendar, ChevronUp, Eye, BookmarkPlus, Share2 } from 'lucide-react';

interface CurrentAffairCardProps {
  article: CurrentAffair;
  onNext?: () => void;
  isPremium?: boolean;
  fullContent?: boolean;
}

const CurrentAffairCard: React.FC<CurrentAffairCardProps> = ({ article, onNext, isPremium = false, fullContent = false }) => {
  const isMobile = useIsMobile();
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(article.publishedDate);

  return (
    <Card className={`overflow-hidden h-full border border-purple-100 hover:shadow-md transition-all ${fullContent ? 'flex flex-col' : ''}`}>
      {article.imageUrl && (
        <div className={`relative ${fullContent ? 'h-56' : 'h-40'} w-full overflow-hidden`}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isPremium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black">
                <Shield className="h-3 w-3 mr-1" /> Premium
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader className={`py-3 ${fullContent ? 'flex-shrink-0' : ''} border-b border-purple-50`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={`${fullContent ? 'text-xl' : 'text-lg'} font-semibold text-purple-900 line-clamp-2`}>
              {article.title}
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1" /> {formattedDate}
            </CardDescription>
          </div>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{article.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className={`py-3 ${fullContent ? 'flex-grow overflow-auto' : ''}`}>
        <p className={`text-gray-600 ${fullContent ? '' : 'line-clamp-3'}`}>
          {article.content}
        </p>
        
        {fullContent && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {!fullContent && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className={`pt-2 pb-3 ${fullContent ? 'flex-shrink-0' : ''} ${fullContent ? 'bg-purple-50/50' : 'bg-white'}`}>
        {!fullContent ? (
          <div className="w-full flex justify-between items-center">
            <Button asChild variant="default" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Link to={`/current-affairs/${article.id}`} className="flex items-center">
                <span>Read</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <BookmarkPlus className="h-4 w-4 text-purple-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Share2 className="h-4 w-4 text-purple-600" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Link to={`/current-affairs/${article.id}`} className="flex items-center justify-center">
                <Eye className="mr-2 h-4 w-4" />
                <span>View Full Article</span>
              </Link>
            </Button>
            {onNext && (
              <Button 
                onClick={onNext} 
                className="w-full flex justify-center items-center gap-2" 
                variant="outline"
                size="sm"
              >
                <span>Next Article</span>
                <ChevronUp className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrentAffairCard;
