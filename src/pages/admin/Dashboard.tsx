
import React, { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, BarChart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results, mockUsers } = useApp();

  // Calculate stats for dashboard
  const stats = useMemo(() => {
    // Count students
    const studentCount = mockUsers.filter(user => user.role === 'student').length;
    
    // Count upcoming exams (current date is before end date)
    const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).length;
    
    return {
      quizzes: quizzes.length,
      students: studentCount,
      currentAffairs: currentAffairs.length,
      upcomingExams,
    };
  }, [quizzes, exams, currentAffairs, mockUsers]);

  // Get recent activity (quiz results)
  const recentResults = [...results].sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  ).slice(0, 5);

  return (
    <MainLayout>
      <PageHeader
        title={`Admin Dashboard`}
        description="Manage your quizzes, exams, and monitor student performance."
      >
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/quizzes/new">Create Quiz</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/exams/new">Schedule Exam</Link>
          </Button>
        </div>
      </PageHeader>
      
      <div className="space-y-8">
        {/* Stats */}
        <DashboardStats stats={stats} userType="admin" />
        
        {/* Recent Results */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-quiz-purple" />
                Recent Quiz Submissions
              </CardTitle>
              <CardDescription>Latest quiz results from students</CardDescription>
            </CardHeader>
            <CardContent>
              {recentResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No recent submissions</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults.map((result) => {
                      const quiz = quizzes.find(q => q.id === result.quizId);
                      const student = mockUsers.find(u => u.id === result.userId);
                      
                      return (
                        <TableRow key={`${result.userId}-${result.quizId}`}>
                          <TableCell>{student?.name || 'Unknown'}</TableCell>
                          <TableCell>{quiz?.title || 'Unknown'}</TableCell>
                          <TableCell>
                            {result.score}/{result.totalQuestions} ({Math.round((result.score / result.totalQuestions) * 100)}%)
                          </TableCell>
                          <TableCell>{result.completedAt.toLocaleDateString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <div className="grid gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-quiz-purple" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Link to="/admin/current-affairs/new">
                  <Button variant="outline" className="w-full">Add Current Affairs</Button>
                </Link>
                <Link to="/admin/quizzes/new">
                  <Button variant="outline" className="w-full">Create Quiz</Button>
                </Link>
                <Link to="/admin/students">
                  <Button variant="outline" className="w-full">Manage Students</Button>
                </Link>
                <Link to="/admin/exams/new">
                  <Button variant="outline" className="w-full">Schedule Exam</Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-quiz-purple" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                {exams.length === 0 ? (
                  <p className="text-muted-foreground text-center py-6">No upcoming exams</p>
                ) : (
                  <div className="space-y-4">
                    {exams.slice(0, 3).map((exam) => (
                      <div key={exam.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(exam.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Link to={`/admin/exams/${exam.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
