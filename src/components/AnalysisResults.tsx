import { useEffect, useState } from 'react';
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
  Download,
  FileUser
} from 'lucide-react';
import { generateAnalysis, generateReportPDF, type AnalysisData } from '@/utils/resumeAnalyzer';
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  fileName: string;
  file: File;
}

export const AnalysisResults = ({ fileName, file }: AnalysisResultsProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Generate dynamic analysis based on the actual file
    const analysis = generateAnalysis(file);
    setAnalysisData(analysis);
  }, [file]);

  const handleDownloadReport = () => {
    if (!analysisData) return;
    
    try {
      const reportContent = generateReportPDF(analysisData, fileName);
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `Resume_Analysis_Report_${fileName.replace('.pdf', '')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Downloaded!",
        description: "Your detailed analysis report has been saved to your downloads.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateProfile = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "Create Profile will let you save your analysis and build a professional profile for job matching. This feature is under development.",
    });
  };

  if (!analysisData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

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
                {fileName} • {analysisData.resumeType} Resume
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
        <Button variant="professional" size="lg" onClick={handleDownloadReport}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" size="lg" onClick={handleCreateProfile}>
          <FileUser className="h-4 w-4 mr-2" />
          Create Profile
        </Button>
      </div>
    </div>
  );
};