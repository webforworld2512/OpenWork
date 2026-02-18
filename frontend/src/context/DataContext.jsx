import { createContext, useContext, useState, useEffect } from 'react';
import { domains as seedDomains, managers as seedManagers, projects as seedProjects, generateFeedback, users as seedUsers, ANONYMITY_THRESHOLD } from '../data/seedData';

const DataContext = createContext(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }) => {
  const [domains, setDomains] = useState([]);
  const [managersData, setManagers] = useState([]);
  const [projectsData, setProjects] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    // Load from localStorage or seed
    const storedDomains = localStorage.getItem('ll_domains');
    const storedManagers = localStorage.getItem('ll_managers');
    const storedProjects = localStorage.getItem('ll_projects');
    const storedFeedback = localStorage.getItem('ll_feedback');
    const storedUsers = localStorage.getItem('ll_users');

    setDomains(storedDomains ? JSON.parse(storedDomains) : seedDomains);
    setManagers(storedManagers ? JSON.parse(storedManagers) : seedManagers);
    setProjects(storedProjects ? JSON.parse(storedProjects) : seedProjects);
    setFeedback(storedFeedback ? JSON.parse(storedFeedback) : generateFeedback());
    setUsers(storedUsers ? JSON.parse(storedUsers) : seedUsers);
  }, []);

  const persist = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Domain CRUD
  const addDomain = (domain) => {
    const newDomain = { ...domain, id: `d${Date.now()}` };
    const updated = [...domains, newDomain];
    setDomains(updated);
    persist('ll_domains', updated);
    return newDomain;
  };

  const updateDomain = (id, data) => {
    const updated = domains.map(d => d.id === id ? { ...d, ...data } : d);
    setDomains(updated);
    persist('ll_domains', updated);
  };

  const deleteDomain = (id) => {
    const updated = domains.filter(d => d.id !== id);
    setDomains(updated);
    persist('ll_domains', updated);
  };

  // Manager CRUD
  const addManager = (manager) => {
    const newManager = { ...manager, id: `m${Date.now()}` };
    const updated = [...managersData, newManager];
    setManagers(updated);
    persist('ll_managers', updated);
    return newManager;
  };

  const updateManager = (id, data) => {
    const updated = managersData.map(m => m.id === id ? { ...m, ...data } : m);
    setManagers(updated);
    persist('ll_managers', updated);
  };

  const deleteManager = (id) => {
    const updated = managersData.filter(m => m.id !== id);
    setManagers(updated);
    persist('ll_managers', updated);
  };

  // Project CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: `p${Date.now()}` };
    const updated = [...projectsData, newProject];
    setProjects(updated);
    persist('ll_projects', updated);
    return newProject;
  };

  const updateProject = (id, data) => {
    const updated = projectsData.map(p => p.id === id ? { ...p, ...data } : p);
    setProjects(updated);
    persist('ll_projects', updated);
  };

  const deleteProject = (id) => {
    const updated = projectsData.filter(p => p.id !== id);
    setProjects(updated);
    persist('ll_projects', updated);
  };

  // User CRUD
  const updateUserRole = (id, role) => {
    const updated = usersData.map(u => u.id === id ? { ...u, role } : u);
    setUsers(updated);
    persist('ll_users', updated);
  };

  // Feedback
  const submitFeedback = (fb) => {
    const newFb = { ...fb, id: `f${Date.now()}`, submittedAt: new Date().toISOString().slice(0, 10) };
    const updated = [...feedback, newFb];
    setFeedback(updated);
    persist('ll_feedback', updated);
    return newFb;
  };

  // Aggregations
  const getManagerFeedback = (managerId, dateRange) => {
    let filtered = feedback.filter(f => f.managerId === managerId);
    if (dateRange?.from) filtered = filtered.filter(f => f.submittedAt >= dateRange.from);
    if (dateRange?.to) filtered = filtered.filter(f => f.submittedAt <= dateRange.to);
    return filtered;
  };

  const getDomainFeedback = (domainId, dateRange) => {
    let filtered = feedback.filter(f => f.domainId === domainId);
    if (dateRange?.from) filtered = filtered.filter(f => f.submittedAt >= dateRange.from);
    if (dateRange?.to) filtered = filtered.filter(f => f.submittedAt <= dateRange.to);
    return filtered;
  };

  const computeAggregation = (feedbackArr) => {
    const count = feedbackArr.length;
    if (count < ANONYMITY_THRESHOLD) return { count, meetsThreshold: false };

    const categories = ['communication', 'clarity', 'support', 'fairness', 'technicalGuidance'];
    const averages = {};
    const distributions = {};

    categories.forEach(cat => {
      const vals = feedbackArr.map(f => f.ratings[cat]).filter(Boolean);
      averages[cat] = vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0;
      distributions[cat] = [1, 2, 3, 4, 5].map(r => ({
        rating: r,
        count: vals.filter(v => v === r).length,
      }));
    });

    const overallAvg = Object.values(averages).reduce((a, b) => Number(a) + Number(b), 0) / categories.length;

    // Monthly breakdown
    const monthlyData = {};
    feedbackArr.forEach(f => {
      const month = f.submittedAt.slice(0, 7);
      if (!monthlyData[month]) monthlyData[month] = [];
      monthlyData[month].push(f);
    });

    const trends = Object.entries(monthlyData).sort(([a], [b]) => a.localeCompare(b)).map(([month, items]) => {
      const avgRatings = {};
      categories.forEach(cat => {
        const vals = items.map(f => f.ratings[cat]).filter(Boolean);
        avgRatings[cat] = vals.length > 0 ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0;
      });
      return { month, count: items.length, ...avgRatings };
    });

    return { count, meetsThreshold: true, averages, distributions, overallAvg: overallAvg.toFixed(2), trends };
  };

  return (
    <DataContext.Provider value={{
      domains, managersData, projectsData, feedback, usersData,
      addDomain, updateDomain, deleteDomain,
      addManager, updateManager, deleteManager,
      addProject, updateProject, deleteProject,
      updateUserRole,
      submitFeedback,
      getManagerFeedback, getDomainFeedback, computeAggregation,
      ANONYMITY_THRESHOLD,
    }}>
      {children}
    </DataContext.Provider>
  );
};
