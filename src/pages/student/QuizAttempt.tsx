
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import TokenDisplay from '@/components/common/TokenDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import FloatingSymbol from '@/components/animations/FloatingSymbol';
import FloatingEmoji from '@/components/animations/FloatingEmoji';
import ScoreBoard from '@/components/quiz/ScoreBoard';
import AdDisplay from '@/components/quiz/AdDisplay';
import { toast } from '@/hooks/use-toast';

interface Question {
  text: string;
  options: string[];
  correctOptionIndex: number;
  image?: string; // Make image optional
}

const QuizAttemptContent: React.FC<{ quizId: string }> = ({ quizId }) => {
  const { quizzes, consumeTokens, TokenService, currentUser } = useApp();
  const quiz = quizzes.find(q => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15); // Increased time for better user experience
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isAnswered && !showAd) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, showAd]);

  useEffect(() => {
    if (!isAnswered && !showAd) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAnswered, showAd]);

  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex % 5 === 0) {
      setShowAd(true);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestionIndex > 0) {
      consumeTokens(1);
    }
  }, [currentQuestionIndex, consumeTokens]);

  if (!quiz) return <div>Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (selectedOptionIndex: number) => {
    if (isAnswered) return;
    
    if (!TokenService.consumeToken(currentUser)) {
      toast({
        title: "Out of tokens",
        description: "Please purchase more tokens or end the quiz",
        variant: "destructive"
      });
      return;
    }

    consumeTokens(1);
    setIsAnswered(true);
    const isCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;
    
    if (isCorrect) {
      setIsCelebrating(true);
      setShowSymbols(true);
      setTimeout(() => {
        setIsCelebrating(false);
        setShowSymbols(false);
      }, 2000);
    } else {
      setShowSymbols(true);
      setTimeout(() => {
        setShowSymbols(false);
      }, 2000);
    }

    setSelectedAnswers([...selectedAnswers, selectedOptionIndex]);

    if (currentQuestionIndex === quiz.questions.length - 1) {
      setTimeout(() => {
        setShowScoreboard(true);
      }, 2500);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 2500);
    }
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
        handleAnswer(selectedIndex);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      {showScoreboard ? (
        <>
          <ScoreBoard
            score={selectedAnswers.filter((answer, index) => 
              answer === quiz.questions[index].correctOptionIndex
            ).length}
            totalQuestions={quiz.questions.length}
            timeSpent={timeSpent}
          />
          <FloatingEmoji show={true} />
        </>
      ) : showAd ? (
        <AdDisplay onClose={() => setShowAd(false)} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <h1 className="text-3xl font-bold text-quiz-purple">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              <TokenDisplay showAddButton={false} />
              <div className="flex items-center gap-2 bg-quiz-purple-light text-quiz-purple px-3 py-1 rounded-full">
                <Timer className="h-5 w-5" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[600px] w-full">
            <Card 
              className={cn(
                "quiz-card absolute inset-0 transition-all duration-300 cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl",
                isCelebrating && "bg-gradient-to-r from-quiz-purple-light via-white to-quiz-purple-light",
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
              <CardHeader className="bg-gradient-to-br from-quiz-purple/5 to-quiz-purple/10 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-quiz-purple">Question {currentQuestionIndex + 1}</CardTitle>
                  <span className="text-sm text-quiz-purple bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    {currentQuestionIndex + 1} of {quiz.questions.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {currentQuestion.image && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={currentQuestion.image} 
                      alt="Question illustration" 
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                
                <p className="text-xl mb-8 font-medium leading-relaxed">{currentQuestion.text}</p>
                
                <div className="space-y-4 max-w-2xl mx-auto">
                  {currentQuestion.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      onClick={() => !isAnswered && handleAnswer(optIdx)}
                      className={cn(
                        "quiz-option group hover:shadow-lg",
                        !isAnswered && "hover:bg-quiz-purple-light hover:border-quiz-purple transform transition-all duration-200 hover:scale-102",
                        isAnswered && optIdx === currentQuestion.correctOptionIndex && "quiz-option-correct",
                        isAnswered && optIdx !== currentQuestion.correctOptionIndex && 
                        selectedAnswers[currentQuestionIndex] === optIdx && "quiz-option-incorrect"
                      )}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors duration-200",
                        isAnswered && optIdx === currentQuestion.correctOptionIndex ? "bg-quiz-green text-white" : 
                        isAnswered && selectedAnswers[currentQuestionIndex] === optIdx && optIdx !== currentQuestion.correctOptionIndex ? "bg-quiz-red text-white" :
                        "bg-quiz-purple-light text-quiz-purple group-hover:bg-quiz-purple group-hover:text-white"
                      )}>
                        {isAnswered && optIdx === currentQuestion.correctOptionIndex ? (
                          <Check className="h-6 w-6" />
                        ) : isAnswered && selectedAnswers[currentQuestionIndex] === optIdx && optIdx !== currentQuestion.correctOptionIndex ? (
                          <X className="h-6 w-6" />
                        ) : String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Swipe right for yes, left for no or tap your answer
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
        </>
      )}
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
