import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await fetchApiData('leaderboard');
        setEntries(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
              <div>
                <strong>{entry.user?.name || entry.user || entry.name}</strong>
                <div className="text-muted small">Rank {entry.rank}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
