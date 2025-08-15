import { Answer, Question, AssessmentResults, CareerPath } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateAssessmentResults = (answers: Answer[]): AssessmentResults => {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
  
  // Calculate section scores
  const psychometricScore = calculateSectionScore(answers, 'psychometric');
  const technicalScore = calculateTechnicalScore(answers);
  const wiscarScores = calculateWISCARScores(answers);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (psychometricScore * 0.3 + technicalScore * 0.3 + calculateWISCARAverage(wiscarScores) * 0.4)
  );
  
  // Determine recommendation
  const recommendation = getRecommendation(overallScore, psychometricScore, technicalScore);
  
  // Generate insights
  const strengths = getStrengths(psychometricScore, technicalScore, wiscarScores);
  const weaknesses = getWeaknesses(psychometricScore, technicalScore, wiscarScores);
  const nextSteps = getNextSteps(recommendation, strengths, weaknesses);
  const careerPaths = getCareerPaths(overallScore, psychometricScore, technicalScore);
  
  return {
    scores: {
      psychological: psychometricScore,
      technical: technicalScore,
      wiscar: wiscarScores,
      overall: overallScore
    },
    recommendation,
    strengths,
    weaknesses,
    nextSteps,
    careerPaths
  };
};

const calculateSectionScore = (answers: Answer[], category: string): number => {
  const sectionQuestions = assessmentQuestions.filter(q => q.category === category);
  const sectionAnswers = answers.filter(a => 
    sectionQuestions.some(q => q.id === a.questionId)
  );
  
  if (sectionAnswers.length === 0) return 0;
  
  let totalScore = 0;
  let totalWeight = 0;
  
  sectionAnswers.forEach(answer => {
    const question = sectionQuestions.find(q => q.id === answer.questionId);
    if (question) {
      // For likert scale questions, convert 0-4 to 0-100
      let score = 0;
      if (question.type === 'likert') {
        score = (answer.value / 4) * 100;
      } else if (question.type === 'multiple-choice' && question.correctAnswer !== undefined) {
        score = answer.value === question.correctAnswer ? 100 : 0;
      } else if (question.type === 'scenario') {
        // Score scenarios based on best practices (simplified)
        score = getScenarioScore(question.id, answer.value);
      }
      
      totalScore += score * question.weight;
      totalWeight += question.weight;
    }
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

const calculateTechnicalScore = (answers: Answer[]): number => {
  return calculateSectionScore(answers, 'technical');
};

const calculateWISCARScores = (answers: Answer[]) => {
  const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar');
  
  const subcategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realworld'];
  const scores: any = {};
  
  subcategories.forEach(subcategory => {
    const subQuestions = wiscarQuestions.filter(q => q.subcategory === subcategory);
    const subAnswers = answers.filter(a => 
      subQuestions.some(q => q.id === a.questionId)
    );
    
    let totalScore = 0;
    let totalWeight = 0;
    
    subAnswers.forEach(answer => {
      const question = subQuestions.find(q => q.id === answer.questionId);
      if (question) {
        let score = 0;
        if (question.type === 'likert') {
          score = (answer.value / 4) * 100;
        } else if (question.type === 'multiple-choice' && question.correctAnswer !== undefined) {
          score = answer.value === question.correctAnswer ? 100 : 0;
        } else if (question.type === 'scenario') {
          score = getScenarioScore(question.id, answer.value);
        }
        
        totalScore += score * question.weight;
        totalWeight += question.weight;
      }
    });
    
    scores[subcategory] = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  });
  
  return scores;
};

const calculateWISCARAverage = (wiscarScores: any): number => {
  const values = Object.values(wiscarScores) as number[];
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
};

const getScenarioScore = (questionId: string, answerValue: number): number => {
  // Simplified scoring for scenario questions
  const scoringMap: { [key: string]: number[] } = {
    'wiscar-1': [20, 80, 60, 90], // Persistence scenario
    'wiscar-6': [30, 100, 40, 10], // System analysis scenario
    'wiscar-9': [10, 100, 20, 30], // Role understanding
    'wiscar-10': [40, 100, 20, 60] // Architecture scenario
  };
  
  return scoringMap[questionId]?.[answerValue] || 50;
};

const getRecommendation = (overall: number, psychological: number, technical: number): 'pursue' | 'maybe' | 'no' => {
  if (overall >= 75 && psychological >= 70 && technical >= 60) return 'pursue';
  if (overall >= 60 && (psychological >= 70 || technical >= 70)) return 'maybe';
  return 'no';
};

const getStrengths = (psychological: number, technical: number, wiscar: any): string[] => {
  const strengths: string[] = [];
  
  if (psychological >= 75) strengths.push('Strong psychological alignment with the role');
  if (technical >= 75) strengths.push('Solid technical foundation');
  if (wiscar.will >= 80) strengths.push('High motivation and persistence');
  if (wiscar.interest >= 80) strengths.push('Genuine interest in cloud technologies');
  if (wiscar.cognitive >= 75) strengths.push('Strong analytical thinking abilities');
  if (wiscar.ability >= 80) strengths.push('Growth mindset and learning ability');
  if (wiscar.realworld >= 75) strengths.push('Good understanding of real-world requirements');
  
  return strengths.length > 0 ? strengths : ['Willingness to learn and grow'];
};

const getWeaknesses = (psychological: number, technical: number, wiscar: any): string[] => {
  const weaknesses: string[] = [];
  
  if (psychological < 60) weaknesses.push('Personality traits may not align perfectly with typical role requirements');
  if (technical < 50) weaknesses.push('Technical knowledge needs significant development');
  if (wiscar.will < 60) weaknesses.push('May need to develop stronger persistence and motivation');
  if (wiscar.interest < 60) weaknesses.push('Limited current interest in cloud technologies');
  if (wiscar.cognitive < 60) weaknesses.push('Analytical thinking skills could be strengthened');
  if (wiscar.ability < 60) weaknesses.push('Learning strategies and growth mindset need development');
  if (wiscar.realworld < 60) weaknesses.push('Understanding of role requirements needs improvement');
  
  return weaknesses;
};

const getNextSteps = (recommendation: string, strengths: string[], weaknesses: string[]): string[] => {
  const steps: string[] = [];
  
  if (recommendation === 'pursue') {
    steps.push('Enroll in "Cloud Fundamentals for Developers" course');
    steps.push('Start hands-on practice with AWS Free Tier');
    steps.push('Build a personal project using cloud storage services');
    steps.push('Work towards AWS Storage Specialty certification');
  } else if (recommendation === 'maybe') {
    steps.push('Strengthen foundational technical skills first');
    steps.push('Take introductory cloud computing courses');
    steps.push('Assess your interest through free online resources');
    steps.push('Consider starting with cloud support or admin roles');
  } else {
    steps.push('Explore alternative career paths that better match your profile');
    steps.push('Consider roles in IT support, data analysis, or system administration');
    steps.push('Develop core technical skills before revisiting cloud engineering');
    steps.push('Take time to explore your interests and strengths');
  }
  
  return steps;
};

const getCareerPaths = (overall: number, psychological: number, technical: number): CareerPath[] => {
  const paths: CareerPath[] = [
    {
      title: 'Cloud Storage Engineer',
      match: overall,
      description: 'Design and manage scalable cloud storage systems',
      requirements: ['AWS/Azure certification', 'Storage architecture knowledge', 'Scripting skills'],
      timeline: '6-12 months with focused learning'
    },
    {
      title: 'Cloud Support Engineer',
      match: Math.min(overall + 15, 100),
      description: 'Provide technical support for cloud infrastructure',
      requirements: ['Cloud platform basics', 'Customer service skills', 'Troubleshooting abilities'],
      timeline: '3-6 months'
    },
    {
      title: 'DevOps Engineer',
      match: Math.max(overall - 10, 0),
      description: 'Automate infrastructure and deployment processes',
      requirements: ['CI/CD knowledge', 'Infrastructure as Code', 'Multiple cloud platforms'],
      timeline: '8-15 months'
    },
    {
      title: 'System Administrator',
      match: psychological >= 70 ? Math.min(overall + 20, 100) : Math.max(overall - 5, 0),
      description: 'Manage on-premise and hybrid infrastructure',
      requirements: ['Linux/Windows administration', 'Network knowledge', 'Security basics'],
      timeline: '4-8 months'
    }
  ];
  
  return paths.sort((a, b) => b.match - a.match);
};