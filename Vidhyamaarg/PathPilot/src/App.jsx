import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CareerWizard from './pages/CareerWizard';
import Resources from './pages/Resources';
import Calendar from './pages/Calendar';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import HackathonFinder from './pages/HackathonFinder';

// Components 
import Navbar from './components/Navbar';

// Context
import { ThemeProvider } from './contexts/ThemeContext';

// Styles
import './styles/theme.css';
import './styles/calendar-custom.css';

/**
 * Protected route wrapper
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Admin route wrapper
 * Redirects to dashboard if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication status on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsLoggedIn(authStatus);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* ToastContainer for notifications */}
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
          
          {/* Navigation */}
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          
          {/* Main content */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes for authenticated users */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/career-wizard" element={
              <ProtectedRoute>
                <CareerWizard />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/discover" element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/hackathon-finder" element={
              <ProtectedRoute>
                <HackathonFinder />
              </ProtectedRoute>
            } />
            
            {/* Admin-only routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p>Admin-only content would go here</p>
                </div>
              </AdminRoute>
            } />
            
            {/* Fallback route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;