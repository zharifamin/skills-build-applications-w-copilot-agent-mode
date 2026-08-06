import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api.js';

// -8000.app.github.dev/api/users
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchApiData('users');
        setUsers(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.id || user.email}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6">{user.name}</h3>
                  <p className="mb-1">{user.email}</p>
                  <p className="mb-0 text-muted">{user.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
