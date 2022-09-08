import axios from "axios";
import { API_ENDPINT } from "../utils/constants";

export const allProductsApi = async () => {
  try {
    const { data } = await axios.get(`${API_ENDPINT}/products`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const singleProductApi = async (id) => {
  try {
    const { data } = await axios.get(`${API_ENDPINT}/products/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const seachProductsApi = async (query) => {
  try {
    const { data } = await axios.post(`${API_ENDPINT}/products/search`, {
      query,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addProductApi = async (formData, authToken) => {
  try {
    const { data } = await axios.post(
      `${API_ENDPINT}/products/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const editProductApi = async (id, formData, authToken) => {
  try {
    const { data } = await axios.put(
      `${API_ENDPINT}/products/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteProductApi = async (id, authToken) => {
  try {
    const { data } = await axios.delete(`${API_ENDPINT}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
