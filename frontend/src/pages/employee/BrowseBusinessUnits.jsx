import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowRight, Code, Users, Calculator, Handshake, Megaphone, Settings, Palette, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { code: Code, users: Users, calculator: Calculator, handshake: Handshake, megaphone: Megaphone, settings: Settings, palette: Palette, brain: Brain };

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function BrowseBusinessUnits() {
  const { businessUnits, initiativesData, managersData } = useData();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">Business Units</h1>
        <p className="text-base text-muted-foreground">Explore departments, their initiatives, and managers.</p>
      </motion.div>

      <div className="grid gap-4">
        {businessUnits.map((unit, i) => {
          const unitInitiatives = initiativesData.filter(p => p.businessUnitId === unit.id);
          const unitManagers = managersData.filter(m => m.businessUnitId === unit.id);
          const Icon = iconMap[unit.icon] || Code;

          return (
            <motion.div key={unit.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card
                className="border border-border hover:shadow-elegant hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/employee/business-units/${unit.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-heading font-semibold text-foreground">{unit.name}</h3>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{unit.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{unitInitiatives.length} initiative{unitInitiatives.length !== 1 ? 's' : ''}</Badge>
                        <Badge variant="secondary" className="text-xs">{unitManagers.length} manager{unitManagers.length !== 1 ? 's' : ''}</Badge>
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
