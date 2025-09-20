import React, { useState } from 'react';
import { gamesAPI } from '../services/api';
import Layout from '../components/Layout';

const AddGamePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    minPlayers: '',
    multipleAllowed: false
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
      const gameData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description
      };
      
      const response = await gamesAPI.create(gameData);
      
      setSuccess('Game added successfully!');
      setFormData({
        name: '',
        price: '',
        description: '',
        minPlayers: '',
        multipleAllowed: false
      });
    } catch (error) {
      setError(error.response?.data || 'Failed to add game');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
            <h2 className="gaming-title text-3xl mb-2">ADD GAME</h2>
            <p className="gaming-subtitle text-lg">Register New Gaming Club Game</p>
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
                Game Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter game name"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter game price"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                placeholder="Enter game description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                  Min Players
                </label>
                <input
                  type="number"
                  name="minPlayers"
                  value={formData.minPlayers}
                  onChange={handleChange}
                  min="1"
                  className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                  placeholder="Min players"
                />
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center space-x-3 p-4 gaming-card rounded-lg">
                  <input
                    type="checkbox"
                    name="multipleAllowed"
                    checked={formData.multipleAllowed}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500 focus:ring-2"
                    style={{ accentColor: 'var(--gaming-primary)' }}
                  />
                  <span className="text-lg font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text)' }}>
                    Multiple Allowed
                  </span>
                </label>
              </div>
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
                    <span>Adding Game...</span>
                  </div>
                ) : (
                  'Add Game'
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
              New games will be added to the gaming club database
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddGamePage;