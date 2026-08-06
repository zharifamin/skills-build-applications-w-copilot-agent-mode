const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const codespaceEndpoints = {
  users: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`,
  teams: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`,
  activities: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`,
  leaderboard: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`,
  workouts: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`,
};

export const buildApiUrl = (resource) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return codespaceEndpoints[resource] || `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
};

export async function fetchApiData(resource) {
  const response = await fetch(buildApiUrl(resource));
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object' && Array.isArray(data.items)) {
    return data.items;
  }

  return data;
}
