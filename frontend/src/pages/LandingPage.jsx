import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../context/AuthContext';
import {
  Shield, ArrowRight, Lock, BarChart3, Sparkles,
  Users, Eye, ChevronRight, MessageSquare, TrendingUp, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const features = [
  {
    icon: Lock,
    title: 'True Anonymity',
    description: 'Feedback submissions never store employee identifiers. Your voice is heard without attribution.',
  },
  {
    icon: BarChart3,
    title: 'Aggregated Insights',
    description: 'Leadership sees only aggregated metrics and trends — never individual responses.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Plans',
    description: 'AI generates development summaries and 30-60-90 day improvement plans from collective feedback.',
  },
  {
    icon: Shield,
    title: 'Anonymity Threshold',
    description: 'Data is only shown when enough responses are collected, ensuring no one can be identified.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Strict separation between employee and leadership views with proper access controls.',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Track leadership effectiveness over time with monthly and quarterly trend visualizations.',
  },
];

const steps = [
  { num: '01', title: 'Submit Anonymously', description: 'Rate your manager on key dimensions and share honest, constructive feedback.' },
  { num: '02', title: 'Data Aggregates', description: 'Individual responses are combined into anonymous aggregate metrics and themes.' },
  { num: '03', title: 'AI Analyzes', description: 'AI processes aggregated feedback to surface patterns, strengths, and growth areas.' },
  { num: '04', title: 'Leaders Grow', description: 'Leadership reviews insights to create targeted development and improvement plans.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === 'leadership' ? '/admin' : '/employee');
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
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-semibold text-foreground tracking-tight">LeadLens</span>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-8"
            >
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs font-medium px-3 py-1 gap-1.5">
                  <Eye className="w-3 h-3" />
                  Anonymous Feedback Platform
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Build Better Leaders
                <span className="block text-gradient-primary">Through Honest Feedback</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                LeadLens empowers organizations with anonymous, structured feedback that transforms into actionable leadership development plans — powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleGetStarted} className="gap-2 text-base px-8">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="gap-2 text-base">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              {/* Social proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">Responses Collected</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Departments</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Anonymous</p>
                </div>
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
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-elegant animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">152 Responses</p>
                    <p className="text-xs text-muted-foreground">This quarter</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Privacy-First Feedback
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to protect anonymity while delivering actionable insights.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Card className="h-full border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 group">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-base font-heading font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              From Feedback to Growth
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple four-step process that turns anonymous feedback into leadership development.
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
                <Card className="h-full border border-border relative overflow-hidden">
                  <CardContent className="p-6 space-y-3 flex flex-col">
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

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card className="border border-border overflow-hidden">
              <CardContent className="p-8 md:p-12 lg:p-16 text-center space-y-6">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                  Ready to Transform Leadership?</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                  Start collecting anonymous feedback today and unlock AI-powered development insights for your managers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" onClick={handleGetStarted} className="gap-2 text-base px-8">
                    Get Started Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Demo credentials: admin@leadlens.io or employee@leadlens.io (any password)
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
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-heading font-semibold text-foreground">LeadLens</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with privacy at its core. All feedback is anonymous and aggregated.
          </p>
        </div>
      </footer>
    </div>
  );
}
