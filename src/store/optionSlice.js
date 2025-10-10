import { createSlice } from "@reduxjs/toolkit";

const optionSlice = createSlice({
  name: "option",
  initialState: {
    options: [],
    page: 1,
    pages: 1,
  },
  reducers: {
    setOptions(state, action) {
      const data = action.payload;
      state.options = data.results;
      state.pages = data.pages;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setOptions, setPage } = optionSlice.actions;

export default optionSlice;
