import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { aiSummaries, defaultAiSummary } from '../../data/seedData';
import {
  Sparkles, CheckCircle, Target, Info,
  Brain, Shield, ShieldAlert, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function MyInsights() {
  const { user } = useAuth();
  const { getManagerFeedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

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
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-3xl font-heading font-bold text-foreground">My Development Insights</h1>
        <p className="text-base text-muted-foreground mt-1">
          AI-powered coaching insights drawn from anonymous, aggregated team feedback.
        </p>
      </motion.div>

      {/* Threshold guard — no counts shown to manager */}
      {!agg.meetsThreshold ? (
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <Card className="border border-border bg-muted/50">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <ShieldAlert className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Insights Not Yet Available
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  To protect the anonymity of your team members, development insights are only generated once a sufficient number of responses have been collected. Please check back later as more feedback comes in.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : !generated && !loading ? (
        /* Generate prompt */
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <Card className="border border-border">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-heading font-semibold text-foreground">Generate Your Development Insights</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Discover your leadership strengths, growth opportunities, and behavioral patterns — all derived from aggregated anonymous feedback. No individual responses or scores are revealed.
                </p>
              </div>
              <Button onClick={handleGenerate} className="gap-2">
                <Sparkles className="w-4 h-4" /> Generate My Insights
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : loading ? (
        /* Loading state */
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
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
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Generated Insights — purely qualitative, no numbers */
        <div className="space-y-6">
          {/* Development Summary */}
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
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
          </motion.div>

          {/* Strengths */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <CardTitle className="text-base font-heading">Your Key Strengths</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground mt-1">What your team values most about your leadership.</p>
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
          </motion.div>

          {/* Growth Opportunities */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <CardTitle className="text-base font-heading">Growth Opportunities</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Areas where focused attention could elevate your effectiveness.</p>
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
          </motion.div>

          {/* Behavioral Insights */}
          {summary.behavioralInsights && (
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base font-heading">Behavioral Insights</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Patterns in how your leadership style is experienced by your team.</p>
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
            </motion.div>
          )}

          {/* Recommended Actions */}
          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-success" />
                  <CardTitle className="text-base font-heading">Recommended Next Steps</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Actionable steps to continue building on your leadership strengths.</p>
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
          </motion.div>

          {/* Disclaimer */}
          <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp}>
            <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/50 border border-border">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> These insights are AI-generated developmental coaching guidance based on aggregated anonymous feedback. No individual identities were used or inferred. No numerical scores, ratings, or response counts are shown. This is not a performance evaluation — it's a tool to support your continuous growth as a leader. We encourage you to discuss these insights with your own manager or a trusted mentor.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
