// --- START OF FILE src/routes/AppRouter.jsx ---
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Componenti comuni
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

// === Importazioni Lazy per i componenti di Pagina ===
const HomePage = lazy(() => import('../pages/HomePage'));
const BlogPage = lazy(() => import('../features/blog/pages/BlogPage'));
const ArticleDetailPage = lazy(() => import('../features/blog/pages/ArticleDetailPage'));
const AuthPage = lazy(() => import('../features/auth/pages/AuthPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const ProfilePage = lazy(() => import('../features/profile/pages/ProfilePage'));
const AdminDashboardPage = lazy(() => import('../features/admin/pages/AdminDashboardPage'));
const ArticleManagement = lazy(() => import('../features/admin/components/ArticleManagement'));
const UserManagement = lazy(() => import('../features/admin/components/UserManagement'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));
const FaqPage = lazy(() => import('../pages/FaqPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage')); // <<<<<<<<<< NUOVA IMPORTAZIONE LAZY

// Fallback per Suspense
const PageSuspenseFallback = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <LoadingSpinner size="lg" />
  </div>
);

// GuestRoute
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isInitialLoading } = useAuth();
  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const router = createBrowserRouter([
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: 'login',
        element: <Suspense fallback={<PageSuspenseFallback />}><AuthPage mode="login" /></Suspense>
      },
      {
        path: 'register',
        element: <Suspense fallback={<PageSuspenseFallback />}><AuthPage mode="register" /></Suspense>
      },
      { // <<<<<<<<<< NUOVA ROTTA AGGIUNTA QUI
        path: 'forgot-password',
        element: <Suspense fallback={<PageSuspenseFallback />}><ForgotPasswordPage /></Suspense>
      }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Suspense fallback={<PageSuspenseFallback />}><NotFoundPage /></Suspense>,
    children: [
      { index: true, element: <Suspense fallback={<PageSuspenseFallback />}><HomePage /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<PageSuspenseFallback />}><BlogPage /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<PageSuspenseFallback />}><ArticleDetailPage /></Suspense> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageSuspenseFallback />}><DashboardPage /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageSuspenseFallback />}><ProfilePage /></Suspense>
          </ProtectedRoute>
        ),
      },
      { path: 'privacy', element: <Suspense fallback={<PageSuspenseFallback />}><PrivacyPolicyPage /></Suspense> },
      { path: 'terms', element: <Suspense fallback={<PageSuspenseFallback />}><TermsOfServicePage /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<PageSuspenseFallback />}><FaqPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageSuspenseFallback />}><AboutPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageSuspenseFallback />}><ContactPage /></Suspense> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <Suspense fallback={<PageSuspenseFallback />}><NotFoundPage /></Suspense>,
    children: [
      { index: true, element: <Suspense fallback={<PageSuspenseFallback />}><AdminDashboardPage /></Suspense> },
      { path: 'articles', element: <Suspense fallback={<PageSuspenseFallback />}><ArticleManagement /></Suspense> },
      { path: 'users', element: <Suspense fallback={<PageSuspenseFallback />}><UserManagement /></Suspense> },
      { path: '*', element: <Navigate to="/admin" replace /> }
    ],
  },
  {
    path: '*',
    element: <Suspense fallback={<PageSuspenseFallback />}><NotFoundPage /></Suspense>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
// --- END OF FILE src/routes/AppRouter.jsx ---