import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await fetchApiData('activities');
        setActivities(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.id || activity.type}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{activity.type}</h3>
                  <p className="mb-1">Duration: {activity.durationMinutes || activity.duration || 'n/a'} min</p>
                  <p className="mb-0 text-muted">Distance: {activity.distanceKm ?? 'n/a'} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
