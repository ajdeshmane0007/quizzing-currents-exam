
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/types';
import { Calendar } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  linkTo: string;
  isCompleted?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, linkTo, isCompleted }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 pb-4">
        <div className="flex justify-between items-start">
          <CardTitle>{quiz.title}</CardTitle>
          <Badge variant={isCompleted ? "secondary" : "default"}>
            {isCompleted ? "Completed" : quiz.category}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-2">
          <Calendar className="h-4 w-4" />
          <span>{quiz.timeLimit} min</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm line-clamp-3">{quiz.description}</p>
        <div className="mt-4 text-xs text-muted-foreground">
          <strong>Questions:</strong> {quiz.questions.length}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-2">
        <Button asChild className="w-full">
          <Link to={linkTo}>
            {isCompleted ? "View Results" : "Start Quiz"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
