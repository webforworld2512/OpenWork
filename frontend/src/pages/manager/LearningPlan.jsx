import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { Skeleton } from '../../components/ui/skeleton';
import { ThresholdNotice } from '../../components/dashboard/ThresholdNotice';
import { aiSummaries, defaultAiSummary } from '../../data/seedData';
import {
  GraduationCap, Calendar, BookOpen, CheckCircle, Sparkles,
  ExternalLink, Info, Shield, Target, Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function LearningPlan() {
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
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1800);
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-3xl font-heading font-bold text-foreground">My Learning Plan</h1>
        <p className="text-base text-muted-foreground mt-1">
          A personalized growth roadmap based on aggregated feedback from your team.
        </p>
      </motion.div>

      {!agg.meetsThreshold ? (
        <ThresholdNotice count={agg.count} threshold={ANONYMITY_THRESHOLD} />
      ) : !generated && !loading ? (
        <Card className="border border-border">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-heading font-semibold text-foreground">Generate Your Learning Plan</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Create a personalized 30-60-90 day leadership improvement plan with curated learning resources based on your team's aggregated feedback.
              </p>
            </div>
            <Button onClick={handleGenerate} className="gap-2">
              <GraduationCap className="w-4 h-4" /> Generate Learning Plan
            </Button>
          </CardContent>
        </Card>
      ) : loading ? (
        <Card className="border border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent animate-pulse-soft" />
              <CardTitle className="text-base font-heading">Building your learning plan...</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* 30-60-90 Plan */}
          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base font-heading">30-60-90 Day Growth Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[['First 30 Days', summary.plan30_60_90.days30, 'primary'], ['Days 31–60', summary.plan30_60_90.days60, 'accent'], ['Days 61–90', summary.plan30_60_90.days90, 'success']].map(([label, text, color]) => (
                  <div key={label} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        color === 'primary' ? 'bg-primary' : color === 'accent' ? 'bg-accent' : 'bg-success'
                      }`} />
                      <h4 className="text-sm font-semibold text-foreground">{label}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4 leading-relaxed border-l-2 border-border ml-0.5">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Resources */}
          {summary.learningResources && (
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <CardTitle className="text-base font-heading">Recommended Learning Resources</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {summary.learningResources.map((resource, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.focus}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{resource.type}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Key Focus Areas */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <CardTitle className="text-base font-heading">Key Focus Areas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {summary.recommendedActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/50 border border-border">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">About this plan:</span> Your learning plan is AI-generated based on aggregated anonymous feedback. It's designed as a supportive growth tool — not a performance evaluation. No individual responses or identities are visible. We encourage you to discuss these insights with your own manager or a mentor.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
