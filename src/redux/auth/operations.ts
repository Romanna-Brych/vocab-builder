import { createAsyncThunk } from "@reduxjs/toolkit";

import { api, clearAuthHeader, setAuthHeader } from "@/api/api";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginCredentials,
  LogoutResponse,
  RegisterCredentials,
} from "@/types/auth";
import type { RootState } from "../store";

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>(
        "/users/signup",
        credentials,
      );

      setAuthHeader(data.token);

      return data;
    } catch {
      return thunkAPI.rejectWithValue("Request failed");
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>(
        "/users/signin",
        credentials,
      );

      setAuthHeader(data.token);

      return data;
    } catch {
      return thunkAPI.rejectWithValue("Request failed");
    }
  },
);

export const refreshUser = createAsyncThunk<
  CurrentUserResponse,
  void,
  { state: RootState }
>("auth/refreshUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue("No token");
  }

  try {
    setAuthHeader(token);

    const { data } = await api.get<CurrentUserResponse>("/users/current");

    return data;
  } catch {
    return thunkAPI.rejectWithValue("Request failed");
  }
});

export const logout = createAsyncThunk<LogoutResponse>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post<LogoutResponse>("/users/signout");

      clearAuthHeader();

      return data;
    } catch {
      clearAuthHeader();
      return thunkAPI.rejectWithValue("Request failed");
    }
  },
);
