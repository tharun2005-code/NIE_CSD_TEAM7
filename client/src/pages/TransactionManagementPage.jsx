import React, { useState, useEffect } from 'react';
import { transactionsAPI, membersAPI, gamesAPI } from '../services/api';
import Layout from '../components/Layout';

const TransactionManagementPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
    loadMembers();
    loadGames();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionsAPI.getAll();
      setTransactions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load transactions');
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

  const loadGames = async () => {
    try {
      const response = await gamesAPI.getAll();
      setGames(response.data);
    } catch (err) {
      console.error('Failed to load games');
    }
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const getGameName = (gameId) => {
    if (gameId === 'MEMBERSHIP_FEE') {
      return 'Membership Fee';
    }
    const game = games.find(g => g.id === gameId);
    return game ? game.name : 'Unknown Game';
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

  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="gaming-card rounded-2xl p-8 gaming-glow mb-8">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 rounded-full gaming-glow"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
            </div>
            <h2 className="gaming-title text-3xl mb-2">TRANSACTION MANAGEMENT</h2>
            <p className="gaming-subtitle text-lg">View All Transactions</p>
          </div>

          {error && (
            <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6 gaming-glow-pink">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-semibold text-lg">{error}</span>
              </div>
            </div>
          )}

          <div className="gaming-card rounded-xl p-6 mb-6 border-2" style={{ borderColor: 'var(--gaming-primary)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-text-muted)' }}>
                  Total Transactions
                </p>
                <p className="gaming-title text-2xl">{transactions.length}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-text-muted)' }}>
                  Total Amount
                </p>
                <p className="gaming-title text-2xl" style={{ color: 'var(--gaming-primary)' }}>
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-text-muted)' }}>
                  Average Transaction
                </p>
                <p className="gaming-title text-2xl">
                  ₹{transactions.length > 0 ? (totalAmount / transactions.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--gaming-primary)' }}></div>
              <p className="gaming-subtitle">Loading transactions...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="gaming-table w-full rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left">Member</th>
                    <th className="px-6 py-4 text-left">Game/Service</th>
                    <th className="px-6 py-4 text-left">Amount (₹)</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center" style={{ color: 'var(--gaming-text-muted)' }}>
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions
                      .sort((a, b) => new Date(b.dateTime || 0) - new Date(a.dateTime || 0))
                      .map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 font-semibold">{getMemberName(transaction.memberId)}</td>
                          <td className="px-6 py-4">{getGameName(transaction.gameId)}</td>
                          <td className="px-6 py-4" style={{ color: 'var(--gaming-primary)' }}>
                            ₹{transaction.amount?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-6 py-4" style={{ color: 'var(--gaming-text-muted)' }}>
                            {formatDate(transaction.dateTime)}
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

export default TransactionManagementPage;

