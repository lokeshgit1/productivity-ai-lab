import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      });

      if (error) throw error;

      setImageUrl(data.imageUrl);
      toast.success('Image generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `generated-image-${Date.now()}.png`;
    a.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Image Generator</h1>
        <p className="text-muted-foreground">
          Create stunning images from text descriptions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Input
            </CardTitle>
            <CardDescription>Describe the image you want to create</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Image Prompt</Label>
              <Input
                id="prompt"
                placeholder="e.g., A serene mountain landscape at sunset..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
            <CardDescription>Your AI-generated image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!imageUrl ? (
              <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Generated image will appear here</p>
              </div>
            ) : (
              <>
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="w-full rounded-lg"
                />
                <Button onClick={handleDownload} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageGenerator;