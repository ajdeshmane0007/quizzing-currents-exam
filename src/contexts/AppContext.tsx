import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Quiz, CurrentAffair, Exam, QuizResult } from '../types';
import { 
  mockUsers, 
  mockQuizzes, 
  mockCurrentAffairs, 
  mockExams, 
  mockQuizResults 
} from '../data/mockData';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  
  // Data
  quizzes: Quiz[];
  currentAffairs: CurrentAffair[];
  exams: Exam[];
  results: QuizResult[];
  mockUsers: User[];
  
  // Admin functions
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  createCurrentAffair: (affair: Omit<CurrentAffair, 'id' | 'publishedDate'>) => void;
  updateCurrentAffair: (affair: CurrentAffair) => void;
  deleteCurrentAffair: (id: string) => void;
  createExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
  
  // Student functions
  submitQuizResult: (result: Omit<QuizResult, 'completedAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>(mockCurrentAffairs);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [results, setResults] = useState<QuizResult[]>(mockQuizResults);
  
  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate against a backend
    // For now, we'll just check if the user exists in our mock data
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      // For demo purposes, we'll accept any password
      console.log("User found, logging in:", user);
      setCurrentUser(user);
      return true;
    }
    
    console.log("Login failed, user not found:", email);
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
  };
  
  // Admin functions
  const createQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: `quiz-${Date.now()}`,
      createdAt: new Date(),
    };
    setQuizzes([...quizzes, newQuiz]);
  };
  
  const updateQuiz = (quiz: Quiz) => {
    setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
  };
  
  const deleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };
  
  const createCurrentAffair = (affair: Omit<CurrentAffair, 'id' | 'publishedDate'>) => {
    const newAffair: CurrentAffair = {
      ...affair,
      id: `affair-${Date.now()}`,
      publishedDate: new Date(),
    };
    setCurrentAffairs([...currentAffairs, newAffair]);
  };
  
  const updateCurrentAffair = (affair: CurrentAffair) => {
    setCurrentAffairs(currentAffairs.map(a => a.id === affair.id ? affair : a));
  };
  
  const deleteCurrentAffair = (id: string) => {
    setCurrentAffairs(currentAffairs.filter(a => a.id !== id));
  };
  
  const createExam = (exam: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      ...exam,
      id: `exam-${Date.now()}`,
    };
    setExams([...exams, newExam]);
  };
  
  const updateExam = (exam: Exam) => {
    setExams(exams.map(e => e.id === exam.id ? exam : e));
  };
  
  const deleteExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
  };
  
  // Student functions
  const submitQuizResult = (result: Omit<QuizResult, 'completedAt'>) => {
    const newResult: QuizResult = {
      ...result,
      completedAt: new Date(),
    };
    setResults([...results, newResult]);
  };
  
  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
        quizzes,
        currentAffairs,
        exams,
        results,
        mockUsers,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        createCurrentAffair,
        updateCurrentAffair,
        deleteCurrentAffair,
        createExam,
        updateExam,
        deleteExam,
        submitQuizResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
