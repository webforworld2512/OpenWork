import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { ArrowRight, Sparkles, GraduationCap, TrendingUp, MessageSquare, Star, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function ManagerHome() {
  const { user } = useAuth();
  const { managersData, businessUnits, getManagerFeedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const navigate = useNavigate();

  const manager = managersData.find(m => m.id === user?.managerId);
  const unit = businessUnits.find(d => d.id === manager?.businessUnitId);

  const feedbackData = useMemo(() => {
    if (!user?.managerId) return [];
    return getManagerFeedback(user.managerId);
  }, [user?.managerId, getManagerFeedback]);

  const agg = useMemo(() => computeAggregation(feedbackData), [feedbackData, computeAggregation]);

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Welcome, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-base text-muted-foreground">
          Your personal leadership growth dashboard. All insights are aggregated and anonymous.
        </p>
      </motion.div>

      {/* Growth-focused banner */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-success" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-heading font-semibold text-foreground">This Is Your Growth Space</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  OpenWork is designed to help you grow as a leader. The insights here are based on anonymous, aggregated feedback from your team — framed as developmental coaching, not evaluation. Think of this as a mirror that shows your strengths and opportunities for continuous improvement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Team Responses"
            value={agg.count}
            subtext="anonymous submissions"
            icon={MessageSquare}
          />
          <MetricCard
            label="Overall Score"
            value={agg.meetsThreshold ? agg.overallAvg : '—'}
            subtext={agg.meetsThreshold ? 'out of 5.0' : `Need ${ANONYMITY_THRESHOLD} minimum`}
            trend={agg.meetsThreshold ? 'up' : null}
            icon={Star}
          />
          <MetricCard
            label="Business Unit"
            value={unit?.name || '—'}
            subtext={manager?.title || ''}
            icon={Shield}
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <Card className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => navigate('/my-growth/insights')}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">My Development Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">View AI-generated strengths, improvement areas, and behavioral insights based on aggregated team feedback.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs">
                  {agg.meetsThreshold ? 'Insights Available' : 'Pending Threshold'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
          <Card className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => navigate('/my-growth/learning')}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">My Learning Plan</h3>
              <p className="text-sm text-muted-foreground mb-4">Follow your personalized 30-60-90 day growth plan with recommended learning resources and action items.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs">
                  {agg.meetsThreshold ? 'Plan Ready' : 'Available After Threshold'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Privacy notice */}
      <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
        <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50 border border-border">
          <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Privacy First:</span> All insights shown here are based on aggregated anonymous feedback. Individual responses are never shown. A minimum of {ANONYMITY_THRESHOLD} responses are required before any data appears.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
