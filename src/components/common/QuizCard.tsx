
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
    <Card className="overflow-hidden h-full hover:shadow-md transition-all">
      <CardHeader className="bg-slate-50 py-2.5">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{quiz.title}</CardTitle>
          {isCompleted && (
            <Badge variant="secondary" className="text-xs">
              Completed
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
          <Calendar className="h-3 w-3" />
          <span>{quiz.timeLimit} min</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-0 text-xs">
        <div className="mt-1 text-xs text-muted-foreground">
          <strong>Questions:</strong> {quiz.questions.length}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-1 pb-2">
        <Button asChild className="w-full text-xs py-1 h-7" size="sm">
          <Link to={linkTo}>
            {isCompleted ? "View Results" : "Start Quiz"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
