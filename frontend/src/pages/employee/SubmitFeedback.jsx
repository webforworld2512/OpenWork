import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Lock, Send, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ratingLabels = {
  communication: 'Communication',
  clarity: 'Clarity of Direction',
  support: 'Support & Guidance',
  fairness: 'Fairness',
  technicalGuidance: 'Technical Guidance',
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SubmitFeedback() {
  const { businessUnits, initiativesData, managersData, submitFeedback } = useData();
  const navigate = useNavigate();

  const [businessUnitId, setBusinessUnitId] = useState('');
  const [initiativeId, setInitiativeId] = useState('');
  const [managerId, setManagerId] = useState('');
  const [ratings, setRatings] = useState({
    communication: 0, clarity: 0, support: 0, fairness: 0, technicalGuidance: 0,
  });
  const [positiveComment, setPositiveComment] = useState('');
  const [improvementComment, setImprovementComment] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredInitiatives = businessUnitId ? initiativesData.filter(p => p.businessUnitId === businessUnitId) : [];
  const filteredManagers = businessUnitId ? managersData.filter(m => m.businessUnitId === businessUnitId) : managersData;

  const handleRating = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const isValid = businessUnitId && managerId && Object.values(ratings).every(r => r > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Please fill in all required fields and provide all ratings.');
      return;
    }
    submitFeedback({
      businessUnitId, initiativeId: initiativeId || null, managerId,
      ratings, positiveComment, improvementComment, suggestion,
    });
    setSubmitted(true);
    toast.success('Feedback submitted anonymously!');
  };

  if (submitted) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-lg mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-bold text-foreground">Thank You!</h1>
          <p className="text-muted-foreground">
            Your feedback has been submitted <span className="font-semibold text-foreground">completely anonymously</span>. No identifying information was stored with your response.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setSubmitted(false); setBusinessUnitId(''); setInitiativeId(''); setManagerId(''); setRatings({ communication: 0, clarity: 0, support: 0, fairness: 0, technicalGuidance: 0 }); setPositiveComment(''); setImprovementComment(''); setSuggestion(''); }} variant="outline" className="gap-2">
            Submit Another
          </Button>
          <Button onClick={() => navigate('/employee')} className="gap-2">
            Go Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/employee')} className="gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Submit Feedback</h1>
            <p className="text-base text-muted-foreground mt-1">Your feedback is completely anonymous.</p>
          </div>
          <Badge variant="secondary" className="gap-1 text-xs">
            <Lock className="w-3 h-3" />
            Anonymous
          </Badge>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selection */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">Context</CardTitle>
            <CardDescription>Select the business unit, initiative, and manager for your feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Business Unit <span className="text-destructive">*</span></Label>
              <Select value={businessUnitId} onValueChange={(v) => { setBusinessUnitId(v); setInitiativeId(''); setManagerId(''); }}>
                <SelectTrigger><SelectValue placeholder="Select a business unit" /></SelectTrigger>
                <SelectContent>
                  {businessUnits.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Initiative <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Select value={initiativeId} onValueChange={setInitiativeId} disabled={!businessUnitId}>
                <SelectTrigger><SelectValue placeholder="Select an initiative" /></SelectTrigger>
                <SelectContent>
                  {filteredInitiatives.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Manager <span className="text-destructive">*</span></Label>
              <Select value={managerId} onValueChange={setManagerId}>
                <SelectTrigger><SelectValue placeholder="Select a manager" /></SelectTrigger>
                <SelectContent>
                  {filteredManagers.map(m => <SelectItem key={m.id} value={m.id}>{m.name} — {m.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ratings */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">Ratings</CardTitle>
            <CardDescription>Rate your manager on each dimension (1-5).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {Object.entries(ratingLabels).map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm font-medium">{label} <span className="text-destructive">*</span></Label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleRating(key, val)}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors duration-150"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors duration-150 ${
                          val <= ratings[key] ? 'text-accent fill-accent' : 'text-muted-foreground/30'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground self-center">
                    {ratings[key] > 0 ? `${ratings[key]}/5` : ''}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">Comments</CardTitle>
            <CardDescription>Share your thoughts (optional but valuable).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">What's working well?</Label>
              <Textarea
                value={positiveComment}
                onChange={(e) => setPositiveComment(e.target.value)}
                placeholder="What does your manager do well? What best practices should they keep?"
                className="min-h-[80px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">What should improve?</Label>
              <Textarea
                value={improvementComment}
                onChange={(e) => setImprovementComment(e.target.value)}
                placeholder="What could your manager do better? What changes would help?"
                className="min-h-[80px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Suggestions / Requests</Label>
              <Textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Any specific suggestions, requests, or ideas?"
                className="min-h-[80px] resize-y"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            No identifying information will be stored
          </div>
          <Button type="submit" disabled={!isValid} className="gap-2">
            <Send className="w-4 h-4" />
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  );
}
