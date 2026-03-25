import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { Skeleton } from '../../components/ui/skeleton';
import { TrendChart } from '../../components/dashboard/TrendChart';
import { RatingDistribution } from '../../components/dashboard/RatingDistribution';
import { ThresholdNotice } from '../../components/dashboard/ThresholdNotice';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { aiSummaries, defaultAiSummary } from '../../data/seedData';
import {
  Sparkles, CheckCircle, AlertTriangle, Target, Info,
  MessageSquare, Star, TrendingUp, Brain, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function MyInsights() {
  const { user } = useAuth();
  const { managersData, businessUnits, getManagerFeedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const manager = managersData.find(m => m.id === user?.managerId);
  const unit = businessUnits.find(d => d.id === manager?.businessUnitId);

  const feedbackData = useMemo(() => {
    if (!user?.managerId) return [];
    return getManagerFeedback(user.managerId);
  }, [user?.managerId, getManagerFeedback]);

  const agg = useMemo(() => computeAggregation(feedbackData), [feedbackData, computeAggregation]);
  const summary = aiSummaries[user?.managerId] || defaultAiSummary;

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 2200);
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-3xl font-heading font-bold text-foreground">My Development Insights</h1>
        <p className="text-base text-muted-foreground mt-1">
          AI-powered insights based on anonymous, aggregated team feedback.
        </p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard label="Responses" value={agg.count} subtext="anonymous submissions" icon={MessageSquare} />
          <MetricCard label="Overall Score" value={agg.meetsThreshold ? agg.overallAvg : '—'} subtext={agg.meetsThreshold ? 'out of 5.0' : 'Below threshold'} icon={Star} />
          <MetricCard label="Status" value={agg.meetsThreshold ? 'Insights Ready' : 'Pending'} subtext={agg.meetsThreshold ? 'Threshold met' : `Need ${ANONYMITY_THRESHOLD - agg.count} more`} icon={TrendingUp} trend={agg.meetsThreshold ? 'up' : null} />
        </div>
      </motion.div>

      {!agg.meetsThreshold ? (
        <ThresholdNotice count={agg.count} threshold={ANONYMITY_THRESHOLD} />
      ) : (
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="ratings">My Ratings</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {!generated && !loading ? (
              <Card className="border border-border">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-heading font-semibold text-foreground">Generate Your Development Insights</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Generate an AI-powered development summary, strengths analysis, behavioral insights, and personalized improvement recommendations.
                    </p>
                  </div>
                  <Button onClick={handleGenerate} className="gap-2">
                    <Sparkles className="w-4 h-4" /> Generate My Insights
                  </Button>
                </CardContent>
              </Card>
            ) : loading ? (
              <Card className="border border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse-soft" />
                    <CardTitle className="text-base font-heading">Analyzing aggregated feedback...</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Development Summary */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base font-heading">Development Summary</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {summary.developmentSummary.map((point, i) => (
                      <p key={i} className="text-sm text-foreground leading-relaxed">{point}</p>
                    ))}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <CardTitle className="text-base font-heading">Your Strengths</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {summary.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          <span className="text-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvement Areas */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent" />
                      <CardTitle className="text-base font-heading">Growth Opportunities</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {summary.improvementAreas.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Target className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span className="text-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Behavioral Insights */}
                {summary.behavioralInsights && (
                  <Card className="border border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        <CardTitle className="text-base font-heading">Behavioral Insights</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {summary.behavioralInsights.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <Brain className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-foreground">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Recommended Actions */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base font-heading">Recommended Actions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {summary.recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/50 border border-border">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold">Disclaimer:</span> These AI-generated insights are developmental coaching guidance based on {agg.count} anonymous responses. No individual identities were used or inferred. This is not a performance evaluation — it's a tool to support your continuous growth as a leader.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ratings" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['communication', 'clarity', 'support', 'fairness', 'technicalGuidance'].map(cat => (
                <RatingDistribution key={cat} distributions={agg.distributions} category={cat} totalCount={agg.count} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <TrendChart data={agg.trends} title="My Rating Trends Over Time" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
