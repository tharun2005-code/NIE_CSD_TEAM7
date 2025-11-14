import React, { useState } from 'react';
import { collectionsAPI } from '../services/api';
import Layout from '../components/Layout';

const CollectionsPage = () => {
  const [date, setDate] = useState('');
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await collectionsAPI.getByDate(date);
      setCollections(response.data);
    } catch (error) {
      setError(error.response?.data || 'Failed to fetch collections');
      setCollections([]);
    }
    
    setLoading(false);
  };

  const calculateTotal = () => {
    return collections.reduce((total, item) => total + item.recharge_amount, 0);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Gaming Header */}
        <div className="gaming-card rounded-2xl p-8 gaming-glow">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-4 h-4 rounded-full gaming-glow"></div>
              <div className="w-4 h-4 rounded-full gaming-glow-pink"></div>
              <div className="w-4 h-4 rounded-full gaming-glow-blue"></div>
            </div>
            <h1 className="gaming-title text-4xl mb-2">DAILY COLLECTIONS</h1>
            <p className="gaming-subtitle text-lg">Track Gaming Club Revenue</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="gaming-card rounded-2xl p-8 gaming-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="gaming-subtitle text-xl mb-2">Select Date to View Collections</h2>
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                Choose a date to analyze revenue data
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-end">
              <div className="flex-1 space-y-3">
                <label className="block text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="gaming-input w-full px-6 py-4 rounded-lg text-lg font-medium"
                />
              </div>
              <div>
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
                    'Search Collections'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-6 py-4 rounded-lg gaming-glow-pink">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-semibold text-lg">{error}</span>
            </div>
          </div>
        )}

        {/* Collections Results */}
        {searched && (
          <div className="gaming-card rounded-2xl overflow-hidden gaming-glow">
            {/* Results Header */}
            <div className="p-6 border-b-2" style={{ borderColor: 'var(--gaming-primary)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="gaming-subtitle text-xl mb-2">
                    Collections for {new Date(date).toLocaleDateString('en-GB', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                    Recharge transactions summary
                  </p>
                </div>
                {collections.length > 0 && (
                  <div className="gaming-card rounded-xl px-6 py-4 gaming-glow">
                    <div className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                      Total Revenue
                    </div>
                    <div className="text-3xl font-bold gaming-glow" style={{ color: 'var(--gaming-accent)' }}>
                      ₹{calculateTotal()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Content */}
            <div className="p-6">
              {collections.length > 0 ? (
                <div className="space-y-6">
                  {/* Collections List */}
                  <div className="space-y-4">
                    {collections.map((item, index) => (
                      <div key={index} className="gaming-card rounded-xl p-6 hover:gaming-glow transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full gaming-glow flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--gaming-primary)' }}></div>
                            </div>
                            <div>
                              <div className="text-xl font-bold" style={{ color: 'var(--gaming-text)' }}>{item.member}</div>
                              <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                                Member Recharge
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold gaming-glow" style={{ color: 'var(--gaming-accent)' }}>
                              +₹{item.recharge_amount}
                            </div>
                            <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                              Transaction #{item.transaction_id?.slice(-6) || index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Card */}
                  <div className="gaming-card rounded-2xl p-6 gaming-glow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full gaming-glow-pink flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--gaming-secondary)' }}></div>
                        </div>
                        <div>
                          <h4 className="gaming-subtitle text-xl mb-1">Daily Summary</h4>
                          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                            {collections.length} total transactions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold gaming-glow" style={{ color: 'var(--gaming-accent)' }}>
                          ₹{calculateTotal()}
                        </div>
                        <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                          Total Revenue
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="w-4 h-4 rounded-full gaming-glow-pink"></div>
                    <div className="w-4 h-4 rounded-full gaming-glow"></div>
                    <div className="w-4 h-4 rounded-full gaming-glow-blue"></div>
                  </div>
                  <h3 className="gaming-title text-2xl mb-4">No Collections Found</h3>
                  <p className="text-lg font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-text-muted)' }}>
                    No recharge transactions found for this date
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                    Try selecting a different date or check if there were any transactions
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Card */}
        {!searched && (
          <div className="gaming-card rounded-2xl p-6 gaming-glow">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full gaming-glow-blue flex items-center justify-center">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--gaming-accent)' }}></div>
              </div>
              <div>
                <h3 className="gaming-subtitle text-xl mb-2">How to use Collections</h3>
                <p className="text-lg font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--gaming-text-muted)' }}>
                  Select a date above to view all recharge transactions and total revenue for that day
                </p>
                <div className="flex items-center space-x-8 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--gaming-text-muted)' }}>
                  <span>View transaction details</span>
                  <span>Track daily revenue</span>
                  <span>Monitor business performance</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CollectionsPage;