import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    page: 1,
    pages: 1,
  },
  reducers: {
    setProducts(state, action) {
      const data = action.payload;
      state.products = data.results;
      state.pages = data.pages;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setProducts, setPage } = productSlice.actions;

export default productSlice;
