
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import ExamCard from '@/components/common/ExamCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Exams: React.FC = () => {
  const { exams } = useApp();
  const [search, setSearch] = useState('');
  
  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(search.toLowerCase()) || 
    exam.description.toLowerCase().includes(search.toLowerCase())
  );
  
  // Get upcoming, active and past exams
  const now = new Date();
  
  const activeExams = filteredExams.filter(exam => 
    now >= exam.startDate && now <= exam.endDate
  );
  
  const upcomingExams = filteredExams.filter(exam => 
    now < exam.startDate
  );
  
  const pastExams = filteredExams.filter(exam => 
    now > exam.endDate
  );

  return (
    <MainLayout>
      <PageHeader
        title="Exams"
        description="View and take your scheduled exams."
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search exams"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Exams ({filteredExams.length})</TabsTrigger>
          <TabsTrigger value="active" className="text-quiz-purple">
            Active ({activeExams.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingExams.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastExams.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-6">
          {filteredExams.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No exams found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="pt-6">
          {activeExams.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No active exams at the moment.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="pt-6">
          {upcomingExams.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No upcoming exams found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="pt-6">
          {pastExams.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No past exams found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} isUpcoming={false} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Exams;
