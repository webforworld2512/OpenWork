import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { MessageSquarePlus, FolderOpen, ArrowRight, Shield, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function EmployeeHome() {
  const { user } = useAuth();
  const { domains, projectsData } = useData();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-base text-muted-foreground">
          Your feedback is anonymous and helps build better leadership.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
          <Card className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => navigate('/employee/feedback')}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <MessageSquarePlus className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Submit Feedback</h3>
              <p className="text-sm text-muted-foreground mb-4">Share anonymous, structured feedback about your manager and project.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs gap-1">
                  <Lock className="w-3 h-3" />
                  100% Anonymous
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          <Card className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full"
                onClick={() => navigate('/employee/domains')}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                  <FolderOpen className="w-6 h-6 text-accent" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Browse Domains</h3>
              <p className="text-sm text-muted-foreground mb-4">Explore departments, projects, and their managers.</p>
              <div className="mt-auto">
                <Badge variant="secondary" className="text-xs">
                  {domains.length} Domains · {projectsData.length} Projects
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Privacy Info */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-heading font-semibold text-foreground">Your Privacy Matters</h3>
                <ul className="space-y-1.5">
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    Your identity is never linked to feedback submissions
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    Leadership only sees aggregated data, not individual responses
                  </li>
                  <li className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    Data is only shown when enough responses are collected
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Domains */}
      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-foreground">Departments</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/employee/domains')} className="gap-1 text-muted-foreground">
            View all <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.slice(0, 3).map((domain, i) => {
            const projectCount = projectsData.filter(p => p.domainId === domain.id).length;
            return (
              <Card
                key={domain.id}
                className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/employee/domains/${domain.id}`)}
              >
                <CardContent className="p-5">
                  <h3 className="text-base font-heading font-semibold text-foreground mb-1">{domain.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{domain.description}</p>
                  <Badge variant="secondary" className="text-xs">{projectCount} project{projectCount !== 1 ? 's' : ''}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
