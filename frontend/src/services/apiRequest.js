import axios from "axios";

// Function to send requests with or without authorization header
export const apiRequest = async ({ method, url, data }) => {
  // Check if token exists in local storage
  const token = localStorage.getItem("access_token");

  // Configure request with or without authorization header
  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  // Add authorization header if token exists
  if (token) {
    config.headers["Authorization"] = token;
  }

  try {
    const { data } = await axios(config, { withCredentials: true });
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
