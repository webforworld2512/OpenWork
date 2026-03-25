import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { TrendChart } from '../../components/dashboard/TrendChart';
import { RatingDistribution } from '../../components/dashboard/RatingDistribution';
import { ThresholdNotice } from '../../components/dashboard/ThresholdNotice';
import { AiInsightPanel } from '../../components/dashboard/AiInsightPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { MessageSquare, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function ManagerInsights() {
  const { managersData, businessUnits, getManagerFeedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const [managerId, setManagerId] = useState(managersData[0]?.id || '');

  const manager = managersData.find(m => m.id === managerId);
  const unit = businessUnits.find(d => d.id === manager?.businessUnitId);

  const feedbackData = useMemo(() => {
    if (!managerId) return [];
    return getManagerFeedback(managerId);
  }, [managerId, getManagerFeedback]);

  const agg = useMemo(() => computeAggregation(feedbackData), [feedbackData, computeAggregation]);

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manager Insights</h1>
          <p className="text-base text-muted-foreground mt-1">View aggregated feedback and AI development plans.</p>
        </div>
        <Select value={managerId} onValueChange={setManagerId}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select a manager" />
          </SelectTrigger>
          <SelectContent>
            {managersData.map(m => (
              <SelectItem key={m.id} value={m.id}>{m.name} — {m.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {manager && (
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-base bg-primary/10 text-primary font-semibold">{manager.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">{manager.name}</h2>
            <p className="text-sm text-muted-foreground">{manager.title} · {unit?.name || 'Unknown'}</p>
          </div>
        </motion.div>
      )}

      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard label="Responses" value={agg.count} subtext="submissions" icon={MessageSquare} />
          <MetricCard label="Overall Rating" value={agg.meetsThreshold ? agg.overallAvg : '—'} subtext={agg.meetsThreshold ? 'out of 5.0' : 'Below threshold'} icon={Star} />
          <MetricCard label="Status" value={agg.meetsThreshold ? 'Active' : 'Pending'} subtext={agg.meetsThreshold ? 'Threshold met' : `Need ${ANONYMITY_THRESHOLD - agg.count} more`} icon={TrendingUp} trend={agg.meetsThreshold ? 'up' : null} />
        </div>
      </motion.div>

      {!agg.meetsThreshold ? (
        <ThresholdNotice count={agg.count} threshold={ANONYMITY_THRESHOLD} />
      ) : (
        <Tabs defaultValue="ratings" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="ratings" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['communication', 'clarity', 'support', 'fairness', 'technicalGuidance'].map(cat => (
                <RatingDistribution key={cat} distributions={agg.distributions} category={cat} totalCount={agg.count} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <TrendChart data={agg.trends} title={`Rating Trends for ${manager?.name}`} />
          </TabsContent>

          <TabsContent value="ai">
            <AiInsightPanel managerId={managerId} meetsThreshold={agg.meetsThreshold} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
