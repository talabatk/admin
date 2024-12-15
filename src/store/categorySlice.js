import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      const rows = action.payload;
      state.categories = rows;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice;
