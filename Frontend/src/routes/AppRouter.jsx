import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

import HomePage from '../pages/HomePage';
import BlogPage from '../features/blog/pages/BlogPage';
import ArticleDetailPage from '../features/blog/pages/ArticleDetailPage';
import AuthPage from '../features/auth/pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import ArticleManagement from '../features/admin/components/ArticleManagement';
import UserManagement from '../features/admin/components/UserManagement';
import NotFoundPage from '../pages/NotFoundPage';
// Importa le nuove pagine
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import FaqPage from '../pages/FaqPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';


const GuestRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size="lg" />
        </div>
    );
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <ArticleDetailPage /> },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        )
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      // Aggiungi le route per le nuove pagine qui
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      // Lascia il catch-all alla fine
      { path: '*', element: <NotFoundPage /> }
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'articles', element: <ArticleManagement /> },
      { path: 'users', element: <UserManagement /> },
      { path: '*', element: <Navigate to="/admin" replace /> }
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};