import { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Brain, Zap, Target } from 'lucide-react';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUploaded = (file: File) => {
    setUploadedFile(file);
  };

  const resetUpload = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Resume Analyzer
                </h1>
                <p className="text-xs text-muted-foreground">Powered by AI Intelligence</p>
              </div>
            </div>
            {uploadedFile && (
              <button
                onClick={resetUpload}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Upload New Resume
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!uploadedFile ? (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered Resume Analysis
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get instant insights, career recommendations, and skill gap analysis 
                  powered by advanced artificial intelligence
                </p>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                <div className="text-center space-y-3 p-6 rounded-lg bg-gradient-card hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep learning algorithms analyze your resume structure and content
                  </p>
                </div>
                
                <div className="text-center space-y-3 p-6 rounded-lg bg-gradient-card hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold">Career Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized career path recommendations based on your skills
                  </p>
                </div>
                
                <div className="text-center space-y-3 p-6 rounded-lg bg-gradient-card hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-success/10 rounded-full w-fit mx-auto">
                    <Zap className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="font-semibold">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed feedback and actionable insights in seconds
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Component */}
            <ResumeUpload onFileUploaded={handleFileUploaded} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <AnalysisResults fileName={uploadedFile.name} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AI Resume Analyzer. Empowering careers with artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
