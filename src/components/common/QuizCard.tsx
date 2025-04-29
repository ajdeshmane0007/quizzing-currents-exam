
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/types';
import { Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizCardProps {
  quiz: Quiz;
  linkTo: string;
  isCompleted?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, linkTo, isCompleted }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="bg-slate-50 py-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{quiz.title}</CardTitle>
          <Badge variant={isCompleted ? "secondary" : "default"} className="text-xs">
            {isCompleted ? "Completed" : quiz.category}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
          <Calendar className="h-3 w-3" />
          <span>{quiz.timeLimit} min</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-0 text-xs">
        {!isMobile && (
          <p className="text-xs line-clamp-2">{quiz.description}</p>
        )}
        <div className="mt-2 text-xs text-muted-foreground">
          <strong>Questions:</strong> {quiz.questions.length}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-2 pb-3">
        <Button asChild className="w-full text-sm py-1 h-8" size="sm">
          <Link to={linkTo}>
            {isCompleted ? "View Results" : "Start Quiz"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
