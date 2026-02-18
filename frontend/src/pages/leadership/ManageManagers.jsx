import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Plus, Pencil, Trash2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function ManageManagers() {
  const { domains, managersData, addManager, updateManager, deleteManager } = useData();
  const [editingManager, setEditingManager] = useState(null);
  const [formData, setFormData] = useState({ name: '', title: '', domainId: '', avatar: '' });
  const [isOpen, setIsOpen] = useState(false);

  const openCreate = () => {
    setEditingManager(null);
    setFormData({ name: '', title: '', domainId: '', avatar: '' });
    setIsOpen(true);
  };

  const openEdit = (manager) => {
    setEditingManager(manager);
    setFormData({ name: manager.name, title: manager.title, domainId: manager.domainId, avatar: manager.avatar });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.domainId) { toast.error('Name and domain are required.'); return; }
    const avatar = formData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    if (editingManager) {
      updateManager(editingManager.id, { ...formData, avatar });
      toast.success('Manager updated.');
    } else {
      addManager({ ...formData, avatar });
      toast.success('Manager created.');
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    deleteManager(id);
    toast.success('Manager deleted.');
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manage Managers</h1>
          <p className="text-base text-muted-foreground mt-1">Add and manage managers in the organization.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="w-4 h-4" /> Add Manager
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">{editingManager ? 'Edit Manager' : 'Add Manager'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g., John Smith" />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Engineering Manager" />
              </div>
              <div className="space-y-2">
                <Label>Domain</Label>
                <Select value={formData.domainId} onValueChange={(v) => setFormData(p => ({ ...p, domainId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select domain" /></SelectTrigger>
                  <SelectContent>
                    {domains.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editingManager ? 'Save Changes' : 'Create Manager'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {managersData.map((manager, i) => {
          const domain = domains.find(d => d.id === manager.domainId);
          return (
            <motion.div key={manager.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm bg-primary/10 text-primary font-semibold">{manager.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">{manager.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{manager.title}</p>
                        <Badge variant="secondary" className="text-[10px] mt-1">{domain?.name || 'Unknown'}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(manager)} className="h-8 w-8">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(manager.id)} className="h-8 w-8 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
