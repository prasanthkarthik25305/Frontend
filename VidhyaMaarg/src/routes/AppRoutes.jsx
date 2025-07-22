import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CareerWizard from '../pages/CareerWizard';
import Resources from '../pages/Resources';
import Calendar from '../pages/Calendar';
import Discover from '../pages/Discover';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import HackathonFinder from '../pages/HackathonFinder'; // <-- Add this
import Signup from '../pages/Signup'; // <-- Add this
import AdminDashboard from '../pages/AdminDashboard';
/**
 * AppRoutes component
 * Defines all the routes for the application
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Home page as landing page for new users */}
      <Route path="/" element={<Home />} />
      
      {/* Main application pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/career-wizard" element={<CareerWizard />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/hackathon-finder" element={<HackathonFinder />} /> {/* New route */}
      <Route path="/signup" element={<Signup />} /> {/* New route */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* User profile and settings */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      
      {/* Fallback route - redirect to home if no match */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;