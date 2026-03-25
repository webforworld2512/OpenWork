import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../context/AuthContext';
import {
  Layers, ArrowRight, Lock, BarChart3, Sparkles,
  Users, Eye, ChevronRight, MessageSquare, TrendingUp,
  Shield, GraduationCap, Heart, CheckCircle, UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const roles = [
  {
    icon: Users,
    title: 'Employees',
    subtitle: 'Share your experience',
    description: 'Submit honest, anonymous feedback about your manager and business unit. Your identity is never stored with your responses.',
    points: ['Rate managers on key leadership dimensions', 'Share what\'s working well and best practices', 'Suggest improvements and ideas', 'Complete in under 5 minutes'],
    color: 'primary',
  },
  {
    icon: BarChart3,
    title: 'Leadership',
    subtitle: 'View aggregated insights',
    description: 'Access organizational dashboards showing aggregated feedback trends, AI-generated summaries, and development recommendations.',
    points: ['View aggregated ratings and trends', 'See AI-generated development summaries', 'Track improvement over time', 'Manage business units and initiatives'],
    color: 'accent',
  },
  {
    icon: GraduationCap,
    title: 'Managers',
    subtitle: 'Grow as a leader',
    description: 'Receive personalized development insights based on anonymous, aggregated team feedback. Framed as a growth tool, not evaluation.',
    points: ['Review your development summary', 'Discover strengths to build on', 'Get personalized learning resources', 'Follow a 30-60-90 day growth plan'],
    color: 'success',
  },
];

const benefits = [
  { icon: Lock, title: 'True Anonymity', description: 'Feedback is never linked to your identity. Employee identifiers are stripped before storage.' },
  { icon: Shield, title: 'Anonymity Threshold', description: 'Insights only appear when enough responses are collected, making it impossible to identify anyone.' },
  { icon: Heart, title: 'Growth-Focused', description: 'All insights are framed as developmental coaching — emphasizing best practices and continuous improvement.' },
  { icon: Sparkles, title: 'AI-Powered Plans', description: 'AI generates actionable development summaries and leadership improvement plans from collective feedback.' },
  { icon: TrendingUp, title: 'Track Progress', description: 'See how leadership effectiveness evolves over time through monthly and quarterly trend analysis.' },
  { icon: UserCheck, title: 'Best Practice Sharing', description: 'Identify what\'s working well across teams and share successful leadership practices organization-wide.' },
];

const steps = [
  { num: '1', title: 'Share Anonymously', description: 'Employees rate their manager on communication, clarity, support, fairness, and guidance. Add comments about what\'s working and what could improve.' },
  { num: '2', title: 'Feedback Aggregates', description: 'Individual responses are combined into anonymous aggregate metrics. No single response can be identified or traced back.' },
  { num: '3', title: 'AI Analyzes Patterns', description: 'AI processes the aggregated data to surface themes, strengths, and development opportunities — with built-in privacy guardrails.' },
  { num: '4', title: 'Leaders Develop', description: 'Managers receive growth-focused insights. Leadership gets organizational visibility. Everyone benefits from better leadership.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === 'leadership') navigate('/admin');
      else if (user.role === 'manager') navigate('/my-growth');
      else navigate('/employee');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-semibold text-foreground tracking-tight">OpenWork</span>
          </div>
          <Button onClick={handleGetStarted} size="sm" className="gap-2">
            {user ? 'Go to Dashboard' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-6"
            >
              <Badge variant="secondary" className="text-xs font-medium px-3 py-1 gap-1.5">
                <Eye className="w-3 h-3" />
                Internal Feedback Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Better Leadership
                <span className="block text-gradient-primary">Starts With Honest Feedback</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                OpenWork helps our organization grow by collecting anonymous, structured feedback and turning it into actionable leadership development plans — powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleGetStarted} className="gap-2 text-base px-8">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="gap-2 text-base">
                  How It Works
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=500&fit=crop&q=80"
                  alt="Professional team collaboration"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 glass rounded-xl p-4 shadow-elegant animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">100% Anonymous</p>
                    <p className="text-xs text-muted-foreground">Your identity is never stored</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Roles */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-12 space-y-3"
          >
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">Three Roles</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              How OpenWork Works For You
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Every role contributes to and benefits from a culture of continuous improvement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Card className="h-full border border-border hover:shadow-elegant transition-shadow duration-300">
                    <CardContent className="p-6 space-y-4 flex flex-col h-full">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          role.color === 'primary' ? 'bg-primary/10' : role.color === 'accent' ? 'bg-accent/10' : 'bg-success/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            role.color === 'primary' ? 'text-primary' : role.color === 'accent' ? 'text-accent' : 'text-success'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-base font-heading font-semibold text-foreground">{role.title}</h3>
                          <p className="text-xs text-muted-foreground">{role.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                      <ul className="space-y-2 mt-auto pt-3">
                        {role.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${
                              role.color === 'primary' ? 'text-primary' : role.color === 'accent' ? 'text-accent' : 'text-success'
                            }`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-12 space-y-3"
          >
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">The Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              From Feedback to Growth
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple four-step process that transforms anonymous feedback into meaningful leadership development.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                variants={fadeUp}
              >
                <Card className="h-full border border-border">
                  <CardContent className="p-6 space-y-3">
                    <span className="text-4xl font-heading font-bold text-primary/10">{step.num}</span>
                    <h3 className="text-base font-heading font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / Privacy */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-12 space-y-3"
          >
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">Privacy & Benefits</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Built On Trust & Growth
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to protect your anonymity while driving real leadership improvement.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Card className="h-full border border-border hover:shadow-elegant transition-shadow duration-300 group">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-base font-heading font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="border border-border overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center space-y-5">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                  Whether you're sharing feedback, reviewing insights, or building your leadership skills — OpenWork helps everyone grow.
                </p>
                <Button size="lg" onClick={handleGetStarted} className="gap-2 text-base px-8">
                  Sign In Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Demo: admin@openwork.io · employee@openwork.io · manager@openwork.io (any password)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
              <Layers className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-heading font-semibold text-foreground">OpenWork</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with privacy at its core. All feedback is anonymous and aggregated.
          </p>
        </div>
      </footer>
    </div>
  );
}
