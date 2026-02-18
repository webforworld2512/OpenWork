import { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { TrendChart } from '../../components/dashboard/TrendChart';
import { RatingDistribution } from '../../components/dashboard/RatingDistribution';
import { ThresholdNotice } from '../../components/dashboard/ThresholdNotice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { MessageSquare, Users, Star, TrendingUp, BarChart3, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function LeadershipDashboard() {
  const { domains, managersData, feedback, computeAggregation, ANONYMITY_THRESHOLD } = useData();
  const [domainFilter, setDomainFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const filteredFeedback = useMemo(() => {
    let filtered = [...feedback];
    if (domainFilter !== 'all') filtered = filtered.filter(f => f.domainId === domainFilter);
    if (timeFilter !== 'all') {
      const now = new Date();
      let cutoff;
      if (timeFilter === '30') cutoff = new Date(now.setDate(now.getDate() - 30));
      else if (timeFilter === '90') cutoff = new Date(now.setDate(now.getDate() - 90));
      else if (timeFilter === '180') cutoff = new Date(now.setDate(now.getDate() - 180));
      if (cutoff) filtered = filtered.filter(f => new Date(f.submittedAt) >= cutoff);
    }
    return filtered;
  }, [feedback, domainFilter, timeFilter]);

  const agg = useMemo(() => computeAggregation(filteredFeedback), [filteredFeedback, computeAggregation]);

  // Per-domain breakdown
  const domainBreakdown = useMemo(() => {
    return domains.map(d => {
      const domFeedback = filteredFeedback.filter(f => f.domainId === d.id);
      const domAgg = computeAggregation(domFeedback);
      return { ...d, count: domAgg.count, overallAvg: domAgg.overallAvg, meetsThreshold: domAgg.meetsThreshold };
    });
  }, [domains, filteredFeedback, computeAggregation]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Leadership Dashboard</h1>
          <p className="text-base text-muted-foreground mt-1">Aggregated feedback insights across your organization.</p>
        </div>
        <div className="flex gap-2">
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {domains.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="180">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Responses"
            value={agg.count}
            subtext="feedback submissions"
            trend="up"
            icon={MessageSquare}
          />
          <MetricCard
            label="Overall Rating"
            value={agg.meetsThreshold ? agg.overallAvg : '—'}
            subtext={agg.meetsThreshold ? 'out of 5.0' : 'Below threshold'}
            trend={agg.meetsThreshold ? 'up' : null}
            icon={Star}
          />
          <MetricCard
            label="Managers"
            value={managersData.length}
            subtext="being evaluated"
            icon={Users}
          />
          <MetricCard
            label="Domains"
            value={domains.length}
            subtext="departments"
            icon={Building2}
          />
        </div>
      </motion.div>

      {!agg.meetsThreshold ? (
        <ThresholdNotice count={agg.count} threshold={ANONYMITY_THRESHOLD} />
      ) : (
        <>
          {/* Trend Chart */}
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <TrendChart data={agg.trends} />
          </motion.div>

          {/* Rating Distributions */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <Tabs defaultValue="communication">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">Rating Distributions</h2>
              </div>
              <TabsList className="mb-4 bg-muted/50 p-1">
                <TabsTrigger value="communication" className="text-xs">Communication</TabsTrigger>
                <TabsTrigger value="clarity" className="text-xs">Clarity</TabsTrigger>
                <TabsTrigger value="support" className="text-xs">Support</TabsTrigger>
                <TabsTrigger value="fairness" className="text-xs">Fairness</TabsTrigger>
                <TabsTrigger value="technicalGuidance" className="text-xs">Technical</TabsTrigger>
              </TabsList>
              {['communication', 'clarity', 'support', 'fairness', 'technicalGuidance'].map(cat => (
                <TabsContent key={cat} value={cat}>
                  <RatingDistribution distributions={agg.distributions} category={cat} totalCount={agg.count} />
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Domain Breakdown */}
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-foreground">Domain Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {domainBreakdown.map(d => (
                <Card key={d.id} className="border border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-heading font-semibold text-foreground">{d.name}</h3>
                      <Badge variant={d.meetsThreshold ? 'secondary' : 'outline'} className="text-xs">
                        {d.count} responses
                      </Badge>
                    </div>
                    {d.meetsThreshold ? (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-lg font-heading font-bold text-foreground">{d.overallAvg}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Below anonymity threshold</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
