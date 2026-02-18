import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricCard = ({ label, value, subtext, trend, icon: Icon, color = 'primary' }) => {
  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="relative overflow-hidden border border-border hover:shadow-elegant transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-heading font-bold text-foreground animate-count-up">{value}</p>
            {subtext && (
              <div className="flex items-center gap-1.5">
                <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
                <span className={`text-xs font-medium ${trendColor}`}>{subtext}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
