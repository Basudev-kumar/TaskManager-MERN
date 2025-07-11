// utils/apiPaths.js



export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const BASE_URL = "https://taskme-65h9.onrender.com";

console.log("Backend Base URL: ", import.meta.env.VITE_API_BASE_URL);


export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user
    LOGIN: "/api/auth/login",       // Login & return JWT
    GET_PROFILE: "/api/auth/profile", // Get user profile
    
  },

  USERS: {
    GET_ALL_USERS: "/api/users", // Get all users (admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`,
    CREATE_USER: "/api/users",
    UPDATE_USER: (userId) => `/api/users/${userId}`,
    DELETE_USER: (userId) => `/api/users/${userId}`,
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", // Admin : all, User: assigned
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",
    GET_ALL_TASKS: "/api/tasks",
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,
    CREATE_TASK: "/api/tasks",
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,
    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
    
  },

  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", // Export all tasks
    EXPORT_USERS: "/api/reports/export/users", // Export user-task report
  },

  IMAGE:{
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },
};
