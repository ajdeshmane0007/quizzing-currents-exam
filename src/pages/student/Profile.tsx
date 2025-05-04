
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TokenDisplay from '@/components/common/TokenDisplay';
import { Award, User, Mail, BookOpen } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser, results } = useApp();
  
  // Calculate badges
  const userResults = results.filter(result => result.userId === currentUser?.id);
  const totalQuizzes = userResults.length;
  
  const badges = userResults.reduce((acc, result) => {
    const percentage = (result.score / result.totalQuestions) * 100;
    if (percentage >= 90) acc.gold += 1;
    else if (percentage >= 75) acc.silver += 1;
    else if (percentage >= 50) acc.bronze += 1;
    return acc;
  }, { bronze: 0, silver: 0, gold: 0 });

  // Calculate average score
  const totalScore = userResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0);
  const averageScore = totalScore > 0 ? Math.round(totalScore / totalQuizzes) : 0;
  
  if (!currentUser) return null;

  return (
    <MainLayout>
      <PageHeader title="My Profile" description="View and manage your account" />
      
      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Personal Information</span>
              <TokenDisplay />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 py-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentUser.avatarUrl} />
                <AvatarFallback className="bg-indigo-600 text-white text-xl">
                  {currentUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <User className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm text-gray-500">Name</p>
                  </div>
                  <p className="font-medium">{currentUser.name}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Mail className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm text-gray-500">Email</p>
                  </div>
                  <p className="font-medium">{currentUser.email}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <p className="text-sm text-gray-500">Student ID</p>
                  </div>
                  <p className="font-medium">{currentUser.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Performance Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Completed Quizzes</p>
                    <p className="text-xl font-bold text-indigo-600">{totalQuizzes}</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-xl font-bold text-indigo-600">{averageScore}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Badges */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Award className="h-5 w-5 mr-2 text-indigo-600" />
                Achievement Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <div className="bg-amber-100 p-3 rounded-lg text-center flex-1">
                  <div className="flex justify-center mb-1">
                    <Badge className="bg-amber-600">Bronze</Badge>
                  </div>
                  <p className="text-xl font-bold text-amber-600">{badges.bronze}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center flex-1">
                  <div className="flex justify-center mb-1">
                    <Badge className="bg-gray-400">Silver</Badge>
                  </div>
                  <p className="text-xl font-bold text-gray-600">{badges.silver}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg text-center flex-1">
                  <div className="flex justify-center mb-1">
                    <Badge className="bg-yellow-500">Gold</Badge>
                  </div>
                  <p className="text-xl font-bold text-yellow-600">{badges.gold}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
