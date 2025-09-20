import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { membersAPI, gamesAPI } from '../services/api';
import Layout from '../components/Layout';

const MemberProfilePage = () => {
  const { phoneNo } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('games');
  const [playingGame, setPlayingGame] = useState(null);
  const [playError, setPlayError] = useState('');

  useEffect(() => {
    fetchMemberData();
  }, [phoneNo]);

  const fetchMemberData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await membersAPI.search({ phone: phoneNo });
      setMemberData(response.data);
    } catch (error) {
      setError('Member not found or error occurred');
    }
    
    setLoading(false);
  };

  const handlePlayGame = async (game) => {
    setPlayingGame(game.id);
    setPlayError('');

    try {
      await gamesAPI.play({
        member_id: memberData.member.id,
        game_id: game.id
      });
      
      // Refresh member data to update balance
      await fetchMemberData();
    } catch (error) {
      setPlayError(error.response?.data || 'Failed to play game');
    }
    
    setPlayingGame(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !memberData) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Member Not Found</h2>
            <p className="text-red-600">No member found with phone number: {phoneNo}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const { member, recharge_history, games, played_history } = memberData;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Gaming Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-1">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🎮 MEMBER PROFILE
                </h1>
                <p className="text-gray-600 mt-1">Gaming Stats & Activities</p>
              </div>
              <div className="text-6xl animate-bounce">🏆</div>
            </div>
          </div>
        </div>

        {/* Member Card */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white font-bold">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
              <p className="text-gray-600">📱 {member.phone}</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl">
                <div className="text-sm font-medium">Balance</div>
                <div className="text-2xl font-bold">₹{member.balance}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('games')}
                className={`py-4 px-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === 'games'
                    ? 'text-white border-b-2 border-white'
                    : 'text-purple-100 hover:text-white'
                }`}
              >
                🎮 Available Games
              </button>
              <button
                onClick={() => setActiveTab('recharge')}
                className={`py-4 px-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === 'recharge'
                    ? 'text-white border-b-2 border-white'
                    : 'text-purple-100 hover:text-white'
                }`}
              >
                💳 Recharge History
              </button>
              <button
                onClick={() => setActiveTab('played')}
                className={`py-4 px-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === 'played'
                    ? 'text-white border-b-2 border-white'
                    : 'text-purple-100 hover:text-white'
                }`}
              >
                🏆 Games Played
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'games' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">🎯 Game Arena</h3>
                  <div className="text-sm text-gray-500">Choose your adventure!</div>
                </div>
                
                {playError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                    ⚠️ {playError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {games.map((game) => (
                    <div key={game.id} className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900">{game.name}</h4>
                        <div className="text-2xl">🎮</div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">₹{game.price}</span>
                        <button
                          onClick={() => handlePlayGame(game)}
                          disabled={playingGame === game.id || member.balance < game.price}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {playingGame === game.id ? '🎮 Playing...' : '🚀 Play Game'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recharge' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">💰 Wallet History</h3>
                  <div className="text-sm text-gray-500">Your recharge transactions</div>
                </div>

                {recharge_history.length > 0 ? (
                  <div className="space-y-3">
                    {recharge_history.map((recharge, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                            💳
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Recharge</div>
                            <div className="text-sm text-gray-500">
                              {new Date(recharge.dateTime).toLocaleDateString()} at {new Date(recharge.dateTime).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-green-600">+₹{recharge.amount}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💸</div>
                    <p className="text-gray-500">No recharge history found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'played' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">🏆 Gaming History</h3>
                  <div className="text-sm text-gray-500">Your epic gaming journey</div>
                </div>

                {played_history.length > 0 ? (
                  <div className="space-y-3">
                    {played_history.map((transaction, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                            🎮
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Game Session</div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.dateTime).toLocaleDateString()} at {new Date(transaction.dateTime).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Game ID: {transaction.gameId}</div>
                          <div className="text-xl font-bold text-red-600">-₹{transaction.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-500">No games played yet. Time to start gaming!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberProfilePage;