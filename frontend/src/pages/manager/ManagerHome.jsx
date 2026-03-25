import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowRight, Sparkles, GraduationCap, Shield, Heart, Leaf, BookOpen } from 'lucide-react';
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
      {/* Greeting */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Welcome, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-base text-muted-foreground">
          Your personal leadership growth space. All insights are based on aggregated, anonymous feedback.
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
                  OpenWork is designed to help you grow as a leader. The insights here are drawn from anonymous, aggregated feedback from your team — framed as developmental coaching, not evaluation. Think of this as a mirror that shows your strengths and opportunities for continuous improvement. No scores, ratings, or individual responses are shown — only qualitative guidance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Role & Context info — non-numeric */}
      {manager && (
        <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          <Card className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {manager.avatar}
                </div>
                <div>
                  <p className="text-base font-heading font-semibold text-foreground">{manager.name}</p>
                  <p className="text-sm text-muted-foreground">{manager.title}{unit ? ` · ${unit.name}` : ''}</p>
                </div>
                <div className="ml-auto">
                  <Badge variant={agg.meetsThreshold ? 'secondary' : 'outline'} className="text-xs">
                    {agg.meetsThreshold ? 'Insights Available' : 'Collecting Feedback'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
              <p className="text-sm text-muted-foreground mb-4">Discover your key strengths, growth opportunities, and behavioral patterns identified from aggregated team feedback.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs gap-1">
                  <Leaf className="w-3 h-3" />
                  Growth & Development
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
              <p className="text-sm text-muted-foreground mb-4">Follow a personalized 30-60-90 day leadership improvement plan with curated learning resources and action items.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs gap-1">
                  <BookOpen className="w-3 h-3" />
                  Coaching & Resources
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* What to expect */}
      <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
        <Card className="border border-border">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-heading font-semibold text-foreground">What You'll Find Here</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Development Summary', description: 'An overview of your leadership profile based on collective team feedback.' },
                { label: 'Key Strengths', description: 'What your team values most about your leadership style and approach.' },
                { label: 'Growth Opportunities', description: 'Areas where focused attention could elevate your effectiveness.' },
                { label: 'Behavioral Insights', description: 'Patterns in how your leadership style is experienced by your team.' },
                { label: 'Improvement Plan', description: 'A structured 30-60-90 day roadmap for continuous development.' },
                { label: 'Learning Resources', description: 'Curated books, courses, and workshops tailored to your growth areas.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy notice */}
      <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp}>
        <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50 border border-border">
          <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Privacy First:</span> All insights are based on aggregated anonymous feedback. Individual responses, numerical ratings, scores, and trends are never shown. A minimum response threshold is enforced before any insights appear.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
