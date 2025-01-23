import { createSlice } from "@reduxjs/toolkit";

const vendorCategorySlice = createSlice({
  name: "vendor-category",
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

export const { setCategories } = vendorCategorySlice.actions;

export default vendorCategorySlice;
