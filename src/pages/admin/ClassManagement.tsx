
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

// In a real app, this would be defined in types/index.ts
interface Class {
  id: string;
  name: string;
  subjects: number;
}

const ClassManagement: React.FC = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>([
    { id: 'class-1', name: 'Class 1', subjects: 4 },
    { id: 'class-2', name: 'Class 2', subjects: 5 },
    { id: 'class-3', name: 'Class 3', subjects: 6 },
    { id: 'class-4', name: 'Class 4', subjects: 5 },
    { id: 'class-5', name: 'Class 5', subjects: 7 },
  ]);
  
  const [newClassName, setNewClassName] = useState('');
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  
  const handleAddClass = () => {
    if (!newClassName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class name",
        variant: "destructive",
      });
      return;
    }
    
    const newClass = {
      id: `class-${Date.now()}`,
      name: newClassName,
      subjects: 0,
    };
    
    setClasses([...classes, newClass]);
    setNewClassName('');
    toast({
      title: "Success",
      description: `${newClassName} has been added`,
    });
  };
  
  const handleEditClass = (classItem: Class) => {
    setEditingClass(classItem);
    setNewClassName(classItem.name);
  };
  
  const handleSaveEdit = () => {
    if (!editingClass || !newClassName.trim()) return;
    
    setClasses(classes.map(c => 
      c.id === editingClass.id ? { ...c, name: newClassName } : c
    ));
    
    setEditingClass(null);
    setNewClassName('');
    toast({
      title: "Success",
      description: "Class updated successfully",
    });
  };
  
  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast({
      title: "Success",
      description: "Class deleted successfully",
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Manage Classes"
        description="Add, edit, or remove classes"
      />
      
      <div className="space-y-6">
        {/* Add/Edit Class Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Class name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={editingClass ? handleSaveEdit : handleAddClass}>
                {editingClass ? 'Update' : 'Add Class'}
              </Button>
              {editingClass && (
                <Button variant="outline" onClick={() => {
                  setEditingClass(null);
                  setNewClassName('');
                }}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Class List */}
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>{classItem.subjects}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClass(classItem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClass(classItem.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {classes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No classes found. Add one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClassManagement;
