const API_URL = "http://localhost:5000/api";

const fetchWithTimeout = async (url, options, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error("Request timed out. The server might be busy or the database is disconnected.");
        }
        throw error;
    }
};

export const signup = async (userData) => {
    const response = await fetchWithTimeout(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetchWithTimeout(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const submitContact = async (contactData) => {
    const response = await fetchWithTimeout(`${API_URL}/guest/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    });
    return response.json();
};

export const subscribeNewsletter = async (email) => {
    const response = await fetchWithTimeout(`${API_URL}/guest/newsletter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
};
export const forgotPassword = async (email) => {
    const response = await fetchWithTimeout(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
};

export const resetPassword = async (token, newPassword) => {
    const response = await fetchWithTimeout(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
    });
    return response.json();
};

export const enroll = async (token, planData) => {
    const response = await fetchWithTimeout(`${API_URL}/user/enroll`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(planData),
    });
    return response.json();
};
