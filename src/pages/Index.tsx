
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Book, User, FileText, Calendar, Brain, Award, CheckCircle, Sparkles, Star, ChevronDown, Lightbulb, ArrowRight, Clock, Shield, Trophy, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Feature cards data for the slider
  const features = [
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with our diverse collection of interactive quizzes across various subjects.",
      icon: Book,
      color: "purple"
    },
    {
      title: "Current Affairs",
      description: "Stay updated with the latest news and developments with our TikTok-style swipeable news feed.",
      icon: FileText,
      color: "pink"
    },
    {
      title: "Scheduled Exams",
      description: "Prepare for and take timed examinations to assess your knowledge and progress.",
      icon: Calendar,
      color: "blue"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and visualizations.",
      icon: BarChart3,
      color: "green"
    },
    {
      title: "Earn Rewards",
      description: "Collect badges, points and achievements as you progress through your learning journey.",
      icon: Trophy,
      color: "amber"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">
                QuizMaster
              </span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="gradient" 
                size="sm" 
                onClick={() => navigate('/login')} 
                className="text-white"
              >
                Login
              </Button>
              <Button className="bg-yellow-500 text-purple-900 hover:bg-yellow-400" size="sm" onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gradient-to-b from-purple-600 to-indigo-700 py-12 px-4 text-white"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Brain className="h-16 w-16 text-white" />
                  <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-4">
                Master Your Knowledge with <span className="text-yellow-300">QuizMaster</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-md mb-8 text-purple-100">
                An interactive platform for students to test their knowledge, stay updated with current affairs, and prepare for exams.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center gap-3">
                <Button size="lg" className="bg-yellow-500 text-purple-900 hover:bg-yellow-400" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
                <Button size="lg" variant="gradient" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* What You'll Get Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="py-8 px-4"
          >
            <h2 className="text-2xl font-bold text-center mb-2 text-purple-800">What You'll Get</h2>
            <p className="text-center text-gray-600 mb-6">Everything you need to excel in your studies</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => navigate('/login')} className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer">
                <div className="bg-indigo-100 p-3 rounded-full mb-3">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-medium text-purple-800">Interactive Quizzes</h3>
              </div>
              
              <div onClick={() => navigate('/login')} className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer">
                <div className="bg-pink-100 p-3 rounded-full mb-3">
                  <Lightbulb className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-medium text-purple-800">Current Affairs</h3>
              </div>
              
              <div onClick={() => navigate('/login')} className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer">
                <div className="bg-amber-100 p-3 rounded-full mb-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-purple-800">Scheduled Exams</h3>
              </div>
              
              <div onClick={() => navigate('/login')} className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-purple-800">Earn Rewards</h3>
              </div>
            </div>
          </motion.section>

          {/* How It Works */}
          <section className="py-8 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-1">Register an Account</h3>
                  <p className="text-gray-600 text-sm">Create your free account to get started with QuizMaster.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-1">Choose Your Subjects</h3>
                  <p className="text-gray-600 text-sm">Select from various subjects based on your class and interests.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-1">Take Quizzes & Exams</h3>
                  <p className="text-gray-600 text-sm">Test your knowledge with interactive quizzes and timed exams.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 mb-1">Track Progress & Earn Rewards</h3>
                  <p className="text-gray-600 text-sm">Monitor your improvement and earn badges as you advance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Carousel */}
          <section className="py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-purple-800">Key Features</h2>
            
            <Carousel
              opts={{ 
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/1">
                    <div className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-${feature.color}-200`}>
                      <div className={`bg-${feature.color}-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto transform hover:rotate-12 transition-transform`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-3 text-center text-${feature.color}-800`}>{feature.title}</h3>
                      <p className={`text-${feature.color}-700 text-sm`}>
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="static translate-y-0 h-8 w-8" />
                <CarouselNext className="static translate-y-0 h-8 w-8" />
              </div>
            </Carousel>
          </section>

          {/* CTA */}
          <section className="py-10 px-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
              <div className="flex justify-center space-x-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-purple-500/30 p-2 mb-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm">Interactive</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-purple-500/30 p-2 mb-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm">Rewarding</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-purple-500/30 p-2 mb-2">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm">Educational</span>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 text-purple-900 hover:bg-yellow-400" onClick={() => navigate('/register')}>
                <Star className="mr-2 h-5 w-5" />
                Join QuizMaster Now
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 py-6 text-white text-sm rounded-b-lg">
          <p className="text-center px-4">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
