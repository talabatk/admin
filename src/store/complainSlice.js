import { createSlice } from "@reduxjs/toolkit";

const complainSlice = createSlice({
  name: "complain",
  initialState: {
    complains: [],
    page: 1,
    pages: 1,
  },
  reducers: {
    setComplains(state, action) {
      const data = action.payload;
      state.complains = data.result;
      state.pages = data.pages;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setComplains, setPage } = complainSlice.actions;

export default complainSlice;
