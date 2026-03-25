import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Plus, Pencil, Trash2, FolderKanban } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function ManageInitiatives() {
  const { businessUnits, initiativesData, managersData, addInitiative, updateInitiative, deleteInitiative } = useData();
  const [editingInit, setEditingInit] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', businessUnitId: '', managerId: '', status: 'active' });
  const [isOpen, setIsOpen] = useState(false);

  const openCreate = () => {
    setEditingInit(null);
    setFormData({ name: '', description: '', businessUnitId: '', managerId: '', status: 'active' });
    setIsOpen(true);
  };

  const openEdit = (init) => {
    setEditingInit(init);
    setFormData({ name: init.name, description: init.description, businessUnitId: init.businessUnitId, managerId: init.managerId, status: init.status });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.businessUnitId) { toast.error('Name and business unit are required.'); return; }
    if (editingInit) {
      updateInitiative(editingInit.id, formData);
      toast.success('Initiative updated.');
    } else {
      addInitiative(formData);
      toast.success('Initiative created.');
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manage Initiatives</h1>
          <p className="text-base text-muted-foreground mt-1">Create and manage major initiatives across business units.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="w-4 h-4" /> Add Initiative
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">{editingInit ? 'Edit Initiative' : 'Add Initiative'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Digital Transformation" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Business Unit</Label>
                <Select value={formData.businessUnitId} onValueChange={(v) => setFormData(p => ({ ...p, businessUnitId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select business unit" /></SelectTrigger>
                  <SelectContent>
                    {businessUnits.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Manager</Label>
                <Select value={formData.managerId} onValueChange={(v) => setFormData(p => ({ ...p, managerId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                  <SelectContent>
                    {managersData.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editingInit ? 'Save Changes' : 'Create Initiative'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {initiativesData.map((init, i) => {
          const unit = businessUnits.find(d => d.id === init.businessUnitId);
          const manager = managersData.find(m => m.id === init.managerId);
          return (
            <motion.div key={init.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <FolderKanban className="w-5 h-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-heading font-semibold text-foreground">{init.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{init.description}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{unit?.name || 'Unknown'}</Badge>
                          {manager && (
                            <div className="flex items-center gap-1.5">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{manager.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{manager.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(init)} className="h-8 w-8">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteInitiative(init.id) || toast.success('Initiative deleted.')} className="h-8 w-8 hover:text-destructive">
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
