import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
  },
  reducers: {
    setSliders(state, action) {
      const rows = action.payload;
      state.sliders = rows;
    },
  },
});

export const { setSliders } = sliderSlice.actions;

export default sliderSlice;
