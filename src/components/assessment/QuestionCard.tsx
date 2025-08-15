import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/assessment';
import { likertScale } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  selectedAnswer?: number;
}

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  selectedAnswer
}: QuestionCardProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const getSectionBadge = () => {
    switch (question.category) {
      case 'psychometric':
        return <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Psychometric</span>;
      case 'technical':
        return <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">Technical</span>;
      case 'wiscar':
        return <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">WISCAR</span>;
      default:
        return null;
    }
  };

  const renderAnswerOptions = () => {
    if (question.type === 'likert') {
      return (
        <div className="space-y-3">
          {likertScale.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-4 px-6"
              onClick={() => onAnswer(index)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === index 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                }`} />
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>
      );
    }

    if (question.type === 'multiple-choice' || question.type === 'scenario') {
      return (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-4 px-6"
              onClick={() => onAnswer(index)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === index 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                }`} />
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-start">
              {getSectionBadge()}
              <span className="text-sm text-muted-foreground capitalize">
                {question.subcategory}
              </span>
            </div>
            <CardTitle className="text-xl md:text-2xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderAnswerOptions()}
            
            {question.type === 'scenario' && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Consider what would be the most professional and effective approach
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};