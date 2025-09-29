import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, Image, Eraser, Scissors, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const tools = [
  {
    title: 'Article Generator',
    description: 'Generate high-quality articles with AI',
    icon: FileText,
    href: '/article-generator',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Blog Title Generator',
    description: 'Create catchy blog titles instantly',
    icon: Lightbulb,
    href: '/blog-title-generator',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Image Generator',
    description: 'Generate stunning images from text',
    icon: Image,
    href: '/image-generator',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Background Remover',
    description: 'Remove backgrounds from images',
    icon: Eraser,
    href: '/background-remover',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Object Remover',
    description: 'Remove unwanted objects from photos',
    icon: Scissors,
    href: '/object-remover',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Resume Analyzer',
    description: 'Get AI-powered resume feedback',
    icon: FileCheck,
    href: '/resume-analyzer',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Choose an AI tool to get started
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} to={tool.href}>
            <Card className="group hover:card-shadow transition-all duration-300 h-full cursor-pointer">
              <CardHeader>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient} mb-4`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Open Tool →
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;