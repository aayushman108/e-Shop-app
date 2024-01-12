import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../config/config";
import { navigateToPage } from "../router";

export const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens or headers
http.interceptors.request.use(
  (config) => {
    // Attach an access token from local storage (if available)
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses
http.interceptors.response.use(
  (response) => {
    const { accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Redirecting to login.");
      navigateToPage("login");
    }
    return Promise.reject(error);
  }
);
