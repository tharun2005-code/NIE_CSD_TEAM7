import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(credentials);
    
    if (result.success) {
      navigate('/membership');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gaming Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full gaming-glow opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full gaming-glow-pink opacity-20"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full gaming-glow-blue opacity-20"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="gaming-card rounded-2xl p-10 gaming-glow">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-4 h-4 rounded-full gaming-glow"></div>
              <div className="w-4 h-4 rounded-full gaming-glow-pink"></div>
              <div className="w-4 h-4 rounded-full gaming-glow-blue"></div>
            </div>
            <h1 className="gaming-title text-4xl mb-2">GAMING CLUB</h1>
            <p className="gaming-subtitle text-lg">ADMIN PORTAL</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-4 py-3 rounded-lg gaming-glow-pink">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="gaming-input w-full px-4 py-4 rounded-lg text-lg font-medium"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="gaming-input w-full px-4 py-4 rounded-lg text-lg font-medium"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="gaming-btn w-full py-4 px-6 rounded-lg text-lg font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--gaming-text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold" style={{ color: 'var(--gaming-primary)' }}>
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-10 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-1 h-1 rounded-full gaming-glow"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-pink"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-blue"></div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
              © 2025 Gaming Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;