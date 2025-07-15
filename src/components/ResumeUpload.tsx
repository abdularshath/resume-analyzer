import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { validateResumeContent } from '@/utils/resumeAnalyzer';

interface ResumeUploadProps {
  onFileUploaded: (file: File) => void;
}

export const ResumeUpload = ({ onFileUploaded }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      // Basic validation for resume-like content
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a PDF file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size < 1024) { // Too small to be a real resume
        toast({
          title: "File too small",
          description: "This doesn't appear to be a valid resume. Please upload a proper PDF resume.",
          variant: "destructive",
        });
        return;
      }
      
      handleFileUpload(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF resume only.",
        variant: "destructive",
      });
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Validate that the PDF appears to be a resume
      const isValidResume = await validateResumeContent(file);
      
      if (!isValidResume) {
        toast({
          title: "Not a Resume",
          description: "This PDF doesn't appear to be a resume. Please upload a proper resume document with career information.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Resume uploaded successfully!",
        description: "Starting AI analysis...",
      });
      
      setIsUploading(false);
      onFileUploaded(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing your resume. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Upload Your Resume
        </CardTitle>
        <CardDescription className="text-lg">
          Get AI-powered insights and career recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
            ${isDragOver 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }
            ${isUploading ? 'pointer-events-none opacity-75' : 'cursor-pointer'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <div className="flex flex-col items-center space-y-4">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Processing your resume...</p>
              </>
            ) : (
              <>
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your resume here</p>
                  <p className="text-sm text-muted-foreground">
                    or <span className="text-primary font-medium">browse files</span>
                  </p>
                  <p className="text-xs text-muted-foreground">PDF files only, max 10MB</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>AI-powered resume analysis</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Personalized career recommendations</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Skills gap analysis</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};