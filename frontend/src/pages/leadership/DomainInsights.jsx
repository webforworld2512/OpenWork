import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { TrendChart } from '../../components/dashboard/TrendChart';
import { RatingDistribution } from '../../components/dashboard/RatingDistribution';
import { ThresholdNotice } from '../../components/dashboard/ThresholdNotice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { MessageSquare, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function DomainInsights() {
  const { domains, managersData, getDomainFeedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const [domainId, setDomainId] = useState(domains[0]?.id || '');

  const domain = domains.find(d => d.id === domainId);
  const domainManagers = managersData.filter(m => m.domainId === domainId);

  const feedbackData = useMemo(() => {
    if (!domainId) return [];
    return getDomainFeedback(domainId);
  }, [domainId, getDomainFeedback]);

  const agg = useMemo(() => computeAggregation(feedbackData), [feedbackData, computeAggregation]);

  // Per-manager within domain
  const managerBreakdown = useMemo(() => {
    return domainManagers.map(m => {
      const mFeedback = feedbackData.filter(f => f.managerId === m.id);
      const mAgg = computeAggregation(mFeedback);
      return { ...m, count: mAgg.count, overallAvg: mAgg.overallAvg, meetsThreshold: mAgg.meetsThreshold };
    });
  }, [domainManagers, feedbackData, computeAggregation]);

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Domain Insights</h1>
          <p className="text-base text-muted-foreground mt-1">Aggregated feedback across an entire domain.</p>
        </div>
        <Select value={domainId} onValueChange={setDomainId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a domain" />
          </SelectTrigger>
          <SelectContent>
            {domains.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </motion.div>

      {domain && (
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="p-4 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-heading font-semibold text-foreground">{domain.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{domain.description}</p>
        </motion.div>
      )}

      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard label="Responses" value={agg.count} subtext="submissions" icon={MessageSquare} />
          <MetricCard label="Overall Rating" value={agg.meetsThreshold ? agg.overallAvg : '—'} subtext={agg.meetsThreshold ? 'out of 5.0' : 'Below threshold'} icon={Star} />
          <MetricCard label="Managers" value={domainManagers.length} subtext="in domain" icon={Users} />
        </div>
      </motion.div>

      {!agg.meetsThreshold ? (
        <ThresholdNotice count={agg.count} threshold={ANONYMITY_THRESHOLD} />
      ) : (
        <Tabs defaultValue="ratings" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="managers">Managers</TabsTrigger>
          </TabsList>

          <TabsContent value="ratings" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['communication', 'clarity', 'support', 'fairness', 'technicalGuidance'].map(cat => (
                <RatingDistribution key={cat} distributions={agg.distributions} category={cat} totalCount={agg.count} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <TrendChart data={agg.trends} title={`Rating Trends for ${domain?.name}`} />
          </TabsContent>

          <TabsContent value="managers" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {managerBreakdown.map(m => (
                <Card key={m.id} className="border border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm bg-primary/10 text-primary font-semibold">{m.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{m.title}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">{m.count} responses</Badge>
                    </div>
                    {m.meetsThreshold ? (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-lg font-heading font-bold text-foreground">{m.overallAvg}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Below anonymity threshold</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
