import React, { useState } from 'react';
import { membersAPI } from '../services/api';
import Layout from '../components/Layout';

const MembershipPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fee: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await membersAPI.create({
        name: formData.name,
        phone: formData.phone,
        fee: parseFloat(formData.fee)
      });
      
      setSuccess('Membership created successfully!');
      setFormData({ name: '', phone: '', fee: '' });
    } catch (error) {
      setError(error.response?.data || 'Failed to create membership');
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
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="gaming-card rounded-2xl p-8 gaming-glow">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-3 h-3 rounded-full gaming-glow"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
            </div>
            <h2 className="gaming-title text-3xl mb-2">CREATE MEMBERSHIP</h2>
            <p className="gaming-subtitle text-lg">Register New Gaming Club Member</p>
          </div>
          
          {success && (
            <div className="bg-green-900/50 border-2 border-green-500 text-green-300 px-6 py-4 rounded-lg mb-6 gaming-glow">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500 gaming-glow"></div>
                <span className="font-semibold text-lg">{success}</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6 gaming-glow-pink">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-semibold text-lg">{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Member Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter member full name"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Membership Fee (₹)
              </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter membership fee amount"
              />
            </div>
            
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="gaming-btn w-full py-5 px-8 rounded-lg text-xl font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Membership...</span>
                  </div>
                ) : (
                  'Create Membership'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-1 h-1 rounded-full gaming-glow"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-pink"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-blue"></div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
              New members will be added to the gaming club database
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipPage;