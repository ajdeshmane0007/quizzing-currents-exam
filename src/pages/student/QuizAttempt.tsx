import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import TokenDisplay from '@/components/common/TokenDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import FloatingSymbol from '@/components/animations/FloatingSymbol';
import FloatingEmoji from '@/components/animations/FloatingEmoji';

const QuizAttemptContent: React.FC<{ quizId: string }> = ({ quizId }) => {
  const { quizzes, consumeTokens } = useApp();
  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerSubmit(-1);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    setTimeLeft(10);
    setIsAnswered(false);
    setIsCelebrating(false);
    setShowSymbols(false);
    setDragX(0);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestionIndex > 0) {
      consumeTokens(1);
    }
  }, [currentQuestionIndex, consumeTokens]);

  if (!quiz) return <div>Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSubmit = (selectedOptionIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;
    
    if (isCorrect) {
      setIsCelebrating(true);
      setShowSymbols(true);
      setTimeout(() => {
        setIsCelebrating(false);
        setShowSymbols(false);
      }, 1500);
    } else {
      setShowSymbols(true);
      setTimeout(() => {
        setShowSymbols(false);
      }, 1500);
    }

    setSelectedAnswers([...selectedAnswers, selectedOptionIndex]);

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 2000);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnswered) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnswered) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragX;
    
    const card = document.querySelector('.quiz-card') as HTMLElement;
    if (card) {
      card.style.transform = `translateX(${delta}px) rotate(${delta * 0.1}deg)`;
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnswered) return;
    setIsDragging(false);
    
    const clientX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = clientX - dragX;
    
    const card = document.querySelector('.quiz-card') as HTMLElement;
    if (card) {
      card.style.transform = '';
      
      if (Math.abs(delta) > 100) {
        const selectedIndex = delta > 0 ? currentQuestion.correctOptionIndex : 
          (currentQuestion.correctOptionIndex === 0 ? 1 : 0);
        handleAnswerSubmit(selectedIndex);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="flex items-center gap-4">
          <TokenDisplay showAddButton={false} />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-5 w-5" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="relative h-[400px]">
        <Card 
          className={cn(
            "quiz-card absolute inset-0 transition-all duration-300 cursor-grab active:cursor-grabbing",
            isCelebrating && "bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100",
            isDragging && "transition-none"
          )}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => (
                <div
                  key={optIdx}
                  onClick={() => !isAnswered && handleAnswerSubmit(optIdx)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    !isAnswered && "hover:bg-accent hover:border-accent",
                    isAnswered && optIdx === currentQuestion.correctOptionIndex && "bg-green-100 border-green-500",
                    isAnswered && optIdx !== currentQuestion.correctOptionIndex && 
                    selectedAnswers[currentQuestionIndex] === optIdx && "bg-red-100 border-red-500"
                  )}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
          </CardContent>
          
          <FloatingSymbol 
            isCorrect={isAnswered && selectedAnswers[currentQuestionIndex] === currentQuestion.correctOptionIndex}
            show={showSymbols}
          />
          <FloatingEmoji 
            show={isAnswered && selectedAnswers[currentQuestionIndex] === currentQuestion.correctOptionIndex}
          />
        </Card>
      </div>
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
      
      <QuizAttemptContent quizId={id!} />
    </MainLayout>
  );
};

export default QuizAttempt;
