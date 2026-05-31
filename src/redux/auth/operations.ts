import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, clearAuthHeader, setAuthHeader } from "../../api/api";

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signup", credentials);

      setAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signin", credentials);

      setAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/users/signout");

    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
