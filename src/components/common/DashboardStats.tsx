
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
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
  };
  userType: 'admin' | 'student';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, userType }) => {
  if (userType === 'admin') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Quizzes"
          value={stats.quizzes || 0}
          icon={<BarChart className="h-4 w-4 text-quiz-purple" />}
        />
        <StatCard
          title="Total Students"
          value={stats.students || 0}
          icon={<PieChart className="h-4 w-4 text-quiz-purple" />}
        />
        <StatCard
          title="Current Affairs"
          value={stats.currentAffairs || 0}
          icon={<BarChart className="h-4 w-4 text-quiz-purple" />}
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams || 0}
          icon={<PieChart className="h-4 w-4 text-quiz-purple" />}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Available Quizzes"
        value={stats.quizzes || 0}
        icon={<BarChart className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Completed Quizzes"
        value={stats.completedQuizzes || 0}
        icon={<PieChart className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Average Score"
        value={`${stats.averageScore || 0}%`}
        icon={<BarChart className="h-4 w-4 text-quiz-purple" />}
      />
      <StatCard
        title="Upcoming Exams"
        value={stats.upcomingExams || 0}
        icon={<PieChart className="h-4 w-4 text-quiz-purple" />}
      />
    </div>
  );
};

export default DashboardStats;
