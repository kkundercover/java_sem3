// Centralized REST Client for backend communication
const API_BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    let data = null;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage = (data && data.message) ? data.message : (typeof data === 'string' ? data : 'API Request failed');
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  auth: {
    login: (credentials) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
  },
  campaigns: {
    getAll: (status) =>
      request(status ? `/campaigns?status=${encodeURIComponent(status)}` : '/campaigns'),
    getById: (id) => request(`/campaigns/${id}`),
    create: (data) =>
      request('/campaigns', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/campaigns/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/campaigns/${id}`, {
        method: 'DELETE',
      }),
  },
  donations: {
    create: (data) =>
      request('/donations', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getByDonor: (donorId) => request(`/donations/donor/${donorId}`),
    getByCampaign: (campaignId) => request(`/donations/campaign/${campaignId}`),
    getAll: () => request('/donations'),
  },
  admin: {
    getAnalytics: () => request('/admin/analytics'),
  },
};
