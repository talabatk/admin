import { createSlice } from "@reduxjs/toolkit";
//configre auth slice-------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    isAuthenticated: false,
  },
  reducers: {
    //set user date when logged in-----------
    login(state, action) {
      const data = action.payload;
      state.isAuthenticated = true;
      state.userData = data;

      localStorage.setItem("token", data.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userData = {};
      localStorage.removeItem("token"); // Optional: remove token
    },
  },
});
export const authSliceActions = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice;
