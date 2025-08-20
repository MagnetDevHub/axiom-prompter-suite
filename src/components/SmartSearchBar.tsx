import { useState, useEffect } from "react";
import { Search, Mic, Camera, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SmartSearchBarProps {
  onSearch: (query: string) => void;
  suggestions?: string[];
  className?: string;
}

export const SmartSearchBar = ({ onSearch, suggestions = [], className }: SmartSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Popular search categories
  const popularCategories = [
    "Gaming Laptops",
    "Wireless Headphones",
    "Smart Home",
    "Fitness Trackers",
    "Kitchen Appliances",
    "Phone Cases",
    "Books",
    "Office Chairs"
  ];

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate AI-powered search suggestions
      const timer = setTimeout(() => {
        const smartSuggestions = [
          `${query} under $100`,
          `best ${query} 2024`,
          `${query} with good reviews`,
          `${query} on sale`,
          `${query} for beginners`
        ].filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()));
        
        setAiSuggestions(smartSuggestions);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
      setAiSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <Input
          type="text"
          placeholder="What are you looking for? Try 'gaming laptop under $1000'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query.length > 2 && setShowSuggestions(true)}
          className="pl-12 pr-32 py-6 text-lg bg-background/50 backdrop-blur-sm border-2 border-primary/20 focus:border-primary transition-all"
        />
        
        {/* Action Buttons */}
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10"
            title="Voice Search"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10"
            title="Visual Search"
          >
            <Camera className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => handleSearch()}
            className="h-8 px-4 bg-gradient-primary text-primary-foreground hover:shadow-glow"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-elegant z-50 max-h-96 overflow-y-auto">
          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">AI Suggestions</span>
              </div>
              <div className="space-y-1">
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Categories */}
          {query.length === 0 && (
            <div className="p-4">
              <span className="text-sm font-medium text-muted-foreground mb-2 block">Popular Categories</span>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSearch(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};