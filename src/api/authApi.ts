import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const AUTH_API_URL = BASE_API_URL + "/auth";

axios.defaults.withCredentials = true;

export const loginApi = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  try {
    return axios.post(`${AUTH_API_URL}/login`, params, {
      withCredentials: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const registerApi = async (
  username: string,
  password: string,
  ssnNumber: string
) => {
  return axios.post(
    `${AUTH_API_URL}/register`,
    { username, password, ssnNumber },
    { withCredentials: true }
  );
};
XMLDocument;

export const logoutApi = async () => {
  return axios.post(`${AUTH_API_URL}/logout`, {}, { withCredentials: true });
};

export const fetchCurrentUserApi = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/account/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("User is not authenticated");

      return null;
    }
    // console.error("Error fetching user:", error);
    return null;
  }
};
