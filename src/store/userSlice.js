import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    page: 1,
    pages: 1,
  },
  reducers: {
    setUsers(state, action) {
      const data = action.payload;
      state.users = data.results;
      state.pages = data.pages;
    },
    setPage(state, action) {
      const page = action.payload;
      state.page = page;
    },
  },
});

export const { setUsers, setPage } = userSlice.actions;

export default userSlice;
