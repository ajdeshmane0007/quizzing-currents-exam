
import React, { useMemo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import QuizCard from '@/components/common/QuizCard';
import ExamCard from '@/components/common/ExamCard';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import DailyCoinsCard from '@/components/common/DailyCoinsCard';
import Onboarding from '@/components/student/Onboarding';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Target, Award, Smile, Sparkles, Lightbulb, Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TokenDisplay from '@/components/common/TokenDisplay';

const Dashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results } = useApp();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isMobile = useIsMobile();
  
  // Check for first-time users
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);
  
  // Calculate stats for dashboard
  const stats = useMemo(() => {
    // Filter results for current user
    const userResults = results.filter(result => result.userId === currentUser?.id);
    
    // Calculate average score
    const totalScore = userResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0);
    const averageScore = userResults.length > 0 ? Math.round(totalScore / userResults.length) : 0;
    
    // Count upcoming exams (current date is before end date)
    const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).length;
    
    return {
      quizzes: quizzes.length,
      completedQuizzes: userResults.length,
      averageScore,
      upcomingExams,
    };
  }, [currentUser, quizzes, exams, results]);

  // Calculate earned badges
  const badges = useMemo(() => {
    if (!currentUser) return { bronze: 0, silver: 0, gold: 0 };
    
    const userResults = results.filter(result => result.userId === currentUser.id);
    
    // Count badges based on score percentages
    const badgeCounts = userResults.reduce((acc, result) => {
      const percentage = (result.score / result.totalQuestions) * 100;
      if (percentage >= 90) acc.gold += 1;
      else if (percentage >= 75) acc.silver += 1;
      else if (percentage >= 50) acc.bronze += 1;
      return acc;
    }, { bronze: 0, silver: 0, gold: 0 });
    
    return badgeCounts;
  }, [currentUser, results]);

  // Get most recent quizzes, exams, and current affairs
  const recentQuizzes = [...quizzes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, isMobile ? 2 : 4);
  const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).slice(0, 2);
  const recentCurrentAffairs = [...currentAffairs].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, isMobile ? 3 : 6);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <MainLayout>
      <div className="mb-4 sm:mb-6">
        <div className="bg-gradient-to-r from-quiz-purple/90 to-quiz-purple-dark rounded-lg p-3 sm:p-4 md:p-6 shadow-lg">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{`Welcome, ${currentUser?.name}`}</h1>
          <p className="text-white/80 text-xs sm:text-sm md:text-base">{!isMobile ? "Track your progress and explore your learning journey" : "Let's learn something new today!"}</p>
          
          {/* Display tokens prominently */}
          <div className="mt-2 md:mt-3">
            <TokenDisplay showAddButton={false} />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-16 md:pb-0">
        {/* Daily Coins and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="md:col-span-2 space-y-3 md:space-y-4">
            {/* Stats */}
            <DashboardStats stats={stats} userType="student" />
          </div>
          
          <div className="md:col-span-1">
            <DailyCoinsCard />
          </div>
        </div>
        
        {/* Badges Section */}
        <div className="bg-gradient-to-r from-indigo-600/90 to-violet-500 rounded-lg p-3 sm:p-4 md:p-5 shadow-md text-white">
          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 md:mb-3 flex items-center">
            <Sparkles className="mr-1.5 md:mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-300" />
            Your Achievements
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
            {badges.bronze > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-amber-600 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 shadow-sm text-xs md:text-sm">
                  <Award className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" /> {badges.bronze} Bronze
                </Badge>
              </div>
            )}
            {badges.silver > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-gray-300 text-gray-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 shadow-sm text-xs md:text-sm">
                  <Award className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" /> {badges.silver} Silver
                </Badge>
              </div>
            )}
            {badges.gold > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-yellow-500 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 shadow-sm text-xs md:text-sm">
                  <Award className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" /> {badges.gold} Gold
                </Badge>
              </div>
            )}
            {badges.bronze === 0 && badges.silver === 0 && badges.gold === 0 && (
              <p className="text-xs md:text-sm text-white/90">Complete quizzes to earn your first badge!</p>
            )}
          </div>
        </div>
        
        {/* Learning Paths Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-3 sm:p-4 md:p-5 shadow-md text-white">
          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 flex items-center">
            <Target className="mr-1.5 md:mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            Learning Paths
          </h3>
          <p className="mb-2 sm:mb-3 md:mb-4 text-xs md:text-sm text-white/90">Choose your path to academic excellence</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Link 
              to="/classes"
              className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/30 transition-all"
            >
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white mb-1 md:mb-2" />
              <span className="text-xs md:text-sm font-medium">By Class</span>
            </Link>
            <Link 
              to="/quizzes"
              className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/30 transition-all"
            >
              <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white mb-1 md:mb-2" />
              <span className="text-xs md:text-sm font-medium">All Quizzes</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Quizzes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 sm:p-3 md:p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white flex items-center">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Latest Quizzes
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white text-xs h-6 md:h-8 py-0 px-1.5 md:px-3">
                <Link to="/quizzes" className="flex items-center">
                  View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-2 sm:p-3 md:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              {recentQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  linkTo={`/quizzes/${quiz.id}`} 
                />
              ))}
              {recentQuizzes.length === 0 && (
                <div className="col-span-2 text-center py-3 sm:py-4 md:py-6 text-gray-500 text-xs sm:text-sm">
                  No quizzes available
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-100">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 sm:p-3 md:p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white flex items-center">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Upcoming Exams
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white text-xs h-6 md:h-8 py-0 px-1.5 md:px-3">
                <Link to="/exams" className="flex items-center">
                  View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-2 sm:p-3 md:p-4">
            <div className="grid gap-2 sm:gap-3 md:gap-4">
              {upcomingExams.slice(0, 1).map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
              {upcomingExams.length === 0 && (
                <div className="text-center py-3 sm:py-4 md:py-6 text-gray-500 text-xs sm:text-sm">
                  No upcoming exams scheduled
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Current Affairs with Images and Metadata */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 sm:p-3 md:p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white flex items-center">
                <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Latest News
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white text-xs h-6 md:h-8 py-0 px-1.5 md:px-3">
                <Link to="/current-affairs" className="flex items-center">
                  View All <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-2 sm:p-3 md:p-4">
            <Carousel
              opts={{ 
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {recentCurrentAffairs.map((article) => (
                  <CarouselItem key={article.id} className="basis-full sm:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                    <div className="p-1">
                      <CurrentAffairCard 
                        article={article} 
                        isPremium={article.isPremium}
                        isDashboard={true}
                        showMetadataOnly={true}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-2 md:mt-4 gap-2">
                <CarouselPrevious className="static translate-y-0 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                <CarouselNext className="static translate-y-0 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
            </Carousel>
            
            {recentCurrentAffairs.length === 0 && (
              <div className="text-center py-3 sm:py-4 md:py-6 text-gray-500 text-xs sm:text-sm">
                No current affairs available
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
