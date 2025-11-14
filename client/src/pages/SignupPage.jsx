import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authAPI.signup({
        username: formData.username,
        password: formData.password
      });
      
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.response?.data || 'Failed to create account');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
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
            <p className="gaming-subtitle text-lg">ADMIN SIGNUP</p>
          </div>
          
          {success && (
            <div className="bg-green-900/50 border-2 border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6 gaming-glow">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-semibold">{success}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 gaming-glow-pink">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
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
                value={formData.password}
                onChange={handleChange}
                required
                className="gaming-input w-full px-4 py-4 rounded-lg text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--gaming-text-muted)' }}>
              Already have an account?{' '}
              <Link to="/" className="font-semibold" style={{ color: 'var(--gaming-primary)' }}>
                Login
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

export default SignupPage;

