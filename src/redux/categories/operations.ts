import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories } from "@/api/words";
import type { Category } from "@/types/category";

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await getCategories();
    } catch {
      return thunkAPI.rejectWithValue("Request failed");
    }
  },
);
