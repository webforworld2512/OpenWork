import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ArrowLeft, MessageSquarePlus, User } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function DomainDetail() {
  const { domainId } = useParams();
  const { domains, projectsData, managersData } = useData();
  const navigate = useNavigate();

  const domain = domains.find(d => d.id === domainId);
  const domainProjects = projectsData.filter(p => p.domainId === domainId);
  const domainManagers = managersData.filter(m => m.domainId === domainId);

  if (!domain) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Domain not found.</p>
        <Button variant="ghost" onClick={() => navigate('/employee/domains')} className="mt-4 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Domains
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/employee/domains')} className="gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Domains
        </Button>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">{domain.name}</h1>
        <p className="text-base text-muted-foreground mt-2">{domain.description}</p>
      </motion.div>

      {/* Projects */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Projects</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {domainProjects.map((project, i) => {
            const manager = managersData.find(m => m.id === project.managerId);
            return (
              <motion.div key={project.id} initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}>
                <Card className="border border-border hover:shadow-elegant transition-shadow duration-300 h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-heading font-semibold text-foreground">{project.name}</h3>
                      <Badge variant="secondary" className="text-xs capitalize">{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                    {manager && (
                      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{manager.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{manager.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{manager.title}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Managers */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Managers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainManagers.map((manager) => (
            <Card key={manager.id} className="border border-border">
              <CardContent className="p-5 flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-sm bg-primary/10 text-primary font-semibold">{manager.avatar}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{manager.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{manager.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-heading font-semibold text-foreground">Ready to share your feedback?</h3>
              <p className="text-sm text-muted-foreground">Your response will be completely anonymous.</p>
            </div>
            <Button onClick={() => navigate('/employee/feedback')} className="gap-2 shrink-0">
              <MessageSquarePlus className="w-4 h-4" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
