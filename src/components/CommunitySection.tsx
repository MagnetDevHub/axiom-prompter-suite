import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Users, TrendingUp, Heart, Reply, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  created_at: string;
  profiles: {
    display_name: string;
    avatar_url?: string;
  };
}

export const CommunitySection = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          id,
          title,
          content,
          category,
          likes,
          replies,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      // Add mock profiles for now
      const postsWithProfiles = (data || []).map(post => ({
        ...post,
        profiles: {
          display_name: 'User',
          avatar_url: undefined
        }
      }));
      
      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create posts",
        variant: "destructive",
      });
      return;
    }

    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
        });

      if (error) throw error;

      toast({
        title: "Post Created!",
        description: "Your post has been shared with the community",
      });

      setNewPost({ title: '', content: '', category: 'general' });
      setShowNewPost(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error Creating Post",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const categories = [
    { value: 'general', label: 'General Discussion' },
    { value: 'prompts', label: 'Prompt Sharing' },
    { value: 'tips', label: 'Tips & Tricks' },
    { value: 'showcase', label: 'Showcase' },
    { value: 'questions', label: 'Questions' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Users className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Community Hub</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Connect with fellow prompt engineers and share knowledge
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">567</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Posts This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Post */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Share with Community
            </CardTitle>
            <Button
              onClick={() => setShowNewPost(!showNewPost)}
              variant="outline"
              size="sm"
            >
              {showNewPost ? 'Cancel' : 'New Post'}
            </Button>
          </div>
        </CardHeader>
        {showNewPost && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Select 
                value={newPost.category} 
                onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Share your thoughts, prompts, or questions with the community..."
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[120px]"
              />
            </div>
            <Button 
              onClick={createPost} 
              disabled={loading || !user}
              variant="hero"
              className="w-full"
            >
              {loading ? "Posting..." : "Share Post"}
            </Button>
            {!user && (
              <p className="text-sm text-muted-foreground text-center">
                Please sign in to share posts with the community
              </p>
            )}
          </CardContent>
        )}
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category.value} variant="secondary" className="cursor-pointer hover:bg-primary/20">
            {category.label}
          </Badge>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-gradient-card border-border/50 hover:shadow-primary/20 transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.value === post.category)?.label || post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      by {post.profiles?.display_name || 'Anonymous'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Reply className="w-4 h-4" />
                  {post.replies} replies
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {posts.length === 0 && (
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Be the first to share something with the community!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};