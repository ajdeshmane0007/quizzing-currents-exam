
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CurrentAffair } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Shield, Calendar, ChevronUp, ChevronDown, Eye, BookmarkPlus, Share2 } from 'lucide-react';

interface CurrentAffairCardProps {
  article: CurrentAffair;
  onNext?: () => void;
  onPrevious?: () => void;
  isPremium?: boolean;
  fullContent?: boolean;
  isDashboard?: boolean;
}

const CurrentAffairCard: React.FC<CurrentAffairCardProps> = ({ 
  article, 
  onNext, 
  onPrevious,
  isPremium = false, 
  fullContent = false,
  isDashboard = false
}) => {
  const isMobile = useIsMobile();
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(article.publishedDate);

  return (
    <Card className="overflow-hidden h-full border border-purple-100 hover:shadow-lg transition-all flex flex-col bg-white/90 backdrop-blur-sm">
      {article.imageUrl && !isDashboard && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          {article.isPremium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black">
                <Shield className="h-3 w-3 mr-1" /> Premium
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader className={`py-3 flex-shrink-0 border-b border-purple-50 bg-white ${isDashboard ? 'pb-1' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={`text-xl font-semibold text-purple-900 ${isDashboard ? 'line-clamp-1 text-base' : 'line-clamp-2'}`}>
              {article.title}
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1" /> {formattedDate}
            </CardDescription>
          </div>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{article.category}</Badge>
        </div>
      </CardHeader>
      
      {(!isDashboard || fullContent) && (
        <CardContent className={`py-4 flex-grow overflow-auto ${isDashboard ? 'pt-2 pb-1' : ''}`}>
          <p className="text-gray-600">
            {fullContent ? article.content : `${article.content.slice(0, 200)}${article.content.length > 200 ? '...' : ''}`}
          </p>
          
          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      )}
      
      {isDashboard ? (
        <CardFooter className="flex-shrink-0 pt-2 pb-3">
          <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-sm h-8">
            <Link to={`/current-affairs/${article.id}`} className="flex items-center justify-center">
              <Eye className="mr-2 h-3 w-3" />
              <span>Read Article</span>
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="flex-shrink-0 bg-purple-50/50 pt-2 pb-3">
          <div className="w-full space-y-2">
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Link to={`/current-affairs/${article.id}`} className="flex items-center justify-center">
                <Eye className="mr-2 h-4 w-4" />
                <span>View Full Article</span>
              </Link>
            </Button>
            
            <div className="flex w-full justify-between">
              <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center">
                <BookmarkPlus className="h-4 w-4 mr-1 text-purple-600" />
                <span className="text-sm">Save</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-1 text-purple-600" />
                <span className="text-sm">Share</span>
              </Button>
              
              <div className="flex-1 flex">
                {onPrevious && (
                  <Button 
                    onClick={onPrevious} 
                    variant="ghost"
                    size="sm"
                    className="flex-1 flex items-center justify-center text-indigo-700"
                  >
                    {isMobile ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <>
                        <span className="text-sm">Previous</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
                
                {onNext && (
                  <Button 
                    onClick={onNext} 
                    variant="ghost"
                    size="sm"
                    className="flex-1 flex items-center justify-center text-indigo-700"
                  >
                    {isMobile ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <>
                        <span className="text-sm">Next</span>
                        <ChevronUp className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CurrentAffairCard;
