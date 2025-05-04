
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Search, User, Coins, PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const StudentManagement: React.FC = () => {
  const { mockUsers, addTokens } = useApp();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [tokenAmount, setTokenAmount] = useState(10);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  const students = mockUsers.filter(user => 
    user.role === 'student' && 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddTokens = (studentId: string) => {
    // In a real app, you'd pass both the student ID and the admin as the one adding tokens
    addTokens(tokenAmount);
    toast({
      title: "Tokens Added",
      description: `${tokenAmount} tokens have been added to student ${studentId}.`,
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Student Management"
        description={!isMobile ? "Manage student accounts and tokens" : ""}
      >
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <DialogTrigger>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Student
          </DialogTrigger>
        </Button>
      </PageHeader>
      
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Search by name, email, or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Students Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <User className="h-5 w-5 mr-2 text-indigo-600" />
              Students ({students.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      {!isMobile && <TableHead>Email</TableHead>}
                      <TableHead>Tokens</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        {!isMobile && <TableCell>{student.email}</TableCell>}
                        <TableCell>{student.tokens}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center"
                                onClick={() => setSelectedStudentId(student.id)}
                              >
                                <Coins className="h-4 w-4 mr-1" /> Add Tokens
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Tokens for {student.name}</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-2 text-sm">Current tokens: {student.tokens}</p>
                                <div className="flex items-center gap-2">
                                  <Input 
                                    type="number" 
                                    value={tokenAmount} 
                                    onChange={(e) => setTokenAmount(parseInt(e.target.value) || 0)}
                                    min="1"
                                  />
                                  <span>tokens</span>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button 
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                    onClick={() => handleAddTokens(student.id)}
                                  >
                                    Add Tokens
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No students found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Add Student Dialog */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Enter student name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="Enter student email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="initial-tokens" className="text-sm font-medium">Initial Tokens</label>
              <Input id="initial-tokens" type="number" defaultValue="10" min="0" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Add Student</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default StudentManagement;
