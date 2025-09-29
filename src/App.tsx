import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ArticleGenerator from "./pages/ArticleGenerator";
import BlogTitleGenerator from "./pages/BlogTitleGenerator";
import ImageGenerator from "./pages/ImageGenerator";
import BackgroundRemover from "./pages/BackgroundRemover";
import ObjectRemover from "./pages/ObjectRemover";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/article-generator" element={<AppLayout><ArticleGenerator /></AppLayout>} />
            <Route path="/blog-title-generator" element={<AppLayout><BlogTitleGenerator /></AppLayout>} />
            <Route path="/image-generator" element={<AppLayout><ImageGenerator /></AppLayout>} />
            <Route path="/background-remover" element={<AppLayout><BackgroundRemover /></AppLayout>} />
            <Route path="/object-remover" element={<AppLayout><ObjectRemover /></AppLayout>} />
            <Route path="/resume-analyzer" element={<AppLayout><ResumeAnalyzer /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
