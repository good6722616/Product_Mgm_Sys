import axios from "axios";
import { API_ENDPINT } from "../utils/constants";

const apiConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginApi = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${API_ENDPINT}/users/login`,
      { email, password },
      apiConfig
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminLoginApi = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${API_ENDPINT}/users/adminLogin`,
      { email, password },
      apiConfig
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const signUpApi = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${API_ENDPINT}/users/create`,
      { email, password },
      apiConfig
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPasswordApi = async (email) => {
  try {
    const { data } = await axios.post(
      `${API_ENDPINT}/users/reset`,
      { email },
      apiConfig
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
