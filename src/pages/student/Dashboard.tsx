
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import QuizCard from '@/components/common/QuizCard';
import ExamCard from '@/components/common/ExamCard';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight, BookOpen, Target, Award, Rocket } from 'lucide-react';
import Onboarding from '@/components/student/Onboarding';

const Dashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results } = useApp();
  const isMobile = useIsMobile();

  // Check if this is the user's first visit (in a real app, this would be stored in user preferences)
  const isFirstVisit = useMemo(() => {
    // Mock implementation - in a real app, this would check if the user has completed onboarding
    return localStorage.getItem('onboardingCompleted') !== 'true';
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

  // Get most recent quizzes, exams, and current affairs
  const recentQuizzes = [...quizzes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 8);
  const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).slice(0, 3);
  const recentCurrentAffairs = [...currentAffairs].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, 3);

  if (isFirstVisit) {
    return <Onboarding />;
  }

  return (
    <MainLayout>
      <PageHeader
        title={`Welcome, ${currentUser?.name}`}
        description={!isMobile ? "Track your progress and stay updated with quizzes and exams." : ""}
      />
      
      <div className="space-y-8">
        {/* Stats */}
        <DashboardStats stats={stats} userType="student" />
        
        {/* Learning Paths Section */}
        <div className="bg-gradient-to-r from-quiz-purple-light to-quiz-purple/20 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-xl mb-2 text-quiz-purple-dark flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Learning Paths
          </h3>
          <p className="mb-4 text-sm">Structured learning paths by class and subject for better preparation</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link 
              to="/classes"
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BookOpen className="h-8 w-8 text-quiz-purple mb-2" />
              <span className="text-sm font-medium">By Class</span>
            </Link>
            <Link 
              to="/quizzes"
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Award className="h-8 w-8 text-quiz-purple mb-2" />
              <span className="text-sm font-medium">All Quizzes</span>
            </Link>
            <Link 
              to="/exams" 
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Rocket className="h-8 w-8 text-quiz-purple mb-2" />
              <span className="text-sm font-medium">Prep Exams</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Quizzes */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-quiz-purple" />
              Latest Quizzes
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/quizzes" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentQuizzes.map((quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                linkTo={`/quizzes/${quiz.id}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Award className="h-5 w-5 mr-2 text-quiz-purple" />
              Upcoming Exams
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/exams" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
            {upcomingExams.length === 0 && (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No upcoming exams scheduled
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Current Affairs */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-quiz-purple" />
              Latest Current Affairs
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/current-affairs" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recentCurrentAffairs.map((article, index) => (
              <CurrentAffairCard 
                key={article.id} 
                article={article} 
                onNext={index < recentCurrentAffairs.length - 1 ? () => {} : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
