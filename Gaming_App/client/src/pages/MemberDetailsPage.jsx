import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gamesAPI } from '../services/api';
import Layout from '../components/Layout';

const MemberDetailsPage = () => {
  const location = useLocation();
  const { memberData } = location.state || {};
  const [activeTab, setActiveTab] = useState('games');
  const [playingGame, setPlayingGame] = useState(null);
  const [playError, setPlayError] = useState('');

  if (!memberData) {
    return (
      <Layout>
        <div className="text-center">No member data found. Please search for a member first.</div>
      </Layout>
    );
  }

  const { member, recharge_history, games, played_history } = memberData;

  const handlePlayGame = async (game) => {
    setPlayingGame(game.id);
    setPlayError('');

    try {
      await gamesAPI.play({
        member_id: member.id,
        game_id: game.id
      });
      
      // Refresh page or update member data
      window.location.reload();
    } catch (error) {
      setPlayError(error.response?.data || 'Failed to play game');
    }
    
    setPlayingGame(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">MEMBER DETAILS</h2>
          
          {/* Member Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {member.name}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {member.phone}
              </div>
              <div>
                <span className="font-medium">Balance:</span> ₹{member.balance}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('games')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'games'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Games
              </button>
              <button
                onClick={() => setActiveTab('recharge')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recharge'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recharge History
              </button>
              <button
                onClick={() => setActiveTab('played')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'played'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Played Games
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'games' && (
            <div>
              <h3 className="text-lg font-medium mb-4">List of Available Games:</h3>
              {playError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                  {playError}
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {games.map((game) => (
                      <tr key={game.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {game.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{game.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {game.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handlePlayGame(game)}
                            disabled={playingGame === game.id || member.balance < game.price}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {playingGame === game.id ? 'Playing...' : 'Play Game'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'recharge' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Recharge History:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date/Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recharge_history.map((recharge, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(recharge.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{recharge.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'played' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Played Games History:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date/Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Game
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {played_history.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.gameId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MemberDetailsPage;