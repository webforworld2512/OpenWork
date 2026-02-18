import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function ManageDomains() {
  const { domains, projectsData, addDomain, updateDomain, deleteDomain } = useData();
  const [editingDomain, setEditingDomain] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: 'code', color: 'chart-1' });
  const [isOpen, setIsOpen] = useState(false);

  const openCreate = () => {
    setEditingDomain(null);
    setFormData({ name: '', description: '', icon: 'code', color: 'chart-1' });
    setIsOpen(true);
  };

  const openEdit = (domain) => {
    setEditingDomain(domain);
    setFormData({ name: domain.name, description: domain.description, icon: domain.icon || 'code', color: domain.color || 'chart-1' });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) { toast.error('Name is required.'); return; }
    if (editingDomain) {
      updateDomain(editingDomain.id, formData);
      toast.success('Domain updated.');
    } else {
      addDomain(formData);
      toast.success('Domain created.');
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    deleteDomain(id);
    toast.success('Domain deleted.');
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manage Domains</h1>
          <p className="text-base text-muted-foreground mt-1">Create, edit, and manage organizational domains.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="w-4 h-4" /> Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">{editingDomain ? 'Edit Domain' : 'Add Domain'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Engineering" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe this domain..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editingDomain ? 'Save Changes' : 'Create Domain'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {domains.map((domain, i) => {
          const projectCount = projectsData.filter(p => p.domainId === domain.id).length;
          return (
            <motion.div key={domain.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-heading font-semibold text-foreground">{domain.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{domain.description}</p>
                        <Badge variant="secondary" className="text-xs mt-2">{projectCount} project{projectCount !== 1 ? 's' : ''}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(domain)} className="h-8 w-8">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(domain.id)} className="h-8 w-8 hover:text-destructive">
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
