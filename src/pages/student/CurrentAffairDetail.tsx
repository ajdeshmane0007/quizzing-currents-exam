
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LockContent from '@/components/common/LockContent';
import TokenDisplay from '@/components/common/TokenDisplay';

const CurrentAffairDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentAffairs } = useApp();
  const navigate = useNavigate();
  
  // Find current article and its index
  const currentIndex = currentAffairs.findIndex(a => a.id === id);
  const article = currentAffairs[currentIndex];

  // Determine next and previous articles
  const nextArticle = currentIndex < currentAffairs.length - 1 ? currentAffairs[currentIndex + 1] : null;
  const prevArticle = currentIndex > 0 ? currentAffairs[currentIndex - 1] : null;
  
  if (!article) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold">Article not found</h2>
          <p className="mt-2 text-muted-foreground">The requested article does not exist.</p>
          <Button onClick={() => navigate('/current-affairs')} className="mt-6">
            Back to Current Affairs
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(article.publishedDate);

  // Navigate to next or previous article
  const goToArticle = (articleId: string) => {
    navigate(`/current-affairs/${articleId}`);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/current-affairs')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Current Affairs
        </Button>
        
        <TokenDisplay />
      </div>

      <article className="prose prose-slate max-w-none">
        {article.imageUrl && (
          <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg sm:h-96">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-2">
          <Badge>{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        
        <h1 className="text-3xl font-bold">{article.title}</h1>
        
        <LockContent
          title="Premium Content"
          description="You need a token to view this current affair article."
        >
          <div className="mt-6 space-y-4">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            {prevArticle ? (
              <Button 
                variant="outline" 
                onClick={() => goToArticle(prevArticle.id)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : <div></div>}
            
            {nextArticle && (
              <Button 
                variant="outline" 
                onClick={() => goToArticle(nextArticle.id)}
                className="flex items-center ml-auto"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </LockContent>
      </article>
    </MainLayout>
  );
};

export default CurrentAffairDetail;
