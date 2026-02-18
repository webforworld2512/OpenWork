import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Shield, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(result.user.role === 'leadership' ? '/admin' : '/employee');
    } else {
      setError(result.error);
    }
  };

  const quickLogin = (email) => {
    setEmail(email);
    const result = login(email, 'demo');
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(result.user.role === 'leadership' ? '/admin' : '/employee');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Welcome to LeadLens</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue</p>
        </div>

        <Card className="border border-border shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-heading">Sign In</CardTitle>
            <CardDescription>Enter your email to access the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter any password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive p-3 rounded-lg bg-destructive/5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <Separator />

            <div className="space-y-2">
              <p className="text-xs text-center text-muted-foreground font-medium">Quick Demo Access</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('admin@leadlens.io')}
                  className="text-xs"
                >
                  Leadership Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('employee@leadlens.io')}
                  className="text-xs"
                >
                  Employee Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          This is a prototype. Authentication is mocked with localStorage.
        </p>
      </div>
    </div>
  );
}
