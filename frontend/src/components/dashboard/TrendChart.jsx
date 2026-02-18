import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const chartColors = {
  communication: 'hsl(192, 72%, 32%)',
  clarity: 'hsl(152, 56%, 40%)',
  support: 'hsl(35, 90%, 52%)',
  fairness: 'hsl(262, 50%, 55%)',
  technicalGuidance: 'hsl(340, 65%, 55%)',
};

const categoryLabels = {
  communication: 'Communication',
  clarity: 'Clarity',
  support: 'Support',
  fairness: 'Fairness',
  technicalGuidance: 'Technical Guidance',
};

export const TrendChart = ({ data, title = 'Rating Trends Over Time' }) => {
  if (!data || data.length === 0) return null;

  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 88%)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: 'hsl(210, 10%, 45%)' }}
                axisLine={{ stroke: 'hsl(210, 15%, 88%)' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 5]}
                tick={{ fontSize: 12, fill: 'hsl(210, 10%, 45%)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid hsl(210, 15%, 88%)',
                  boxShadow: '0 4px 12px hsl(210, 25%, 10%, 0.08)',
                  fontSize: '13px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => categoryLabels[value] || value}
                wrapperStyle={{ fontSize: '12px' }}
              />
              {Object.entries(chartColors).map(([key, color]) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: color }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
