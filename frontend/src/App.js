import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Toaster } from './components/ui/sonner';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';
import { EmployeeLayout } from './components/layout/EmployeeLayout';
import { ManagerLayout } from './components/layout/ManagerLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Employee pages
import EmployeeHome from './pages/employee/EmployeeHome';
import BrowseBusinessUnits from './pages/employee/BrowseBusinessUnits';
import BusinessUnitDetail from './pages/employee/BusinessUnitDetail';
import SubmitFeedback from './pages/employee/SubmitFeedback';

// Leadership pages
import LeadershipDashboard from './pages/leadership/LeadershipDashboard';
import ManagerInsights from './pages/leadership/ManagerInsights';
import BusinessUnitInsights from './pages/leadership/BusinessUnitInsights';
import ManageBusinessUnits from './pages/leadership/ManageBusinessUnits';
import ManageInitiatives from './pages/leadership/ManageInitiatives';
import ManageManagers from './pages/leadership/ManageManagers';
import ManageUsers from './pages/leadership/ManageUsers';

// Manager pages
import ManagerHome from './pages/manager/ManagerHome';
import MyInsights from './pages/manager/MyInsights';
import LearningPlan from './pages/manager/LearningPlan';

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
              <Route path="business-units" element={<BrowseBusinessUnits />} />
              <Route path="business-units/:unitId" element={<BusinessUnitDetail />} />
              <Route path="feedback" element={<SubmitFeedback />} />
            </Route>

            {/* Manager routes */}
            <Route path="/my-growth" element={<ManagerLayout />}>
              <Route index element={<ManagerHome />} />
              <Route path="insights" element={<MyInsights />} />
              <Route path="learning" element={<LearningPlan />} />
            </Route>

            {/* Leadership/Admin routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<LeadershipDashboard />} />
              <Route path="manager-insights" element={<ManagerInsights />} />
              <Route path="unit-insights" element={<BusinessUnitInsights />} />
              <Route path="business-units" element={<ManageBusinessUnits />} />
              <Route path="initiatives" element={<ManageInitiatives />} />
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
