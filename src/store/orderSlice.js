import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    page: 1,
    pages: 1,
    count: 1,
  },
  reducers: {
    setOrders(state, action) {
      const data = action.payload;
      state.orders = data.results;
      state.pages = data.pages;
      state.count = data.count;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setOrders, setPage } = orderSlice.actions;

export default orderSlice;
