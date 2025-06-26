const API_BASE_URL = "https://teacher-dashboard-backend.onrender.com";

export const fetchInitialData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/init`);
  if (!response.ok) {
    throw new Error('Failed to fetch initial data');
  }
  return await response.json();
};

export const getClassStats = async (filters) => {
  const response = await fetch(`${API_BASE_URL}/api/class-stats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch class stats');
  }
  return await response.json();
};

export const addSubjects = async (subjects) => {
  const response = await fetch(`${API_BASE_URL}/api/subjects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subjects }),
  });
  if (!response.ok) {
    throw new Error('Failed to add subjects');
  }
  return await response.json();
};

export const addDepartments = async (departments) => {
  const response = await fetch(`${API_BASE_URL}/api/departments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ departments }),
  });
  if (!response.ok) {
    throw new Error('Failed to add departments');
  }
  return await response.json();
};

export const uploadMarks = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/upload-marks`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload marks');
  }
  return await response.json();
};

export const getQueries = async () => {
  const response = await fetch(`${API_BASE_URL}/api/queries`);
  if (!response.ok) {
    throw new Error('Failed to fetch queries');
  }
  return await response.json();
};

export const respondToQuery = async (queryId, response) => {
  const result = await fetch(`${API_BASE_URL}/api/queries/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ queryId, response }),
  });
  if (!result.ok) {
    throw new Error('Failed to respond to query');
  }
  return await result.json();
};

export const setFAMode = async (faData) => {
  const response = await fetch(`${API_BASE_URL}/api/fa-mode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faData),
  });
  if (!response.ok) {
    throw new Error('Failed to set FA mode');
  }
  return await response.json();
};

export const getFAModeStatus = async (filters) => {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/api/fa-mode?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to get FA mode status');
  }
  return await response.json();
};

export const getDebugData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/debug/data`);
  if (!response.ok) {
    throw new Error('Failed to fetch debug data');
  }
  return await response.json();
};