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
        <div className="gaming-card rounded-2xl p-8 text-center gaming-glow">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
            <div className="w-3 h-3 rounded-full gaming-glow"></div>
            <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
          </div>
          <h2 className="gaming-title text-2xl mb-4">No Member Data Found</h2>
          <p className="gaming-subtitle text-lg">Please search for a member first</p>
        </div>
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
      <div className="max-w-6xl mx-auto">
        <div className="gaming-card rounded-2xl p-8 gaming-glow">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-3 h-3 rounded-full gaming-glow"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-pink"></div>
              <div className="w-3 h-3 rounded-full gaming-glow-blue"></div>
            </div>
            <h2 className="gaming-title text-3xl mb-2">MEMBER DETAILS</h2>
            <p className="gaming-subtitle text-lg">Gaming Club Member Profile</p>
          </div>
          
          {/* Member Info */}
          <div className="gaming-card rounded-xl p-6 mb-8 gaming-glow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                  Name
                </div>
                <div className="text-xl font-semibold" style={{ color: 'var(--gaming-text)' }}>
                  {member.name}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                  Phone
                </div>
                <div className="text-xl font-semibold" style={{ color: 'var(--gaming-text)' }}>
                  {member.phone}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--gaming-primary)' }}>
                  Balance
                </div>
                <div className="text-2xl font-bold gaming-glow" style={{ color: 'var(--gaming-accent)' }}>
                  ₹{member.balance}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('games')}
                className={`gaming-tab px-6 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 ${
                  activeTab === 'games' ? 'active' : ''
                }`}
              >
                Games
              </button>
              <button
                onClick={() => setActiveTab('recharge')}
                className={`gaming-tab px-6 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 ${
                  activeTab === 'recharge' ? 'active' : ''
                }`}
              >
                Recharge History
              </button>
              <button
                onClick={() => setActiveTab('played')}
                className={`gaming-tab px-6 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 ${
                  activeTab === 'played' ? 'active' : ''
                }`}
              >
                Played Games
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'games' && (
            <div>
              <h3 className="gaming-subtitle text-xl mb-6">Available Games</h3>
              {playError && (
                <div className="bg-red-900/50 border-2 border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6 gaming-glow-pink">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="font-semibold text-lg">{playError}</span>
                  </div>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: 'var(--gaming-primary)' }}>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--gaming-light-gray)' }}>
                    {games.map((game) => (
                      <tr key={game.id} className="hover:gaming-glow transition-all duration-300">
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold" style={{ color: 'var(--gaming-text)' }}>
                          {game.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold" style={{ color: 'var(--gaming-accent)' }}>
                          ₹{game.price}
                        </td>
                        <td className="px-6 py-4 text-lg" style={{ color: 'var(--gaming-text-muted)' }}>
                          {game.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handlePlayGame(game)}
                            disabled={playingGame === game.id || member.balance < game.price}
                            className="gaming-btn px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {playingGame === game.id ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                <span>Playing...</span>
                              </div>
                            ) : (
                              'Play Game'
                            )}
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
              <h3 className="gaming-subtitle text-xl mb-6">Recharge History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: 'var(--gaming-primary)' }}>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Date/Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--gaming-light-gray)' }}>
                    {recharge_history.map((recharge, index) => (
                      <tr key={index} className="hover:gaming-glow transition-all duration-300">
                        <td className="px-6 py-4 whitespace-nowrap text-lg" style={{ color: 'var(--gaming-text)' }}>
                          {new Date(recharge.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold" style={{ color: 'var(--gaming-accent)' }}>
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
              <h3 className="gaming-subtitle text-xl mb-6">Played Games History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: 'var(--gaming-primary)' }}>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Date/Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Game
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--gaming-primary)' }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--gaming-light-gray)' }}>
                    {played_history.map((transaction, index) => (
                      <tr key={index} className="hover:gaming-glow transition-all duration-300">
                        <td className="px-6 py-4 whitespace-nowrap text-lg" style={{ color: 'var(--gaming-text)' }}>
                          {new Date(transaction.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold" style={{ color: 'var(--gaming-text)' }}>
                          {transaction.gameId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold" style={{ color: 'var(--gaming-accent)' }}>
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