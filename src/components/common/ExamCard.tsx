
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Exam } from '@/types';
import { Calendar, Clock } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  isUpcoming?: boolean;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, isUpcoming = true }) => {
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Check if exam is active (current date is between start and end dates)
  const isActive = new Date() >= exam.startDate && new Date() <= exam.endDate;

  // Calculate status
  const getStatus = () => {
    if (!isUpcoming) return "Completed";
    if (isActive) return "Active";
    if (new Date() < exam.startDate) return "Upcoming";
    return "Ended";
  };

  const status = getStatus();
  
  // Get appropriate variant based on status
  const getBadgeVariant = () => {
    switch (status) {
      case "Active": return "default";
      case "Upcoming": return "secondary";
      case "Ended": return "outline";
      case "Completed": return "outline";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{exam.title}</CardTitle>
          <Badge variant={getBadgeVariant()}>{status}</Badge>
        </div>
        <CardDescription>{exam.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-quiz-purple" />
            <span>Start: {formatDate(exam.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-quiz-purple" />
            <span>End: {formatDate(exam.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-quiz-purple" />
            <span>Duration: {exam.duration} minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-2">
        <Button 
          asChild 
          className="w-full" 
          variant={isActive ? "default" : "outline"}
          disabled={!isUpcoming || (!isActive && new Date() < exam.startDate)}
        >
          <Link to={`/exams/${exam.id}`}>
            {isActive ? "Take Exam" : isUpcoming ? "View Details" : "View Results"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
