import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';
import Layout from '../components/Layout';

const MemberSearchPage = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await membersAPI.search({ phone });
      const memberData = response.data;
      
      // Navigate to member details page with the data
      navigate('/member-details', { state: { memberData } });
    } catch (error) {
      setError('Member not found or error occurred');
    }
    
    setLoading(false);
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
            <h2 className="gaming-title text-3xl mb-2">MEMBER SEARCH</h2>
            <p className="gaming-subtitle text-lg">Find Gaming Club Member</p>
          </div>
          
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
                Phone Number
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                    placeholder="Enter phone number to search"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="gaming-btn px-8 py-4 rounded-lg text-lg font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching...</span>
                      </div>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-1 h-1 rounded-full gaming-glow"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-pink"></div>
              <div className="w-1 h-1 rounded-full gaming-glow-blue"></div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
              Search by phone number to access member profile
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberSearchPage;