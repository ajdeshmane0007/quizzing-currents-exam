
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight } from 'lucide-react';

// Dummy class data - in a real app, this would come from API/context
const classes = [
  { id: 'class-1', name: 'Class 1', subjects: 4 },
  { id: 'class-2', name: 'Class 2', subjects: 5 },
  { id: 'class-3', name: 'Class 3', subjects: 6 },
  { id: 'class-4', name: 'Class 4', subjects: 5 },
  { id: 'class-5', name: 'Class 5', subjects: 7 },
  { id: 'class-6', name: 'Class 6', subjects: 8 },
  { id: 'class-7', name: 'Class 7', subjects: 9 },
  { id: 'class-8', name: 'Class 8', subjects: 10 },
];

const ClassList: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      <PageHeader
        title="Select a Class"
        description="Choose your class to view available subjects"
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden h-full">
            <CardHeader className="bg-slate-50 py-3">
              <CardTitle className="text-base">{classItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-0 text-xs">
              <div className="mt-2 text-xs text-muted-foreground">
                <strong>Subjects:</strong> {classItem.subjects}
              </div>
            </CardContent>
            <CardFooter className="bg-white pt-2 pb-3">
              <Button asChild className="w-full text-sm py-1 h-8" size="sm">
                <Link to={`/subjects/${classItem.id}`} className="flex justify-between items-center w-full">
                  <span>View Subjects</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default ClassList;
