import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';
import Layout from '../components/Layout';

const MemberManagementPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    balance: ''
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getAll();
      setMembers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const memberData = {
        name: formData.name,
        phone: formData.phone,
        balance: parseFloat(formData.balance) || 0
      };

      if (editingMember) {
        await membersAPI.update(editingMember.id, memberData);
        setSuccess('Member updated successfully!');
      } else {
        await membersAPI.create({ ...memberData, fee: memberData.balance });
        setSuccess('Member created successfully!');
      }
      setFormData({ name: '', phone: '', balance: '' });
      setShowForm(false);
      setEditingMember(null);
      loadMembers();
    } catch (err) {
      setError(err.response?.data || 'Operation failed');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      phone: member.phone || '',
      balance: member.balance || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      await membersAPI.delete(id);
      setSuccess('Member deleted successfully!');
      loadMembers();
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({ name: '', phone: '', balance: '' });
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
              <h2 className="gaming-title text-3xl mb-2">MEMBER MANAGEMENT</h2>
              <p className="gaming-subtitle text-lg">Manage Club Members</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
            >
              + Add Member
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
              <h3 className="gaming-subtitle text-xl mb-4">
                {editingMember ? 'Edit Member' : 'Create New Member'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Member Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Balance (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter balance"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
                  >
                    {editingMember ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
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
              <p className="gaming-subtitle">Loading members...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="gaming-table w-full rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Balance (₹)</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center" style={{ color: 'var(--gaming-text-muted)' }}>
                        No members found
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 font-semibold">{member.name}</td>
                        <td className="px-6 py-4">{member.phone}</td>
                        <td className="px-6 py-4" style={{ color: 'var(--gaming-primary)' }}>
                          ₹{member.balance?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(member)}
                              className="px-4 py-2 rounded-lg font-semibold uppercase text-sm border-2"
                              style={{ 
                                borderColor: 'var(--gaming-accent)',
                                color: 'var(--gaming-accent)',
                                background: 'transparent'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="px-4 py-2 rounded-lg font-semibold uppercase text-sm border-2"
                              style={{ 
                                borderColor: 'var(--gaming-secondary)',
                                color: 'var(--gaming-secondary)',
                                background: 'transparent'
                              }}
                            >
                              Delete
                            </button>
                          </div>
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

export default MemberManagementPage;

