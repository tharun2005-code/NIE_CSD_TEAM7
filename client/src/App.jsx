import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MembershipPage from './pages/MembershipPage';
import MemberSearchPage from './pages/MemberSearchPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import MemberManagementPage from './pages/MemberManagementPage';
import AddGamePage from './pages/AddGamePage';
import GameManagementPage from './pages/GameManagementPage';
import CollectionsPage from './pages/CollectionsPage';
import AdminManagementPage from './pages/AdminManagementPage';
import RechargeManagementPage from './pages/RechargeManagementPage';
import TransactionManagementPage from './pages/TransactionManagementPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--gaming-darker) 0%, var(--gaming-dark) 50%, var(--gaming-gray) 100%)' }}>
        <div className="gaming-card rounded-2xl p-8 gaming-glow text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full gaming-glow"></div>
            <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
            <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
          </div>
          <h2 className="gaming-title text-2xl mb-2">LOADING</h2>
          <p className="gaming-subtitle text-lg">Initializing Gaming Club</p>
          <div className="mt-4">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--gaming-primary)' }}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/membership" 
              element={
                <ProtectedRoute>
                  <MembershipPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/member-search" 
              element={
                <ProtectedRoute>
                  <MemberSearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/member-details" 
              element={
                <ProtectedRoute>
                  <MemberDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/member-management" 
              element={
                <ProtectedRoute>
                  <MemberManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-game" 
              element={
                <ProtectedRoute>
                  <AddGamePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/game-management" 
              element={
                <ProtectedRoute>
                  <GameManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/collections" 
              element={
                <ProtectedRoute>
                  <CollectionsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-management" 
              element={
                <ProtectedRoute>
                  <AdminManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recharge-management" 
              element={
                <ProtectedRoute>
                  <RechargeManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transaction-management" 
              element={
                <ProtectedRoute>
                  <TransactionManagementPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
