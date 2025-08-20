import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Sparkles, ShoppingBag, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  products?: Array<{
    id: string;
    title: string;
    price: number;
    rating: number;
    imageUrl: string;
    affiliateUrl: string;
  }>;
}

interface AIChatAssistantProps {
  onProductSearch?: (query: string) => void;
  className?: string;
}

export const AIChatAssistant = ({ onProductSearch, className }: AIChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI shopping assistant. I can help you find the perfect products, compare prices, and answer any questions you have. What are you looking for today?",
      timestamp: new Date(),
      suggestions: [
        "Find me a gaming laptop under $1000",
        "What's the best wireless headphones?",
        "I need a gift for my mom",
        "Show me deals on smart home devices"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // If it's a product search query, trigger the search
      if (isProductSearchQuery(content)) {
        onProductSearch?.(content);
      }
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
      return "I'd be happy to help you find the perfect laptop! Based on your needs, I can recommend options for gaming, work, or general use. What's your budget range and what will you primarily use it for?";
    }
    
    if (lowerQuery.includes('headphones') || lowerQuery.includes('earbuds')) {
      return "Great choice! I can help you find the best headphones. Are you looking for wireless or wired? Do you prefer over-ear, on-ear, or in-ear style? And what's your budget?";
    }
    
    if (lowerQuery.includes('gift')) {
      return "I love helping with gift ideas! Tell me a bit about the person - their age, interests, and your budget. That way I can suggest something they'll really love.";
    }
    
    if (lowerQuery.includes('deal') || lowerQuery.includes('sale') || lowerQuery.includes('cheap')) {
      return "I'm great at finding deals! I can show you current discounts and price drops. What type of products are you interested in, and what's your target price range?";
    }
    
    return "I understand you're looking for recommendations. Let me search for the best options based on your needs. Can you provide more details about what you're looking for?";
  };

  const generateSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('laptop')) {
      return [
        "Show gaming laptops",
        "Budget laptops under $500",
        "Best laptop brands",
        "Laptops for students"
      ];
    }
    
    if (lowerQuery.includes('headphones')) {
      return [
        "Wireless headphones",
        "Noise-canceling options",
        "Budget-friendly picks",
        "Gaming headsets"
      ];
    }
    
    return [
      "Show me similar products",
      "What's trending now?",
      "Compare prices",
      "Find deals and discounts"
    ];
  };

  const isProductSearchQuery = (query: string): boolean => {
    const searchKeywords = ['find', 'show', 'search', 'looking for', 'need', 'want', 'buy'];
    return searchKeywords.some(keyword => query.toLowerCase().includes(keyword));
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-elegant hover:shadow-glow bg-gradient-primary",
          className
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col shadow-elegant bg-background/95 backdrop-blur-lg border-primary/20",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Shopping Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p>{message.content}</p>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2 mb-3">
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleSendMessage("Show me today's best deals")}
            >
              <DollarSign className="h-3 w-3 mr-1" />
              Best Deals
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleSendMessage("What's trending now?")}
            >
              <Star className="h-3 w-3 mr-1" />
              Trending
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleSendMessage("Help me find a gift")}
            >
              <ShoppingBag className="h-3 w-3 mr-1" />
              Gifts
            </Badge>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about products..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};