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

export default function ManageProjects() {
  const { domains, projectsData, managersData, addProject, updateProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', domainId: '', managerId: '', status: 'active' });
  const [isOpen, setIsOpen] = useState(false);

  const openCreate = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '', domainId: '', managerId: '', status: 'active' });
    setIsOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setFormData({ name: project.name, description: project.description, domainId: project.domainId, managerId: project.managerId, status: project.status });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.domainId) { toast.error('Name and domain are required.'); return; }
    if (editingProject) {
      updateProject(editingProject.id, formData);
      toast.success('Project updated.');
    } else {
      addProject(formData);
      toast.success('Project created.');
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    deleteProject(id);
    toast.success('Project deleted.');
  };

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manage Projects</h1>
          <p className="text-base text-muted-foreground mt-1">Create and manage projects across domains.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Platform v3.0" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} />
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
              <Button onClick={handleSave}>{editingProject ? 'Save Changes' : 'Create Project'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid gap-4">
        {projectsData.map((project, i) => {
          const domain = domains.find(d => d.id === project.domainId);
          const manager = managersData.find(m => m.id === project.managerId);
          return (
            <motion.div key={project.id} initial="hidden" animate="visible" custom={i} variants={fadeUp}>
              <Card className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <FolderKanban className="w-5 h-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-heading font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{project.description}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{domain?.name || 'Unknown'}</Badge>
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
                      <Button variant="ghost" size="icon" onClick={() => openEdit(project)} className="h-8 w-8">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="h-8 w-8 hover:text-destructive">
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
