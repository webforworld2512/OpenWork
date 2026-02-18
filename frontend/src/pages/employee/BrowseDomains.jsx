import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowRight, Code, Layout, Palette, Megaphone, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { code: Code, layout: Layout, palette: Palette, megaphone: Megaphone, brain: Brain };

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function BrowseDomains() {
  const { domains, projectsData, managersData } = useData();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">Domains</h1>
        <p className="text-base text-muted-foreground">Explore departments, their projects, and managers.</p>
      </motion.div>

      <div className="grid gap-4">
        {domains.map((domain, i) => {
          const domainProjects = projectsData.filter(p => p.domainId === domain.id);
          const domainManagers = managersData.filter(m => m.domainId === domain.id);
          const Icon = iconMap[domain.icon] || Code;

          return (
            <motion.div key={domain.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card
                className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/employee/domains/${domain.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-heading font-semibold text-foreground">{domain.name}</h3>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{domain.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{domainProjects.length} project{domainProjects.length !== 1 ? 's' : ''}</Badge>
                        <Badge variant="secondary" className="text-xs">{domainManagers.length} manager{domainManagers.length !== 1 ? 's' : ''}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
