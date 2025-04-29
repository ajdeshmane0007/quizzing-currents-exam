
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Book, User, FileText, Calendar } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, currentUser } = useApp();
  const navigate = useNavigate();
  
  // If authenticated, redirect to appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      if (currentUser?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg min-h-screen flex flex-col">
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Book className="h-7 w-7 text-quiz-purple" />
              <span className="ml-2 text-lg font-bold text-quiz-purple">
                QuizMaster
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-quiz-purple-light to-white py-10 px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">
                Master Your Knowledge with <span className="text-quiz-purple">QuizMaster</span>
              </h1>
              <p className="text-sm mb-6 text-gray-700">
                An interactive platform for students to test their knowledge, stay updated with current affairs, and prepare for exams.
              </p>
              <div className="flex justify-center gap-3">
                <Button size="sm" className="bg-quiz-purple hover:bg-quiz-purple-dark" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-8 px-4">
            <h2 className="text-xl font-bold text-center mb-6">Features</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="bg-quiz-purple-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                  <Book className="h-6 w-6 text-quiz-purple" />
                </div>
                <h3 className="text-md font-semibold mb-2 text-center">Interactive Quizzes</h3>
                <p className="text-sm text-gray-600 text-center">
                  Test your knowledge with our diverse collection of interactive quizzes across various subjects.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="bg-quiz-purple-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                  <FileText className="h-6 w-6 text-quiz-purple" />
                </div>
                <h3 className="text-md font-semibold mb-2 text-center">Current Affairs</h3>
                <p className="text-sm text-gray-600 text-center">
                  Stay updated with the latest news and developments from around the world.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="bg-quiz-purple-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
                  <Calendar className="h-6 w-6 text-quiz-purple" />
                </div>
                <h3 className="text-md font-semibold mb-2 text-center">Scheduled Exams</h3>
                <p className="text-sm text-gray-600 text-center">
                  Prepare for and take timed examinations to assess your knowledge and progress.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-8 px-4 bg-quiz-purple text-white">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-3">Ready to Start Learning?</h2>
              <p className="mb-4 text-sm">
                Join QuizMaster today and take your learning experience to the next level.
              </p>
              <Button size="sm" variant="secondary" onClick={() => navigate('/register')}>
                Sign Up Now
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-white py-4 border-t text-sm">
          <p className="text-center text-gray-600 px-4">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
