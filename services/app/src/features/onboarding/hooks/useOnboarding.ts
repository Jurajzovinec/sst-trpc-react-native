import { useState } from 'react';

export const useOnboarding = () => {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const submitAnswers = () => {
    console.log('Submitting answers:', answers);
    // Mock API call here
  };

  return {
    answers,
    handleAnswerChange,
    submitAnswers,
  };
};
