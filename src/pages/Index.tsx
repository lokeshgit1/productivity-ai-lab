import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="text-center space-y-6 max-w-4xl">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary mb-4 glow">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
          QuickAI
        </h1>
        
        <p className="text-2xl text-muted-foreground mb-8">
          Your AI-Powered Productivity Suite
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Generate articles, create images, remove backgrounds, analyze resumes, and more – all powered by cutting-edge AI technology.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
