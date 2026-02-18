import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Star } from 'lucide-react';

export const RatingDistribution = ({ distributions, category, totalCount }) => {
  if (!distributions || !distributions[category]) return null;

  const data = distributions[category];
  const max = Math.max(...data.map(d => d.count), 1);

  const labels = {
    communication: 'Communication',
    clarity: 'Clarity',
    support: 'Support',
    fairness: 'Fairness',
    technicalGuidance: 'Technical Guidance',
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-heading font-semibold text-foreground">
          {labels[category] || category}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.slice().reverse().map(item => (
          <div key={item.rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12 shrink-0">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-sm font-medium text-foreground">{item.rating}</span>
            </div>
            <div className="flex-1">
              <Progress
                value={totalCount > 0 ? (item.count / totalCount) * 100 : 0}
                className="h-2.5"
              />
            </div>
            <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
