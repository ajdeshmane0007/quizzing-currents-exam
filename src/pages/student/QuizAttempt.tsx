
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import LockContent from '@/components/common/LockContent';
import TokenDisplay from '@/components/common/TokenDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Check, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuizAttemptContent: React.FC<{ quizId: string }> = ({ quizId }) => {
  const { quizzes } = useApp();
  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerSubmit(-1); // Auto-submit when time runs out
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    // Reset timer and states when moving to next question
    setTimeLeft(10);
    setIsAnswered(false);
    setIsCelebrating(false);
  }, [currentQuestionIndex]);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSubmit = (selectedOptionIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;
    
    if (isCorrect) {
      setIsCelebrating(true);
      setTimeout(() => {
        setIsCelebrating(false);
      }, 1500);
    }

    setSelectedAnswers([...selectedAnswers, selectedOptionIndex]);

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="h-5 w-5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <Card className={cn(
        "transition-all duration-300",
        isCelebrating && "animate-scale-in bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100"
      )}>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{currentQuestion.text}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => (
              <HoverCard key={optIdx}>
                <HoverCardTrigger asChild>
                  <div
                    onClick={() => !isAnswered && handleAnswerSubmit(optIdx)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                      !isAnswered && "hover:bg-accent hover:border-accent",
                      isAnswered && optIdx === currentQuestion.correctOptionIndex && "bg-green-100 border-green-500",
                      isAnswered && optIdx !== currentQuestion.correctOptionIndex && selectedAnswers[currentQuestionIndex] === optIdx && "bg-red-100 border-red-500"
                    )}
                  >
                    <div className="flex-1">{option}</div>
                    {isAnswered && optIdx === currentQuestion.correctOptionIndex && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  {isAnswered ? (
                    optIdx === currentQuestion.correctOptionIndex ? 
                    "Correct answer! Well done!" : 
                    "Not quite right. Keep trying!"
                  ) : (
                    "Click to select this answer"
                  )}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const QuizAttempt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizzes } = useApp();
  
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold">Quiz not found</h2>
          <p className="mt-2 text-muted-foreground">The requested quiz does not exist.</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Back to Quizzes
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/quizzes')}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <span className="mr-1">←</span> Back to Quizzes
        </button>
        <TokenDisplay />
      </div>
      
      <LockContent 
        tokenCost={1}
        title="Quiz Access"
        description={`This quiz requires 1 token to attempt. There are ${quiz.questions.length} questions.`}
      >
        <QuizAttemptContent quizId={id!} />
      </LockContent>
    </MainLayout>
  );
};

export default QuizAttempt;
