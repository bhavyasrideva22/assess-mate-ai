import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CloudIcon, ServerIcon, ShieldIcon, ZapIcon } from 'lucide-react';
import heroImage from '@/assets/assessment-hero.jpg';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-lg px-4 py-2">
              TechFit 360™ Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cloud Storage Engineer
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover if you're ready to launch your career in cloud storage engineering
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <span className="flex items-center gap-2">
                <ZapIcon className="w-5 h-5" />
                20-30 minutes
              </span>
              <span className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                Comprehensive Analysis
              </span>
              <span className="flex items-center gap-2">
                <CloudIcon className="w-5 h-5" />
                Career Guidance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* What is Cloud Storage Engineering */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <ServerIcon className="w-8 h-8 text-primary" />
                What Is Cloud Storage Engineering?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Cloud Storage Engineers design, deploy, and maintain scalable, secure cloud storage systems. 
                They work with platforms like AWS S3, Google Cloud Storage, and Azure Blob Storage to manage 
                data lifecycle, performance, compliance, and access.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Typical Career Paths:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Cloud Storage Engineer</li>
                    <li>• Cloud Infrastructure Engineer</li>
                    <li>• Site Reliability Engineer</li>
                    <li>• Data Storage Architect</li>
                    <li>• DevOps Engineer (Storage Focus)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Traits for Success:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Strong logical & systems thinking</li>
                    <li>• High attention to detail</li>
                    <li>• Preference for structure & optimization</li>
                    <li>• Long-term thinking for data integrity</li>
                    <li>• Collaborative communication skills</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Assessment Overview</CardTitle>
              <CardDescription className="text-lg">
                Our comprehensive evaluation covers multiple dimensions to give you accurate insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-primary/5">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold">🧠</span>
                  </div>
                  <h4 className="font-semibold mb-2">Psychometric Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Personality, interests, motivation, and psychological fit assessment
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-accent/5">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-foreground font-bold">⚡</span>
                  </div>
                  <h4 className="font-semibold mb-2">Technical Aptitude</h4>
                  <p className="text-sm text-muted-foreground">
                    Current knowledge, logical reasoning, and domain-specific skills
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-success/5">
                  <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-success-foreground font-bold">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2">WISCAR Framework</h4>
                  <p className="text-sm text-muted-foreground">
                    Will, Interest, Skill, Cognitive ability, Ability to learn, Real-world alignment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">What You'll Receive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Detailed Score Analysis</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive breakdown of your strengths and areas for improvement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">WISCAR Radar Chart</h4>
                      <p className="text-sm text-muted-foreground">Visual representation of your readiness across six key dimensions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Personalized Recommendations</h4>
                      <p className="text-sm text-muted-foreground">Clear guidance on whether to pursue this career path</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Learning Pathway</h4>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to develop the skills you need</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Alternative Career Paths</h4>
                      <p className="text-sm text-muted-foreground">Related opportunities that might be a better fit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Confidence Score</h4>
                      <p className="text-sm text-muted-foreground">Overall assessment of your likelihood of success</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Assessment */}
          <div className="text-center py-8">
            <Button 
              onClick={onStartAssessment}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 h-auto"
            >
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Take the first step towards your cloud storage engineering career
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};