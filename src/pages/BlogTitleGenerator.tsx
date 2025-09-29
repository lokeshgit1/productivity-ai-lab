import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const BlogTitleGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('technology');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-titles', {
        body: { keyword, category }
      });

      if (error) throw error;

      setTitles(data.titles);
      toast.success('Titles generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate titles');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Blog Title Generator</h1>
        <p className="text-muted-foreground">
          Generate catchy blog titles for your content
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Input
            </CardTitle>
            <CardDescription>Enter your keyword and category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Keyword</Label>
              <Input
                id="keyword"
                placeholder="e.g., productivity, marketing, fitness..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? 'Generating...' : 'Generate Titles'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Titles</CardTitle>
            <CardDescription>Click to copy any title</CardDescription>
          </CardHeader>
          <CardContent>
            {titles.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Generated titles will appear here
              </p>
            ) : (
              <div className="space-y-3">
                {titles.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => handleCopy(title)}
                    className="w-full p-4 text-left rounded-lg border border-border hover:border-primary hover:bg-card/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex-1">{title}</span>
                      <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogTitleGenerator;