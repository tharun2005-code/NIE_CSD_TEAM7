import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--gaming-darker) 0%, var(--gaming-dark) 50%, var(--gaming-gray) 100%)' }}>
      {/* Header */}
      <header className="gaming-card border-b-2" style={{ borderBottomColor: 'var(--gaming-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full gaming-glow"></div>
                <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
                <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
              </div>
              <Link to="/membership" className="gaming-title text-2xl gaming-glow-animate">
                GAMING CLUB
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-2">
              <Link 
                to="/membership" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/membership') ? 'active' : ''}`}
              >
                Membership
              </Link>
              <Link 
                to="/member-search" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/member-search') ? 'active' : ''}`}
              >
                Member
              </Link>
              <Link 
                to="/member-management" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/member-management') ? 'active' : ''}`}
              >
                Members
              </Link>
              <Link 
                to="/add-game" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/add-game') ? 'active' : ''}`}
              >
                Add Game
              </Link>
              <Link 
                to="/game-management" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/game-management') ? 'active' : ''}`}
              >
                Games
              </Link>
              <Link 
                to="/recharge-management" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/recharge-management') ? 'active' : ''}`}
              >
                Recharges
              </Link>
              <Link 
                to="/transaction-management" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/transaction-management') ? 'active' : ''}`}
              >
                Transactions
              </Link>
              <Link 
                to="/collections" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/collections') ? 'active' : ''}`}
              >
                Collections
              </Link>
              <Link 
                to="/admin-management" 
                className={`gaming-tab px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/admin-management') ? 'active' : ''}`}
              >
                Admins
              </Link>
            </nav>

            {/* Right side - Admin badge and Logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
                <span className="text-sm font-semibold" style={{ color: 'var(--gaming-primary)' }}>ADMIN</span>
              </div>
              <button
                onClick={handleLogout}
                className="gaming-btn px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300"
              >
                Logout
              </button>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg border-2 transition-all duration-300"
                style={{ 
                  borderColor: 'var(--gaming-primary)',
                  color: 'var(--gaming-primary)'
                }}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="pb-4 border-t-2" style={{ borderTopColor: 'var(--gaming-primary)' }}>
              <nav className="flex flex-col space-y-2 pt-4">
                <Link 
                  to="/membership" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/membership') ? 'active' : ''}`}
                >
                  Membership
                </Link>
                <Link 
                  to="/member-search" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/member-search') ? 'active' : ''}`}
                >
                  Member
                </Link>
                <Link 
                  to="/member-management" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/member-management') ? 'active' : ''}`}
                >
                  Members
                </Link>
                <Link 
                  to="/add-game" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/add-game') ? 'active' : ''}`}
                >
                  Add Game
                </Link>
                <Link 
                  to="/game-management" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/game-management') ? 'active' : ''}`}
                >
                  Games
                </Link>
                <Link 
                  to="/recharge-management" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/recharge-management') ? 'active' : ''}`}
                >
                  Recharges
                </Link>
                <Link 
                  to="/transaction-management" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/transaction-management') ? 'active' : ''}`}
                >
                  Transactions
                </Link>
                <Link 
                  to="/collections" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/collections') ? 'active' : ''}`}
                >
                  Collections
                </Link>
                <Link 
                  to="/admin-management" 
                  onClick={closeMenu}
                  className={`gaming-tab px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:gaming-glow ${isActive('/admin-management') ? 'active' : ''}`}
                >
                  Admins
                </Link>
              </nav>
            </div>
          )}
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