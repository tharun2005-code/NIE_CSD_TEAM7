import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Layout from '../components/Layout';

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAll();
      setAdmins(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingAdmin) {
        await adminAPI.update(editingAdmin.id, formData);
        setSuccess('Admin updated successfully!');
      } else {
        await adminAPI.create(formData);
        setSuccess('Admin created successfully!');
      }
      setFormData({ username: '', password: '' });
      setShowForm(false);
      setEditingAdmin(null);
      loadAdmins();
    } catch (err) {
      setError(err.response?.data || 'Operation failed');
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({ username: admin.username, password: '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      await adminAPI.delete(id);
      setSuccess('Admin deleted successfully!');
      loadAdmins();
    } catch (err) {
      setError('Failed to delete admin');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAdmin(null);
    setFormData({ username: '', password: '' });
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
              <h2 className="gaming-title text-3xl mb-2">ADMIN MANAGEMENT</h2>
              <p className="gaming-subtitle text-lg">Manage Admin Users</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
            >
              + Add Admin
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
                {editingAdmin ? 'Edit Admin' : 'Create New Admin'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                    Password {editingAdmin && '(leave empty to keep current)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingAdmin}
                    className="gaming-input w-full px-4 py-3 rounded-lg"
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wide"
                  >
                    {editingAdmin ? 'Update' : 'Create'}
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
              <p className="gaming-subtitle">Loading admins...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="gaming-table w-full rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left">Username</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-6 py-8 text-center" style={{ color: 'var(--gaming-text-muted)' }}>
                        No admins found
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-6 py-4 font-semibold">{admin.username}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(admin)}
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
                              onClick={() => handleDelete(admin.id)}
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

export default AdminManagementPage;

