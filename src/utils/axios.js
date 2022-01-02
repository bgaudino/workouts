import axios from "axios";
import jwtDecode from "jwt-decode";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    if (config?.url.includes("/token/")) {
      return config;
    }
    // Do something before request is sent
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const expiry = decoded.exp;
    const now = new Date().getTime() / 1000;
    const isValid = expiry - now > 60;
    if (!isValid) {
      console.log("Refreshing");
      const refreshed = await refreshTokens();
      if (refreshed) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      } else logout();
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return error;
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (!error.config?.url.includes("token") && error.response?.status === 401)
      logout();
    return Promise.reject(error);
  }
);

async function refreshTokens() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return false;
  }
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    localStorage.setItem("accessToken", res.data.access);
  } catch (err) {
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.reload();
}
