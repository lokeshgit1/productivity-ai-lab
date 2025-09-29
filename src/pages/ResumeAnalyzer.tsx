import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileCheck, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }

      setFile(selectedFile);
      setAnalysis('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a resume first');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        const { data, error } = await supabase.functions.invoke('analyze-resume', {
          body: { resume: base64, filename: file.name }
        });

        if (error) throw error;

        setAnalysis(data.analysis);
        toast.success('Resume analyzed successfully!');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze resume');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([analysis], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Analysis downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Get AI-powered feedback on your resume
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Upload Resume
            </CardTitle>
            <CardDescription>Upload your resume (PDF or DOC)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume File</Label>
              <Input
                ref={fileInputRef}
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>

            {file ? (
              <div className="p-4 rounded-lg border border-border">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Upload your resume to get started</p>
                </div>
              </div>
            )}

            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !file} 
              className="w-full"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered resume feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!analysis ? (
              <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Analysis results will appear here</p>
              </div>
            ) : (
              <>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm">{analysis}</div>
                </div>
                <Button onClick={handleDownload} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Analysis
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;