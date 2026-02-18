import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Sparkles, CheckCircle, AlertTriangle, Target, Calendar, Info } from 'lucide-react';
import { aiSummaries, defaultAiSummary } from '../../data/seedData';

export const AiInsightPanel = ({ managerId, meetsThreshold }) => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const summary = aiSummaries[managerId] || defaultAiSummary;

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2000);
  };

  if (!meetsThreshold) return null;

  if (!generated && !loading) {
    return (
      <Card className="border border-border">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              AI Development Insights
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Generate an AI-powered development summary, improvement plan, and actionable recommendations based on aggregated anonymous feedback.
            </p>
          </div>
          <Button onClick={handleGenerate} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Generate AI Summary
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-soft" />
            <CardTitle className="text-base font-heading">Generating AI Insights...</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-base font-heading">AI Development Insights</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {summary.confidence}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-lg mb-4">
            <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="strengths" className="text-xs">Strengths</TabsTrigger>
            <TabsTrigger value="improvements" className="text-xs">Improvements</TabsTrigger>
            <TabsTrigger value="plan" className="text-xs">30-60-90 Plan</TabsTrigger>
            <TabsTrigger value="risks" className="text-xs">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="space-y-3">
              {summary.developmentSummary.map((point, i) => (
                <p key={i} className="text-sm text-foreground leading-relaxed">{point}</p>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Recommended Actions
              </h4>
              <ul className="space-y-2">
                {summary.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="strengths">
            <ul className="space-y-3">
              {summary.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="improvements">
            <ul className="space-y-3">
              {summary.improvementAreas.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4">
            {[['30 Days', summary.plan30_60_90.days30], ['60 Days', summary.plan30_60_90.days60], ['90 Days', summary.plan30_60_90.days90]].map(([label, text]) => (
              <div key={label} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">{label}</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6 leading-relaxed">{text}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            <ul className="space-y-3">
              {summary.risks.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <span className="text-foreground">{r}</span>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> This AI-generated summary is intended as supportive developmental guidance only. It does not represent a definitive performance evaluation. No individual identities were used or inferred in generating these insights.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
