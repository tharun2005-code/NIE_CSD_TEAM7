import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import MemberSearchPage from './pages/MemberSearchPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import AddGamePage from './pages/AddGamePage';
import CollectionsPage from './pages/CollectionsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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
              path="/add-game" 
              element={
                <ProtectedRoute>
                  <AddGamePage />
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
