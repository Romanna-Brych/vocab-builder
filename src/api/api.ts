import axios from "axios";

export const api = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};
