import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Target, 
  Award,
  BookOpen,
  ArrowRight,
  Download
} from 'lucide-react';

interface AnalysisResultsProps {
  fileName: string;
}

export const AnalysisResults = ({ fileName }: AnalysisResultsProps) => {
  // Mock analysis data
  const analysisData = {
    overallScore: 85,
    strengths: [
      "Strong technical skills",
      "Relevant experience",
      "Clear formatting",
      "Quantified achievements"
    ],
    improvements: [
      "Add more soft skills",
      "Include certifications",
      "Enhance project descriptions"
    ],
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Python", level: 75 },
      { name: "Project Management", level: 60 },
      { name: "Communication", level: 70 }
    ],
    careerPaths: [
      {
        title: "Senior Frontend Developer",
        match: 92,
        description: "Perfect fit based on your React and JavaScript expertise",
        requirements: ["Advanced React", "TypeScript", "Testing"],
        growth: "High demand, $95k-$130k"
      },
      {
        title: "Full Stack Developer",
        match: 78,
        description: "Great opportunity to expand backend skills",
        requirements: ["Node.js", "Database Design", "APIs"],
        growth: "Excellent growth, $85k-$120k"
      },
      {
        title: "Technical Lead",
        match: 65,
        description: "Leadership role leveraging technical background",
        requirements: ["Team Leadership", "Architecture", "Mentoring"],
        growth: "Leadership track, $110k-$150k"
      }
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="bg-gradient-hero text-primary-foreground shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6" />
                Analysis Complete
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {fileName} • Analyzed with AI
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{analysisData.overallScore}%</div>
              <div className="text-sm text-primary-foreground/80">Overall Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths & Improvements */}
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Star className="h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysisData.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Target className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysisData.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm">{improvement}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Skills Analysis
          </CardTitle>
          <CardDescription>
            Your skill levels based on resume content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysisData.skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="secondary">{skill.level}%</Badge>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommended Career Paths
          </CardTitle>
          <CardDescription>
            AI-curated opportunities based on your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysisData.careerPaths.map((path, index) => (
            <Card key={index} className="border bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{path.title}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Badge variant="success" className="ml-2">
                    {path.match}% match
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground">{path.growth}</span>
                    <Button size="sm" variant="gradient">
                      Explore Path
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="professional" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" size="lg">
          <User className="h-4 w-4 mr-2" />
          Create Profile
        </Button>
      </div>
    </div>
  );
};