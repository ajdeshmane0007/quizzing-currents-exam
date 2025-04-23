
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
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b p-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-quiz-purple" />
            <span className="ml-2 text-xl font-bold text-quiz-purple">
              QuizMaster
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-quiz-purple-light to-white py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Your Knowledge with <span className="text-quiz-purple">QuizMaster</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
              An interactive platform for students to test their knowledge, stay updated with current affairs, and prepare for exams.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-quiz-purple hover:bg-quiz-purple-dark" onClick={() => navigate('/register')}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-quiz-purple-light p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-quiz-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
                <p className="text-gray-600">
                  Test your knowledge with our diverse collection of interactive quizzes across various subjects.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-quiz-purple-light p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-quiz-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Current Affairs</h3>
                <p className="text-gray-600">
                  Stay updated with the latest news and developments from around the world.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto bg-quiz-purple-light p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-quiz-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scheduled Exams</h3>
                <p className="text-gray-600">
                  Prepare for and take timed examinations to assess your knowledge and progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-quiz-purple text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join QuizMaster today and take your learning experience to the next level.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
