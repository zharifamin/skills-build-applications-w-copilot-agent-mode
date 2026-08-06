const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/${resource}/`;
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
