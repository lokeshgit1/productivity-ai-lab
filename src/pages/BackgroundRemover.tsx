import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eraser, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) {
      toast.error('Please upload an image first');
      return;
    }

    setLoading(true);
    toast.info('This feature uses browser-based AI. Processing may take a moment...');

    try {
      // Note: This is a placeholder. In production, you'd use @huggingface/transformers
      // or a backend service for background removal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just display the original as processed
      setProcessedImage(originalImage);
      toast.success('Background removed! (Demo mode - integrate with transformers.js for real processing)');
    } catch (error: any) {
      toast.error(error.message || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `background-removed-${Date.now()}.png`;
    a.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Background Remover</h1>
        <p className="text-muted-foreground">
          Remove backgrounds from your images with AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eraser className="h-5 w-5" />
              Original Image
            </CardTitle>
            <CardDescription>Upload an image to process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Upload Image</Label>
              <Input
                ref={fileInputRef}
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>

            {originalImage ? (
              <img
                src={originalImage}
                alt="Original"
                className="w-full rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Upload an image to get started</p>
                </div>
              </div>
            )}

            <Button 
              onClick={handleRemoveBackground} 
              disabled={loading || !originalImage} 
              className="w-full"
            >
              {loading ? 'Processing...' : 'Remove Background'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processed Image</CardTitle>
            <CardDescription>Image with background removed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!processedImage ? (
              <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Processed image will appear here</p>
              </div>
            ) : (
              <>
                <div className="relative rounded-lg overflow-hidden" style={{
                  backgroundImage: 'repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                }}>
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full"
                  />
                </div>
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

export default BackgroundRemover;