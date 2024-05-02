import axios from "axios";
import { apiRequest } from "./apiRequest";

export async function signup({ username, password }) {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/signup",
      {
        username,
        password,
      }
    );

    return data.data;
  } catch (error) {
    const { response } = error || {};
    const message = response ? response.data.message : error.message;
    throw new Error(message);
  }
}

export async function login({ username, password }) {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/login",
      {
        username,
        password,
      }
    );
    return data.data;
  } catch (error) {
    const { response } = error || {};
    const message = response ? response.data.message : error.message;
    throw new Error(message);
  }
}

export async function logout() {
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/v1/users/logout"
    );
    return data.data;
  } catch (error) {
    const { response } = error || {};
    const message = response ? response.data.message : error.message;
    throw new Error(message);
  }
}

export async function getCurrentUser() {
  try {
    const { user } = await apiRequest({
      method: "get",
      url: `http://127.0.0.1:8000/api/v1/users/verify`,
    });

    return user;
  } catch (error) {
    const { response } = error || {};
    const message = response ? response.data.message : error.message;
    throw new Error(message);
  }
}
