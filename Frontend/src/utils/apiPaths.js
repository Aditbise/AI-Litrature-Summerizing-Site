
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Signup
        LOGIN: "/api/auth/login", // Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile", // Get logged-in user details
    },
    
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
    },

    ANALYSIS: {
        ANALYZE: "/api/analysis/analyze", // Analyze a literature passage
        GET_HISTORY: "/api/analysis/history", // Get all user analyses
        GET_ONE: (id) => `/api/analysis/${id}`, // Get specific analysis
        ADD_NOTE: (id) => `/api/analysis/${id}/notes`, // Add notes to analysis
        DELETE: (id) => `/api/analysis/${id}`, // Delete an analysis
    },
};