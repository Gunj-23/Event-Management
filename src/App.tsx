import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const UserDashboardPage = lazy(() => import('./pages/dashboard/UserDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/dashboard/AdminDashboardPage'));
const CreateEventPage = lazy(() => import('./pages/dashboard/CreateEventPage'));
const ManageEventPage = lazy(() => import('./pages/dashboard/ManageEventPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { user } = useAuth();
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected user routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Protected admin routes */}
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={['admin', 'organizer']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="admin/events/create" element={
            <ProtectedRoute allowedRoles={['admin', 'organizer']}>
              <CreateEventPage />
            </ProtectedRoute>
          } />
          <Route path="admin/events/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'organizer']}>
              <ManageEventPage />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;