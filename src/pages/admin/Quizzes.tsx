
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, FileUp, Pencil, Trash } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Quiz } from '@/types';
import { toast } from '@/hooks/use-toast';

const AdminQuizzes: React.FC = () => {
  const { quizzes, deleteQuiz } = useApp();
  const isMobile = useIsMobile();
  
  const handleDelete = (quiz: Quiz) => {
    if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      deleteQuiz(quiz.id);
      toast({
        title: "Quiz Deleted",
        description: `"${quiz.title}" has been deleted successfully.`
      });
    }
  };
  
  return (
    <MainLayout>
      <PageHeader
        title="Quiz Management"
        description="Create, edit, and manage quizzes"
      >
        <div className="flex gap-2">
          <Button asChild size={isMobile ? "sm" : "default"} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Link to="/admin/quizzes/new">
              <PlusCircle className="mr-1 h-4 w-4" />
              Create Quiz
            </Link>
          </Button>
          <Button asChild size={isMobile ? "sm" : "default"} variant="outline">
            <Link to="/admin/quizzes/import">
              <FileUp className="mr-1 h-4 w-4" />
              Import CSV
            </Link>
          </Button>
        </div>
      </PageHeader>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            {quizzes.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No quizzes have been created yet. Click "Create Quiz" to add one.
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead className="text-center">Premium</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>{quiz.category}</TableCell>
                      <TableCell>{quiz.questions.length}</TableCell>
                      <TableCell className="text-center">
                        {quiz.isPremium ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/admin/quizzes/edit/${quiz.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(quiz)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminQuizzes;
