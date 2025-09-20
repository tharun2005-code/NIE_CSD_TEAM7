import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--gaming-darker) 0%, var(--gaming-dark) 50%, var(--gaming-gray) 100%)' }}>
      {/* Header */}
      <header className="gaming-card border-b-2" style={{ borderBottomColor: 'var(--gaming-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <h1 className="gaming-title text-2xl gaming-glow-animate">GAMING CLUB</h1>
              <nav className="flex space-x-2">
                <Link 
                  to="/membership" 
                  className="gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow"
                >
                  Membership
                </Link>
                <Link 
                  to="/member-search" 
                  className="gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow"
                >
                  Member
                </Link>
                <Link 
                  to="/add-game" 
                  className="gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow"
                >
                  Add Game
                </Link>
                <Link 
                  to="/collections" 
                  className="gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow"
                >
                  Collections
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
                <span className="text-sm font-semibold" style={{ color: 'var(--gaming-primary)' }}>ADMIN</span>
              </div>
              <button
                onClick={handleLogout}
                className="gaming-btn px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="gaming-card border-t-2 mt-12" style={{ borderTopColor: 'var(--gaming-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full gaming-glow"></div>
              <div className="w-2 h-2 rounded-full gaming-glow-pink"></div>
              <div className="w-2 h-2 rounded-full gaming-glow-blue"></div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
              © 2025 Gaming Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;