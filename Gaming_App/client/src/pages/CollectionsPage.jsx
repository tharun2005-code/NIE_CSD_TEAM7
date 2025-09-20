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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">COLLECTIONS</h2>
          
          {/* Date Search Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
              <div className="text-sm text-gray-500">
                (Optional)
              </div>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Collections Results */}
          {searched && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                Recharge Collection on {new Date(date).toLocaleDateString('en-GB')}
              </h3>
              
              {collections.length > 0 ? (
                <div>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recharge
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {collections.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.member}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{item.recharge_amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-right">
                      <span className="text-lg font-semibold">
                        Total: ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recharge collections found for this date.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsPage;