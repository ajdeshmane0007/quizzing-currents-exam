import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartBar, 
  ChartPie, 
  Award,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Medal,
  Activity
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
        <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
        <div className={`p-1 rounded-full ${trend && trend > 0 ? 'bg-green-100' : trend && trend < 0 ? 'bg-red-100' : 'bg-blue-100'}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className={`flex items-center gap-1 mt-1 text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 transform rotate-180" />}
            <span>{Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: {
    quizzes?: number;
    completedQuizzes?: number;
    averageScore?: number;
    upcomingExams?: number;
    students?: number;
    currentAffairs?: number;
    premiumContent?: number;
    freeContent?: number;
    activeUsers?: number;
    completionRate?: number;
  };
  userType: 'admin' | 'student';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, userType }) => {
  const isMobile = useIsMobile();
  
  if (userType === 'admin') {
    return (
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Quizzes"
          value={stats.quizzes || 0}
          icon={<ChartBar className="h-4 w-4 text-quiz-purple" />}
          description="All available quizzes"
          trend={5}
        />
        <StatCard
          title="Total Students"
          value={stats.students || 0}
          icon={<Users className="h-4 w-4 text-quiz-purple" />}
          description="Registered users"
          trend={12}
        />
        <StatCard
          title="Current Affairs"
          value={stats.currentAffairs || 0}
          icon={<BookOpen className="h-4 w-4 text-quiz-purple" />}
          description="Latest news articles"
          trend={8}
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams || 0}
          icon={<Calendar className="h-4 w-4 text-quiz-purple" />}
          description="Scheduled exams"
          trend={-3}
        />
        <StatCard
          title="Premium Content"
          value={stats.premiumContent || 0}
          icon={<Award className="h-4 w-4 text-quiz-purple" />}
          description="Locked materials"
        />
        <StatCard
          title="Free Content"
          value={stats.freeContent || 0}
          icon={<BookOpen className="h-4 w-4 text-quiz-purple" />}
          description="Open access materials"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers || 0}
          icon={<Activity className="h-4 w-4 text-quiz-purple" />}
          description="Last 7 days"
          trend={15}
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate || 0}%`}
          icon={<Medal className="h-4 w-4 text-quiz-purple" />}
          description="Quiz completions"
          trend={7}
        />
      </div>
    );
  }
  
  // Keep student dashboard stats the same
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      <StatCard
        title="Available Quizzes"
        value={stats.quizzes || 0}
        icon={<ChartBar className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Completed Quizzes"
        value={stats.completedQuizzes || 0}
        icon={<ChartPie className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Average Score"
        value={`${stats.averageScore || 0}%`}
        icon={<ChartBar className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Upcoming Exams"
        value={stats.upcomingExams || 0}
        icon={<ChartPie className="h-4 w-4 text-quiz-purple" />}
      />
    </div>
  );
};

export default DashboardStats;
