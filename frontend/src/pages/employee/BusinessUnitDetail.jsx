import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function BusinessUnitDetail() {
  const { unitId } = useParams();
  const { businessUnits, initiativesData, managersData } = useData();
  const navigate = useNavigate();

  const unit = businessUnits.find(d => d.id === unitId);
  const unitInitiatives = initiativesData.filter(p => p.businessUnitId === unitId);
  const unitManagers = managersData.filter(m => m.businessUnitId === unitId);

  if (!unit) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Business unit not found.</p>
        <Button variant="ghost" onClick={() => navigate('/employee/business-units')} className="mt-4 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Business Units
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/employee/business-units')} className="gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Business Units
        </Button>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">{unit.name}</h1>
        <p className="text-base text-muted-foreground mt-2">{unit.description}</p>
      </motion.div>

      {/* Initiatives */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Major Initiatives</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {unitInitiatives.map((initiative, i) => {
            const manager = managersData.find(m => m.id === initiative.managerId);
            return (
              <motion.div key={initiative.id} initial="hidden" animate="visible" custom={i + 1} variants={fadeUp}>
                <Card className="border border-border hover:shadow-elegant transition-shadow duration-300 h-full">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-heading font-semibold text-foreground">{initiative.name}</h3>
                      <Badge variant="secondary" className="text-xs capitalize">{initiative.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{initiative.description}</p>
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
          {unitManagers.map((manager) => (
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
