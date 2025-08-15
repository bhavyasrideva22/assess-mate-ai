export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  correctAnswer?: number;
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number;
  timeSpent?: number;
}

export interface AssessmentResults {
  scores: {
    psychological: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
    overall: number;
  };
  recommendation: 'pursue' | 'maybe' | 'no';
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  careerPaths: CareerPath[];
}

export interface CareerPath {
  title: string;
  match: number;
  description: string;
  requirements: string[];
  timeline: string;
}

export interface AssessmentState {
  currentSection: 'intro' | 'questions' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: number;
  results?: AssessmentResults;
}