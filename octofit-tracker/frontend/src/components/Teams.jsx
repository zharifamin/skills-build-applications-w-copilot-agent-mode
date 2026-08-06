import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api.js';

// -8000.app.github.dev/api/teams
function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchApiData('teams');
        setTeams(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="mb-1">{team.sport}</p>
                  <p className="mb-0 text-muted">{team.focus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
