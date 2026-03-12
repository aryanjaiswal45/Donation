const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with auth token support
 */
async function request(endpoint, options = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        ...(options.headers || {}),
    };

    // Only set Content-Type for non-FormData bodies
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // URL cleanup: ensure no double slashes and correct path joining
    const baseUrl = API_BASE.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    const res = await fetch(`${baseUrl}${cleanEndpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// ── Auth ─────────────────────────────────────────────
export const authApi = {
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    getMe: () => request('/auth/me'),
};

// ── Donations ────────────────────────────────────────
export const donationApi = {
    create: (formData) => request('/donations', { method: 'POST', body: formData }),
    getAll: (params = '') => request(`/donations${params ? `?${params}` : ''}`),
    getById: (id) => request(`/donations/${id}`),
    updateStatus: (id, status) =>
        request(`/donations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};
