import { useState, useEffect } from 'react';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { ResultsPage } from './ResultsPage';
import { AssessmentState, Answer } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';
import { calculateAssessmentResults } from '@/utils/assessmentScoring';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const AssessmentFlow = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    answers: [],
    startTime: Date.now(),
  });

  const handleStartAssessment = () => {
    setState(prev => ({
      ...prev,
      currentSection: 'questions',
      startTime: Date.now(),
    }));
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = assessmentQuestions[state.currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      timeSpent: Date.now() - state.startTime,
    };

    setState(prev => {
      const existingAnswerIndex = prev.answers.findIndex(
        a => a.questionId === currentQuestion.id
      );
      
      const newAnswers = [...prev.answers];
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = newAnswer;
      } else {
        newAnswers.push(newAnswer);
      }

      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < assessmentQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      // Calculate results and show results page
      const results = calculateAssessmentResults(state.answers);
      setState(prev => ({
        ...prev,
        currentSection: 'results',
        results,
      }));
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleRestart = () => {
    setState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      answers: [],
      startTime: Date.now(),
    });
  };

  const getCurrentAnswer = () => {
    const currentQuestion = assessmentQuestions[state.currentQuestionIndex];
    const answer = state.answers.find(a => a.questionId === currentQuestion.id);
    return answer?.value;
  };

  const isCurrentQuestionAnswered = () => {
    return getCurrentAnswer() !== undefined;
  };

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (state.currentSection === 'results' && state.results) {
    return <ResultsPage results={state.results} onRestart={handleRestart} />;
  }

  if (state.currentSection === 'questions') {
    const currentQuestion = assessmentQuestions[state.currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <QuestionCard
          question={currentQuestion}
          currentIndex={state.currentQuestionIndex}
          totalQuestions={assessmentQuestions.length}
          onAnswer={handleAnswer}
          selectedAnswer={getCurrentAnswer()}
        />
        
        {/* Navigation Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
          <div className="container mx-auto max-w-3xl flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={state.currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {state.currentQuestionIndex + 1} of {assessmentQuestions.length}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className="flex items-center gap-2"
            >
              {state.currentQuestionIndex === assessmentQuestions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};