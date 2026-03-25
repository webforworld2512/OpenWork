import { createContext, useContext, useState, useEffect } from 'react';
import { businessUnits as seedUnits, managers as seedManagers, initiatives as seedInitiatives, generateFeedback, users as seedUsers, ANONYMITY_THRESHOLD } from '../data/seedData';

const DataContext = createContext(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }) => {
  const [businessUnits, setBusinessUnits] = useState([]);
  const [managersData, setManagers] = useState([]);
  const [initiativesData, setInitiatives] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [usersData, setUsers] = useState([]);

  useEffect(() => {
    const storedUnits = localStorage.getItem('ow_businessUnits');
    const storedManagers = localStorage.getItem('ow_managers');
    const storedInitiatives = localStorage.getItem('ow_initiatives');
    const storedFeedback = localStorage.getItem('ow_feedback');
    const storedUsers = localStorage.getItem('ow_users');

    setBusinessUnits(storedUnits ? JSON.parse(storedUnits) : seedUnits);
    setManagers(storedManagers ? JSON.parse(storedManagers) : seedManagers);
    setInitiatives(storedInitiatives ? JSON.parse(storedInitiatives) : seedInitiatives);
    setFeedback(storedFeedback ? JSON.parse(storedFeedback) : generateFeedback());
    setUsers(storedUsers ? JSON.parse(storedUsers) : seedUsers);
  }, []);

  const persist = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Business Unit CRUD
  const addBusinessUnit = (unit) => {
    const newUnit = { ...unit, id: `d${Date.now()}` };
    const updated = [...businessUnits, newUnit];
    setBusinessUnits(updated);
    persist('ow_businessUnits', updated);
    return newUnit;
  };

  const updateBusinessUnit = (id, data) => {
    const updated = businessUnits.map(d => d.id === id ? { ...d, ...data } : d);
    setBusinessUnits(updated);
    persist('ow_businessUnits', updated);
  };

  const deleteBusinessUnit = (id) => {
    const updated = businessUnits.filter(d => d.id !== id);
    setBusinessUnits(updated);
    persist('ow_businessUnits', updated);
  };

  // Manager CRUD
  const addManager = (manager) => {
    const newManager = { ...manager, id: `m${Date.now()}` };
    const updated = [...managersData, newManager];
    setManagers(updated);
    persist('ow_managers', updated);
    return newManager;
  };

  const updateManager = (id, data) => {
    const updated = managersData.map(m => m.id === id ? { ...m, ...data } : m);
    setManagers(updated);
    persist('ow_managers', updated);
  };

  const deleteManager = (id) => {
    const updated = managersData.filter(m => m.id !== id);
    setManagers(updated);
    persist('ow_managers', updated);
  };

  // Initiative CRUD
  const addInitiative = (initiative) => {
    const newInitiative = { ...initiative, id: `p${Date.now()}` };
    const updated = [...initiativesData, newInitiative];
    setInitiatives(updated);
    persist('ow_initiatives', updated);
    return newInitiative;
  };

  const updateInitiative = (id, data) => {
    const updated = initiativesData.map(p => p.id === id ? { ...p, ...data } : p);
    setInitiatives(updated);
    persist('ow_initiatives', updated);
  };

  const deleteInitiative = (id) => {
    const updated = initiativesData.filter(p => p.id !== id);
    setInitiatives(updated);
    persist('ow_initiatives', updated);
  };

  // User CRUD
  const updateUserRole = (id, role) => {
    const updated = usersData.map(u => u.id === id ? { ...u, role } : u);
    setUsers(updated);
    persist('ow_users', updated);
  };

  // Feedback
  const submitFeedback = (fb) => {
    const newFb = { ...fb, id: `f${Date.now()}`, submittedAt: new Date().toISOString().slice(0, 10) };
    const updated = [...feedback, newFb];
    setFeedback(updated);
    persist('ow_feedback', updated);
    return newFb;
  };

  // Aggregations
  const getManagerFeedback = (managerId, dateRange) => {
    let filtered = feedback.filter(f => f.managerId === managerId);
    if (dateRange?.from) filtered = filtered.filter(f => f.submittedAt >= dateRange.from);
    if (dateRange?.to) filtered = filtered.filter(f => f.submittedAt <= dateRange.to);
    return filtered;
  };

  const getBusinessUnitFeedback = (businessUnitId, dateRange) => {
    let filtered = feedback.filter(f => f.businessUnitId === businessUnitId);
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
      businessUnits, managersData, initiativesData, feedback, usersData,
      addBusinessUnit, updateBusinessUnit, deleteBusinessUnit,
      addManager, updateManager, deleteManager,
      addInitiative, updateInitiative, deleteInitiative,
      updateUserRole,
      submitFeedback,
      getManagerFeedback, getBusinessUnitFeedback, computeAggregation,
      ANONYMITY_THRESHOLD,
    }}>
      {children}
    </DataContext.Provider>
  );
};
