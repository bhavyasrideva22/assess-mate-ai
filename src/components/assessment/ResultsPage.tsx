import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { CheckCircleIcon, AlertCircleIcon, XCircleIcon, TrendingUpIcon, BookOpenIcon, BrainIcon } from 'lucide-react';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'pursue':
        return <CheckCircleIcon className="w-8 h-8 text-success" />;
      case 'maybe':
        return <AlertCircleIcon className="w-8 h-8 text-warning" />;
      case 'no':
        return <XCircleIcon className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationTitle = () => {
    switch (results.recommendation) {
      case 'pursue':
        return 'Strong Recommendation: Pursue This Career';
      case 'maybe':
        return 'Conditional Recommendation: Consider With Preparation';
      case 'no':
        return 'Alternative Paths Recommended';
    }
  };

  const getRecommendationDescription = () => {
    switch (results.recommendation) {
      case 'pursue':
        return 'You show excellent potential for success as a Cloud Storage Engineer. Your profile indicates strong alignment with the role requirements.';
      case 'maybe':
        return 'You have some good qualities for this role, but would benefit from additional preparation and skill development before pursuing it seriously.';
      case 'no':
        return 'Based on your current profile, other career paths might be a better fit for your interests and strengths. Consider the alternatives below.';
    }
  };

  const radarData = [
    {
      subject: 'Will',
      value: results.scores.wiscar.will,
      fullMark: 100,
    },
    {
      subject: 'Interest',
      value: results.scores.wiscar.interest,
      fullMark: 100,
    },
    {
      subject: 'Skill',
      value: results.scores.technical,
      fullMark: 100,
    },
    {
      subject: 'Cognitive',
      value: results.scores.wiscar.cognitive,
      fullMark: 100,
    },
    {
      subject: 'Ability',
      value: results.scores.wiscar.ability,
      fullMark: 100,
    },
    {
      subject: 'Real-World',
      value: results.scores.wiscar.realWorld,
      fullMark: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Your Assessment Results</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis of your readiness for Cloud Storage Engineering
            </p>
          </div>

          {/* Overall Score Card */}
          <Card className="shadow-elegant bg-gradient-primary text-primary-foreground">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getRecommendationIcon()}
              </div>
              <CardTitle className="text-3xl font-bold">
                Overall Score: {results.scores.overall}/100
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                {getRecommendationTitle()}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg opacity-90">
                {getRecommendationDescription()}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainIcon className="w-5 h-5 text-primary" />
                  Psychological Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Score</span>
                    <span className="font-bold">{results.scores.psychological}/100</span>
                  </div>
                  <Progress value={results.scores.psychological} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Measures personality traits, interests, and motivation alignment with the role.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="w-5 h-5 text-accent" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Score</span>
                    <span className="font-bold">{results.scores.technical}/100</span>
                  </div>
                  <Progress value={results.scores.technical} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Evaluates current technical knowledge and problem-solving abilities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-success" />
                  Learning Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Score</span>
                    <span className="font-bold">{Math.round((results.scores.wiscar.ability + results.scores.wiscar.will) / 2)}/100</span>
                  </div>
                  <Progress value={(results.scores.wiscar.ability + results.scores.wiscar.will) / 2} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Combines willingness to learn and growth mindset indicators.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
              <CardDescription>
                Your readiness across six key dimensions for career success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={false}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-success">Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-warning">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertCircleIcon className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{weakness}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
              <CardDescription>
                Your personalized learning and career development pathway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Paths */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Career Path Recommendations</CardTitle>
              <CardDescription>
                Ranked by compatibility with your assessment results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.careerPaths.map((path, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{path.title}</h4>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge variant={path.match >= 75 ? "default" : path.match >= 60 ? "secondary" : "outline"}>
                        {path.match}% Match
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Key Requirements:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {path.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Timeline:</h5>
                        <p className="text-sm text-muted-foreground">{path.timeline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button 
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="mr-4"
            >
              Take Assessment Again
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-primary hover:shadow-glow"
            >
              Download Full Report
            </Button>
            <p className="text-sm text-muted-foreground">
              Use these insights to guide your career development journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};