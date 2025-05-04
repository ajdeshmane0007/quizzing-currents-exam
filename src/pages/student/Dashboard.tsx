
import React, { useMemo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import QuizCard from '@/components/common/QuizCard';
import ExamCard from '@/components/common/ExamCard';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import Onboarding from '@/components/student/Onboarding';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Target, Award, Smile } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const recentCurrentAffairs = [...currentAffairs].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, 2);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <MainLayout>
      <PageHeader
        title={`Welcome, ${currentUser?.name}`}
        description={!isMobile ? "Track your progress" : ""}
      />
      
      <div className="space-y-5 pb-16 md:pb-0">
        {/* Stats */}
        <DashboardStats stats={stats} userType="student" />
        
        {/* Badges Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-lg mb-2 text-indigo-800 flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Your Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.bronze > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-amber-600 text-white px-3 py-1">
                  <Award className="h-4 w-4 mr-1" /> {badges.bronze} Bronze
                </Badge>
              </div>
            )}
            {badges.silver > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-gray-400 text-white px-3 py-1">
                  <Award className="h-4 w-4 mr-1" /> {badges.silver} Silver
                </Badge>
              </div>
            )}
            {badges.gold > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-yellow-500 text-white px-3 py-1">
                  <Award className="h-4 w-4 mr-1" /> {badges.gold} Gold
                </Badge>
              </div>
            )}
            {badges.bronze === 0 && badges.silver === 0 && badges.gold === 0 && (
              <p className="text-sm text-indigo-700">Complete quizzes to earn badges!</p>
            )}
          </div>
        </div>
        
        {/* Learning Paths Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-lg mb-2 text-indigo-800 flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Learning Paths
          </h3>
          <p className="mb-3 text-sm text-indigo-700">Structured learning paths for better preparation</p>
          <div className="grid grid-cols-2 gap-2">
            <Link 
              to="/classes"
              className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BookOpen className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">By Class</span>
            </Link>
            <Link 
              to="/quizzes"
              className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Award className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">All Quizzes</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Quizzes */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Latest Quizzes
            </h2>
            <Button asChild variant="ghost" size="sm" className="text-indigo-600">
              <Link to="/quizzes" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentQuizzes.map((quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                linkTo={`/quizzes/${quiz.id}`} 
              />
            ))}
            {recentQuizzes.length === 0 && (
              <div className="col-span-2 text-center py-4 text-gray-500">
                No quizzes available
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-600" />
              Upcoming Exams
            </h2>
            <Button asChild variant="ghost" size="sm" className="text-indigo-600">
              <Link to="/exams" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {upcomingExams.slice(0, 1).map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
            {upcomingExams.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No upcoming exams scheduled
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Current Affairs */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Latest News
            </h2>
            <Button asChild variant="ghost" size="sm" className="text-indigo-600">
              <Link to="/current-affairs" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {recentCurrentAffairs.slice(0, 1).map((article, index) => (
              <CurrentAffairCard 
                key={article.id} 
                article={article} 
                onNext={index < recentCurrentAffairs.length - 1 ? () => {} : undefined}
              />
            ))}
            {recentCurrentAffairs.length === 0 && (
              <div className="text-center py-4 text-gray-500">
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
