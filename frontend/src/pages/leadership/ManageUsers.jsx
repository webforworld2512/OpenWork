import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { UserCog, Shield, User } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function ManageUsers() {
  const { usersData, updateUserRole } = useData();

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole);
    toast.success('Role updated successfully.');
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-3xl font-heading font-bold text-foreground">Manage Users</h1>
        <p className="text-base text-muted-foreground mt-1">Assign roles and manage user access.</p>
      </motion.div>

      <div className="grid gap-4">
        {usersData.map((user, i) => (
          <motion.div key={user.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
            <Card className="border border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-sm bg-primary/10 text-primary font-semibold">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">{user.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={user.role === 'leadership' ? 'default' : 'secondary'} className="text-xs gap-1">
                      {user.role === 'leadership' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {user.role}
                    </Badge>
                    <Select value={user.role} onValueChange={(v) => handleRoleChange(user.id, v)}>
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
