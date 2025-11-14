import React, { useState, useEffect } from 'react';
import { rechargesAPI, membersAPI } from '../services/api';
import Layout from '../components/Layout';

const RechargeManagementPage = () => {
  const [recharges, setRecharges] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: ''
  });

  useEffect(() => {
    loadRecharges();
    loadMembers();
  }, []);

  const loadRecharges = async () => {
    try {
      setLoading(true);
      const response = await rechargesAPI.getAll();
      setRecharges(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load recharges');
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (err) {
      console.error('Failed to load members');
    }
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await rechargesAPI.create({
        memberId: formData.memberId,
        amount: parseFloat(formData.amount)
      });
      setSuccess('Recharge created successfully!');
      setFormData({ memberId: '', amount: '' });
      setShowForm(false);
      loadRecharges();
      loadMembers(); // Reload to get updated balances
    } catch (err) {
      setError(err.response?.data || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recharge?')) {
      return;
    }

    try {
      await rechargesAPI.delete(id);
      setSuccess('Recharge deleted successfully!');
      loadRecharges();
    } catch (err) {
      setError('Failed to delete recharge');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="gaming-card rounded-2xl p-8 gaming-glow mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 rounded-full gaming-glow"></div>
                <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
                <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
              </div>
              <h2 className="gaming-title text-3xl mb-2">RECHARGE MANAGEMENT</h2>
              <p className="gaming-subtitle text-lg">Manage Member Recharges</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
            >
              + Add Recharge
            </button>
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

          {showForm && (
            <div className="gaming-card rounded-xl p-6 mb-6 border-2" style={{ borderColor: 'var(--gaming-primary)' }}>
              <h3 className="gaming-subtitle text-xl mb-4">Create New Recharge</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Member
                  </label>
                  <select
                    value={formData.memberId}
                    onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                  >
                    <option value="">Select a member</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} ({member.phone}) - ₹{member.balance?.toFixed(2) || '0.00'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter recharge amount"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
                  >
                    Create Recharge
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ memberId: '', amount: '' });
                    }}
                    className="px-6 py-3 rounded-lg font-bold uppercase tracking-wide border-2"
                    style={{ 
                      borderColor: 'var(--gaming-light-gray)',
                      color: 'var(--gaming-text-muted)',
                      background: 'var(--gaming-gray)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--gaming-primary)' }}></div>
              <p className="gaming-subtitle">Loading recharges...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="gaming-table w-full rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left">Member</th>
                    <th className="px-6 py-4 text-left">Amount (₹)</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recharges.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center" style={{ color: 'var(--gaming-text-muted)' }}>
                        No recharges found
                      </td>
                    </tr>
                  ) : (
                    recharges.map((recharge) => (
                      <tr key={recharge.id}>
                        <td className="px-6 py-4 font-semibold">{getMemberName(recharge.memberId)}</td>
                        <td className="px-6 py-4" style={{ color: 'var(--gaming-primary)' }}>
                          ₹{recharge.amount?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4" style={{ color: 'var(--gaming-text-muted)' }}>
                          {formatDate(recharge.dateTime)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(recharge.id)}
                            className="px-4 py-2 rounded-lg font-semibold uppercase text-sm border-2"
                            style={{ 
                              borderColor: 'var(--gaming-secondary)',
                              color: 'var(--gaming-secondary)',
                              background: 'transparent'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RechargeManagementPage;

