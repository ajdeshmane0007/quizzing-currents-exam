
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
import { ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results } = useApp();
  const isMobile = useIsMobile();

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

  return (
    <MainLayout>
      <PageHeader
        title={`Welcome, ${currentUser?.name}`}
        description={!isMobile ? "Track your progress and stay updated with quizzes and exams." : ""}
      />
      
      <div className="space-y-6">
        {/* Stats */}
        <DashboardStats stats={stats} userType="student" />
        
        {/* New Class Selection CTA */}
        <div className="bg-gradient-to-r from-quiz-purple/80 to-quiz-purple rounded-lg p-4 text-white mb-6">
          <h3 className="font-bold text-lg mb-2">Browse by Class & Subject</h3>
          <p className="mb-3 text-sm">Find quizzes organized by class and subject for better learning</p>
          <Button asChild variant="secondary" size="sm">
            <Link to="/classes" className="flex items-center">
              Browse Classes <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        {/* Recent Quizzes */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Latest Quizzes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/quizzes" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Upcoming Exams</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/exams" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {upcomingExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
        
        {/* Recent Current Affairs */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Latest Current Affairs</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/current-affairs" className="flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
