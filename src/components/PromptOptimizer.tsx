import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, Sparkles, Brain, Code, Image, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OptimizedPrompt {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'code';
  quality: number;
}

export const PromptOptimizer = () => {
  const [goal, setGoal] = useState("");
  const [modelType, setModelType] = useState<'text' | 'image' | 'code'>('text');
  const [creativity, setCreativity] = useState([0.7]);
  const [tone, setTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [optimizedPrompts, setOptimizedPrompts] = useState<OptimizedPrompt[]>([]);

  const generatePrompts = async () => {
    if (!goal.trim()) {
      toast({
        title: "Please enter your goal",
        description: "Describe what you want to achieve with AI",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI prompt generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPrompts: OptimizedPrompt[] = [
      {
        id: '1',
        title: 'Creative & Detailed Prompt',
        content: `${goal}. Please provide a comprehensive, creative response that explores multiple angles and perspectives. Consider the context deeply and offer detailed explanations with examples.`,
        type: modelType,
        quality: 95
      },
      {
        id: '2',
        title: 'Professional & Structured',
        content: `Acting as an expert in this field, ${goal}. Structure your response with clear headings, bullet points, and actionable insights. Maintain a professional tone throughout.`,
        type: modelType,
        quality: 88
      },
      {
        id: '3',
        title: 'Concise & Direct',
        content: `${goal}. Provide a clear, concise response that gets straight to the point. Focus on the most important aspects and avoid unnecessary elaboration.`,
        type: modelType,
        quality: 82
      }
    ];

    setOptimizedPrompts(mockPrompts);
    setIsGenerating(false);
    
    toast({
      title: "Prompts Generated!",
      description: `Created ${mockPrompts.length} optimized prompts for ${modelType} models`,
    });
  };

  const copyPrompt = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard!",
      description: "Prompt is ready to use",
    });
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-3xl font-bold">AI Prompt Optimizer</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Transform your ideas into high-performance AI prompts
        </p>
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Prompt Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Goal</label>
            <Textarea
              placeholder="Describe what you want to achieve with AI... (e.g., write a marketing email, generate code, create an image)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-[100px] bg-muted/50 border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">AI Model Type</label>
              <Select value={modelType} onValueChange={(value: 'text' | 'image' | 'code') => setModelType(value)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Text Generation
                    </div>
                  </SelectItem>
                  <SelectItem value="image">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Image Generation
                    </div>
                  </SelectItem>
                  <SelectItem value="code">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Code Generation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tone & Style</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Creativity Level: {Math.round(creativity[0] * 100)}%
            </label>
            <Slider
              value={creativity}
              onValueChange={setCreativity}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Focused</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>

          <Button 
            onClick={generatePrompts} 
            disabled={isGenerating}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Generating Prompts...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Optimized Prompts
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {optimizedPrompts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Your Optimized Prompts</h3>
          <div className="grid gap-4">
            {optimizedPrompts.map((prompt) => (
              <Card key={prompt.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-primary/20 transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getModelIcon(prompt.type)}
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        {prompt.quality}% Quality
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPrompt(prompt.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{prompt.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};