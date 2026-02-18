import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  LayoutDashboard, Users, FolderKanban, Briefcase, UserCog,
  ChevronLeft, ChevronRight, LogOut, Shield, BarChart3,
  Building2, TrendingUp
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Manager Insights', path: '/admin/manager-insights', icon: TrendingUp },
  { label: 'Domain Insights', path: '/admin/domain-insights', icon: BarChart3 },
  { type: 'separator', label: 'Management' },
  { label: 'Domains', path: '/admin/domains', icon: Building2 },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Managers', path: '/admin/managers', icon: Briefcase },
  { label: 'Users', path: '/admin/users', icon: UserCog },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`bg-gradient-sidebar flex flex-col border-r border-sidebar-border transition-[width] duration-300 ease-in-out h-screen sticky top-0 ${
          collapsed ? 'w-[68px]' : 'w-[260px]'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-heading font-semibold text-sidebar-foreground tracking-tight">
              LeadLens
            </span>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            if (item.type === 'separator') {
              return (
                <div key={i} className="pt-4 pb-2 px-2">
                  {!collapsed && (
                    <span className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
                      {item.label}
                    </span>
                  )}
                  {collapsed && <Separator className="bg-sidebar-border" />}
                </div>
              );
            }

            const Icon = item.icon;
            const link = (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-sidebar-accent text-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-muted'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-2">
          <Separator className="bg-sidebar-border" />
          {!collapsed && user && (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-muted flex items-center justify-center text-xs font-semibold text-sidebar-foreground">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.role}</p>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={`text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-muted ${collapsed ? 'w-full justify-center' : 'flex-1'}`}
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-muted"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
};
