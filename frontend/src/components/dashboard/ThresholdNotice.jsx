import { Card, CardContent } from '../ui/card';
import { ShieldAlert } from 'lucide-react';

export const ThresholdNotice = ({ count, threshold }) => {
  return (
    <Card className="border border-border bg-muted/50">
      <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <ShieldAlert className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Not Enough Responses
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            To protect anonymity, insights are only displayed when at least{' '}
            <span className="font-semibold text-foreground">{threshold}</span> responses have been
            collected. Currently: <span className="font-semibold text-foreground">{count}</span>{' '}
            response{count !== 1 ? 's' : ''}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
