import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import '../styles/leaderboardPage.css';

const LeaderboardPage = () => {
  const currentUser = JSON.parse(localStorage.getItem('mathAppUser'));
  const allUsers = JSON.parse(localStorage.getItem('mathUsers')) || {};

  if (!currentUser || !currentUser.username) {
    return <div className="leaderboard-page"><p>Belum login.</p></div>;
  }

  const sortedUsers = Object.entries(allUsers)
    .map(([username, data]) => ({
      username,
      highScore: data.highScore || 0
    }))
    .sort((a, b) => b.highScore - a.highScore);

  const getMedal = (rank) => {
    if (rank === 1) return <span className="medal gold">🥇</span>;
    if (rank === 2) return <span className="medal silver">🥈</span>;
    if (rank === 3) return <span className="medal bronze">🥉</span>;
    return <span className="rank-number">{rank}</span>;
  };

  return (
    <div className="leaderboard-page">
      <h2><FaTrophy /> Leaderboard Skor Tertinggi</h2>
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Peringkat</th>
              <th>Username</th>
              <th>Skor Tertinggi</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.username} className={user.username === currentUser.username ? 'highlight-row' : ''}>
                <td>{getMedal(index + 1)}</td>
                <td>{user.username}</td>
                <td>{user.highScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;