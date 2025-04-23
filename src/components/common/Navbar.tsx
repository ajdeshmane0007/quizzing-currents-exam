
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Book, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useApp();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Book className="h-8 w-8 text-quiz-purple" />
            <span className="ml-2 text-xl font-bold text-quiz-purple">
              QuizMaster
            </span>
          </Link>
          
          {isAuthenticated && (
            <div className="ml-10 hidden space-x-8 md:flex">
              {currentUser?.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-quiz-purple">
                    Dashboard
                  </Link>
                  <Link to="/admin/quizzes" className="text-gray-700 hover:text-quiz-purple">
                    Quizzes
                  </Link>
                  <Link to="/admin/current-affairs" className="text-gray-700 hover:text-quiz-purple">
                    Current Affairs
                  </Link>
                  <Link to="/admin/exams" className="text-gray-700 hover:text-quiz-purple">
                    Exams
                  </Link>
                  <Link to="/admin/students" className="text-gray-700 hover:text-quiz-purple">
                    Students
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-quiz-purple">
                    Dashboard
                  </Link>
                  <Link to="/quizzes" className="text-gray-700 hover:text-quiz-purple">
                    Quizzes
                  </Link>
                  <Link to="/current-affairs" className="text-gray-700 hover:text-quiz-purple">
                    Current Affairs
                  </Link>
                  <Link to="/exams" className="text-gray-700 hover:text-quiz-purple">
                    Exams
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.avatarUrl} />
                    <AvatarFallback className="bg-quiz-purple text-white">
                      {currentUser?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={currentUser?.role === 'admin' ? '/admin/profile' : '/profile'} className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
