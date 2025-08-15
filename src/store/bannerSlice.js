import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
  },
  reducers: {
    setBanners(state, action) {
      const rows = action.payload;
      state.banners = rows;
    },
  },
});

export const { setBanners } = bannerSlice.actions;

export default bannerSlice;
