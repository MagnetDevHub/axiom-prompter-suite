import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Target, Award, Calendar } from "lucide-react";

export const AnalyticsSection = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Analytics Dashboard</h2>
        <p className="text-xl text-muted-foreground">
          Track your prompt performance and optimize for success
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Prompts</p>
                <p className="text-2xl font-bold text-primary">124</p>
                <p className="text-xs text-success">+12% from last week</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-success">94.2%</p>
                <p className="text-xs text-success">+3.1% improvement</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Users Reached</p>
                <p className="text-2xl font-bold text-accent">2,847</p>
                <p className="text-xs text-success">+18% this month</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-warning">$4,892</p>
                <p className="text-xs text-success">+24% from last month</p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Prompt Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Marketing Prompts</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Code Generation</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Creative Writing</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Image Generation</span>
                <span className="text-sm font-medium">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-warning" />
              Top Performing Prompts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                { name: "Email Marketing Master", score: 98, category: "Marketing" },
                { name: "React Component Builder", score: 96, category: "Code" },
                { name: "SEO Blog Post Creator", score: 94, category: "Content" },
                { name: "Character Development", score: 93, category: "Creative" },
              ].map((prompt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{prompt.name}</p>
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      {prompt.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">{prompt.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New prompt generated", time: "2 minutes ago", type: "success" },
              { action: "Prompt sold in marketplace", time: "1 hour ago", type: "warning" },
              { action: "Analytics report updated", time: "3 hours ago", type: "info" },
              { action: "User feedback received", time: "5 hours ago", type: "success" },
              { action: "Performance milestone reached", time: "1 day ago", type: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-warning' :
                  'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};