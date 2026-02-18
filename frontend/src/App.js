import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Toaster } from './components/ui/sonner';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';
import { EmployeeLayout } from './components/layout/EmployeeLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Employee pages
import EmployeeHome from './pages/employee/EmployeeHome';
import BrowseDomains from './pages/employee/BrowseDomains';
import DomainDetail from './pages/employee/DomainDetail';
import SubmitFeedback from './pages/employee/SubmitFeedback';

// Leadership pages
import LeadershipDashboard from './pages/leadership/LeadershipDashboard';
import ManagerInsights from './pages/leadership/ManagerInsights';
import DomainInsights from './pages/leadership/DomainInsights';
import ManageDomains from './pages/leadership/ManageDomains';
import ManageProjects from './pages/leadership/ManageProjects';
import ManageManagers from './pages/leadership/ManageManagers';
import ManageUsers from './pages/leadership/ManageUsers';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Employee routes */}
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmployeeHome />} />
              <Route path="domains" element={<BrowseDomains />} />
              <Route path="domains/:domainId" element={<DomainDetail />} />
              <Route path="feedback" element={<SubmitFeedback />} />
            </Route>

            {/* Leadership/Admin routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<LeadershipDashboard />} />
              <Route path="manager-insights" element={<ManagerInsights />} />
              <Route path="domain-insights" element={<DomainInsights />} />
              <Route path="domains" element={<ManageDomains />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="managers" element={<ManageManagers />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
