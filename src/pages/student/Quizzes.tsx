
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import QuizCard from '@/components/common/QuizCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Quizzes: React.FC = () => {
  const { quizzes, results, currentUser } = useApp();
  const [search, setSearch] = useState('');
  
  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(search.toLowerCase()) || 
    quiz.description.toLowerCase().includes(search.toLowerCase()) ||
    quiz.category.toLowerCase().includes(search.toLowerCase())
  );
  
  // Get completed quizzes
  const completedQuizIds = results
    .filter(result => result.userId === currentUser?.id)
    .map(result => result.quizId);
  
  const completedQuizzes = filteredQuizzes.filter(quiz => 
    completedQuizIds.includes(quiz.id)
  );
  
  const availableQuizzes = filteredQuizzes.filter(quiz => 
    !completedQuizIds.includes(quiz.id)
  );

  return (
    <MainLayout>
      <PageHeader
        title="All Quizzes"
        description="Practice and test your knowledge with our collection of quizzes."
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search quizzes by title, description or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Quizzes ({filteredQuizzes.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableQuizzes.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedQuizzes.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-6">
          {filteredQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No quizzes found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  linkTo={`/quizzes/${quiz.id}`}
                  isCompleted={completedQuizIds.includes(quiz.id)} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="available" className="pt-6">
          {availableQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No available quizzes found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  linkTo={`/quizzes/${quiz.id}`} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="pt-6">
          {completedQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No completed quizzes yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  linkTo={`/quiz-results/${quiz.id}`} 
                  isCompleted={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Quizzes;
