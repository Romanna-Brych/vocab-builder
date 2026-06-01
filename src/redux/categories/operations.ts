import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/api/api";
import type { Category } from "@/types/category";

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<Category[]>("/categories");
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Request failed");
    }
  },
);
