
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import LockContent from '@/components/common/LockContent';
import TokenDisplay from '@/components/common/TokenDisplay';

// This is a mock component since we don't have the full implementation
// You would replace this with your actual QuizAttempt implementation
const QuizAttemptContent: React.FC<{ quizId: string }> = ({ quizId }) => {
  const { quizzes } = useApp();
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return <div>Quiz not found</div>;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{quiz.title}</h1>
      <p className="text-gray-600">{quiz.description}</p>
      
      {/* Mock quiz question display */}
      <div className="space-y-8 mt-8">
        {quiz.questions.map((question, idx) => (
          <div key={idx} className="border p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Question {idx + 1}: {question.text}</h3>
            <div className="space-y-2">
              {question.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="radio" 
                    id={`q${idx}-opt${optIdx}`} 
                    name={`question-${idx}`} 
                  />
                  <label htmlFor={`q${idx}-opt${optIdx}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuizAttempt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizzes } = useApp();
  
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold">Quiz not found</h2>
          <p className="mt-2 text-muted-foreground">The requested quiz does not exist.</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Back to Quizzes
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/quizzes')}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <span className="mr-1">←</span> Back to Quizzes
        </button>
        <TokenDisplay />
      </div>
      
      <LockContent 
        tokenCost={1}
        title="Quiz Access"
        description={`This quiz requires 1 token to attempt. There are ${quiz.questions.length} questions.`}
      >
        <QuizAttemptContent quizId={id!} />
      </LockContent>
    </MainLayout>
  );
};

export default QuizAttempt;
