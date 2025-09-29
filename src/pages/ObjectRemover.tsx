import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Scissors, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ObjectRemover = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [objectDescription, setObjectDescription] = useState('');
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

  const handleRemoveObject = async () => {
    if (!originalImage) {
      toast.error('Please upload an image first');
      return;
    }

    if (!objectDescription.trim()) {
      toast.error('Please describe the object to remove');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('remove-object', {
        body: { image: originalImage, description: objectDescription }
      });

      if (error) throw error;

      setProcessedImage(data.processedImage);
      toast.success('Object removed successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove object');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `object-removed-${Date.now()}.png`;
    a.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Object Remover</h1>
        <p className="text-muted-foreground">
          Remove unwanted objects from your photos with AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Original Image
            </CardTitle>
            <CardDescription>Upload an image and describe what to remove</CardDescription>
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
              <div className="flex items-center justify-center h-[200px] border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Upload an image to get started</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Object Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the object you want to remove..."
                value={objectDescription}
                onChange={(e) => setObjectDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleRemoveObject} 
              disabled={loading || !originalImage} 
              className="w-full"
            >
              {loading ? 'Processing...' : 'Remove Object'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processed Image</CardTitle>
            <CardDescription>Image with object removed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!processedImage ? (
              <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">Processed image will appear here</p>
              </div>
            ) : (
              <>
                <img
                  src={processedImage}
                  alt="Processed"
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

export default ObjectRemover;