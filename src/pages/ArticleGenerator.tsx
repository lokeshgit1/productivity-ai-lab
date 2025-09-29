import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ArticleGenerator = () => {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState('medium');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error('Please enter an article title');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-article', {
        body: { title, length }
      });

      if (error) throw error;

      setArticle(data.article);
      toast.success('Article generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate article');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(article);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([article], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Article downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Article Generator</h1>
        <p className="text-muted-foreground">
          Generate high-quality articles with AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Input
            </CardTitle>
            <CardDescription>Enter the details for your article</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                placeholder="Enter article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Article Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (300-500 words)</SelectItem>
                  <SelectItem value="medium">Medium (500-800 words)</SelectItem>
                  <SelectItem value="long">Long (800-1200 words)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? 'Generating...' : 'Generate Article'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Article</CardTitle>
            <CardDescription>Your AI-generated content will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={article}
              readOnly
              placeholder="Generated article will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            
            {article && (
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleGenerator;