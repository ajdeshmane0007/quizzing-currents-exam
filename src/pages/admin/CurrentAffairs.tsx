
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminCurrentAffairs: React.FC = () => {
  const { currentAffairs, deleteCurrentAffair } = useApp();
  const isMobile = useIsMobile();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCurrentAffair(id);
      toast({
        title: "Current affair deleted",
        description: "The current affair was successfully deleted.",
      });
    }
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Manage Current Affairs"
        description={!isMobile ? "Create and manage current affairs for students" : ""}
      >
        <Button asChild size={isMobile ? "sm" : "default"}>
          <Link to="/admin/current-affairs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Current Affairs List</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-5">
          {currentAffairs.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No current affairs have been added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    {!isMobile && <TableHead>Category</TableHead>}
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAffairs.map((affair) => (
                    <TableRow key={affair.id}>
                      <TableCell className="font-medium">{affair.title}</TableCell>
                      {!isMobile && <TableCell>{affair.category}</TableCell>}
                      <TableCell>{new Date(affair.publishedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/admin/current-affairs/${affair.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDelete(affair.id, affair.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AdminCurrentAffairs;
