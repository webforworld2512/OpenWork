import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/seedData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('openwork_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('openwork_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = users.find(u => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('openwork_user', JSON.stringify(found));
      return { success: true, user: found };
    }
    return { success: false, error: 'Invalid credentials. Try admin@openwork.io, employee@openwork.io, or manager@openwork.io' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('openwork_user');
  };

  const isLeadership = user?.role === 'leadership';
  const isEmployee = user?.role === 'employee';
  const isManager = user?.role === 'manager';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isLeadership, isEmployee, isManager }}>
      {children}
    </AuthContext.Provider>
  );
};
