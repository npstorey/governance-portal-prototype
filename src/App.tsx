import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Policies } from './pages/Policies';
import { MyPolicies } from './pages/MyPolicies';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserManagement } from './pages/UserManagement';
import { useAuthStore } from './store/auth';

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome to the Data Governance Portal
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Guiding Principles</h2>
        <ul className="space-y-4 text-gray-600">
          <li>• Ensure data privacy and protection at all times</li>
          <li>• Maintain transparency in data sharing practices</li>
          <li>• Regular review and attestation of agreements</li>
          <li>• Compliance with NYC data governance standards</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/policies"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Policies />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-policies"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <MyPolicies />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminRoute>
                <PrivateLayout>
                  <AdminDashboard />
                </PrivateLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <PrivateLayout>
                  <UserManagement />
                </PrivateLayout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;