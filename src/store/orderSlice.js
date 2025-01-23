import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    page: 1,
    pages: 1,
    count: 1,
    total: 0,
    shipping: 0,
  },
  reducers: {
    setOrders(state, action) {
      const data = action.payload;
      state.orders = data.results;
      state.pages = data.pages;
      state.count = data.count;
      state.shipping = data.totalShipping;
      state.total = data.total;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setOrders, setPage } = orderSlice.actions;

export default orderSlice;
