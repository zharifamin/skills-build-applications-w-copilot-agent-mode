import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api.js';

// -8000.app.github.dev/api/workouts
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await fetchApiData('workouts');
        setWorkouts(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.id || workout.title}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="mb-1">{workout.category}</p>
                  <p className="mb-0 text-muted">{workout.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
