
import React, { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import QuizCard from '@/components/common/QuizCard';
import ExamCard from '@/components/common/ExamCard';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const recentQuizzes = [...quizzes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 3);
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
        
        {/* Recent Quizzes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Latest Quizzes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
          <h2 className="text-lg font-semibold mb-3">Upcoming Exams</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
        
        {/* Recent Current Affairs */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Latest Current Affairs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {recentCurrentAffairs.map((article) => (
              <CurrentAffairCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
