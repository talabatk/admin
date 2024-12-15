import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sideBarIsVisiable: false,
    isDark: false,
  },
  reducers: {
    toggleSideBar(state) {
      state.sideBarIsVisiable = !state.sideBarIsVisiable;
    },
    setDark(state) {
      state.isDark = true;
      localStorage.setItem("isDark", "true");
      document.querySelector("body").classList.add("dark");
    },
    setLight(state) {
      state.isDark = false;
      localStorage.removeItem("isDark");
      document.querySelector("body").classList.remove("dark");
    },
  },
});
export const uiSliceActions = uiSlice.actions;
export default uiSlice;
