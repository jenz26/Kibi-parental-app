// src/routes/AppRouter.jsx (o il nome del tuo file di routing)
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout'; // <--- NUOVA IMPORTAZIONE

import HomePage from '../pages/HomePage';
import BlogPage from '../features/blog/pages/BlogPage';
import ArticleDetailPage from '../features/blog/pages/ArticleDetailPage';
import AuthPage from '../features/auth/pages/AuthPage'; // Questa pagina verrà usata da AuthLayout
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import ArticleManagement from '../features/admin/components/ArticleManagement';
import UserManagement from '../features/admin/components/UserManagement';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import FaqPage from '../pages/FaqPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../hooks/useAuth'; // Assicurati che useAuth esponga { isAuthenticated, isLoading }
import LoadingSpinner from '../components/common/LoadingSpinner';

// GuestRoute rimane come l'hai definito
const GuestRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth(); // Supponendo che useAuth provenga dal tuo hook
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size="lg" />
        </div>
    );
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const router = createBrowserRouter([
  // Route per AuthLayout (Login, Registrazione, ecc.)
  {
    element: (
      <GuestRoute> {/* Applichiamo GuestRoute a tutto l'AuthLayout */}
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: 'login',
        element: <AuthPage mode="login" /> // Passa la prop 'mode'
      },
      {
        path: 'register', // Aggiungi una route per la registrazione se non c'è
        element: <AuthPage mode="register" /> // Passa la prop 'mode'
      },
      // Potresti aggiungere qui /forgot-password ecc.
    ]
  },
  // Route per MainLayout (pagine principali del sito)
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />, // Puoi avere un errorElement di primo livello o per layout
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <ArticleDetailPage /> },
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
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      // Non mettere un { path: '*', ... } qui dentro, ma al livello superiore
    ],
  },
  // Route per AdminLayout
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />, // O una pagina di errore specifica per l'admin
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'articles', element: <ArticleManagement /> },
      { path: 'users', element: <UserManagement /> },
      { path: '*', element: <Navigate to="/admin" replace /> } // Catch-all per /admin/*
    ],
  },
  // Catch-all di primo livello per route non trovate
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};